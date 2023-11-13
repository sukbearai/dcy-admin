import axios from 'axios'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import { Message, Modal } from '@arco-design/web-vue'
import { useUserStore } from '~/stores'
import { getToken } from '~/utils/auth'

const errCodes = [50008, 50012, 50014]

export interface HttpResponse<T = unknown> {
  msg: string
  code: number
  data: T
}

if (import.meta.env.VITE_API_BASE_URL)
  axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL

axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // console.log(config)
    // let each request carry token
    // this example using the JWT token
    // Authorization is a custom headers key
    // please modify it according to the actual situation
    const token = getToken()
    if (token) {
      if (!config.headers) {
        config.headers = {

        }
      }

      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    // do something
    return Promise.reject(error)
  },
)
// add response interceptors
axios.interceptors.response.use(
  (response: AxiosResponse<HttpResponse>) => {
    const res = response.data
    // 二进制文件
    if (res instanceof Blob)
      return response
    // if the custom code is not 200, it is judged as an error.
    if (res.code !== 200 && !errCodes.includes(res.code)) {
      Message.error({
        content: res.msg || 'Error',
        duration: 5 * 1000,
      })
      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (
        errCodes.includes(res.code)
        && response.config.url !== '/dachengyun/guest/login/userTokenVerify'
      ) {
        Modal.error({
          title: '确认退出',
          content:
            '你已经登出，你可以取消以停留在此页面，或者再次登录。',
          okText: '重新登录',
          async onOk() {
            const userStore = useUserStore()

            await userStore.logout()
            if (!import.meta.env.SSR)
              window.location.reload()
          },
        })
      }
      return Promise.reject(new Error(res.msg || 'Error'))
    }
    return res
  },
  (error) => {
    Message.error({
      content: error.msg || 'Request Error',
      duration: 5 * 1000,
    })
    return Promise.reject(error)
  },
)
