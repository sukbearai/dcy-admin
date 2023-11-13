import axios from 'axios'
import type { HttpResponse } from '~/api/interceptor'

type Method = 'GET' | 'POST'

export default async function request<T>(url: string, data?: any, method: Method = 'POST', transformBlob = false): Promise<T> {
  const response = await axios({
    url,
    method,
    data: method === 'POST' ? data : undefined,
    params: method === 'GET' ? data : undefined,
    headers: {
      'Content-Type': 'application/json',
    },
    responseType: transformBlob ? 'blob' : 'json',
    transformResponse: [function (data: any) {
      try {
        // 处理二进制文件
        if (data instanceof Blob)
          return data

        // 对id进行字符串转换，避免js数值精度问题
        const regId = /(\".*?(i|I)d\":\s*)(\d+)/g
        data = data.replace(regId, (match: string, $1: string, $2: string, $3: string) => {
          return `${$1}"${$3}"`
        })

        // 对data: 123进行字符串转换，避免js数值精度问题
        const regData = /(\"data\":\s*)(\d+)/g
        data = data.replace(regData, (match: string, $1: string, $2: string) => {
          return `${$1}"${$2}"`
        })

        // 对id数组进行字符串转换，避免js数值精度问题
        const regIdArr = /\"\w+\"\s*:\s*\[([0-9, ]+)\]/g
        data = data.replace(regIdArr, (match: string) => {
          const regDigit = /(\d+)/g
          const str = match.replace(regDigit, (matchD) => {
            return `"${matchD}"`
          })

          return str
        })

        return JSON.parse(data)
      }
      catch (err) {
        return JSON.parse(data)
      }
    }],
    transformRequest: [(data: any) => {
      try {
        // 兼容formData
        if (data instanceof FormData)
          return data

        const regId = /(\".*?(i|I)d\":\s*)\"(\d+)\"/g
        const jsonString = JSON.stringify(data)
        // 去除id字段的引号方便后端处理
        let modifiedString = jsonString.replace(regId, (match, $1, $2, $3) => {
          return $1 + $3
        })

        // 去除data字段的引号方便后端处理
        const regData = /(\"data\":\s*)\"(\d+)\"/g
        modifiedString = modifiedString.replace(regData, (match, $1, $2) => {
          return $1 + $2
        })

        // 去除idArr字段的引号方便后端处理
        const regIdArr = /(\".*?\":\s*)\[(\"(\d+)\"\,?\s*)+\]/g
        modifiedString = modifiedString.replace(regIdArr, (match) => {
          const regDigit = /\"(\d+)\"/g
          const str = match.replace(regDigit, (matchD) => {
            return matchD.replace(/\"/g, '')
          })
          return str
        })

        return modifiedString
      }
      catch (err) {
        return JSON.stringify(data)
      }
    }],
  })
  return (response as unknown as HttpResponse<T>).data
}
