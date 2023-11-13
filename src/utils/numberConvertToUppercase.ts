// 阿拉伯数字转中文
export function numberConvertToUppercase(num: number) {
  const upperNumbers = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '百', '千', '万', '亿']
  const length = String(num).length
  if (length === 1) {
    return upperNumbers[num]
  }
  else if (length === 2) {
    if (num === 10) {
      return upperNumbers[num]
    }
    else if (num > 10 && num < 20) {
      const index: any = String(num)
      return `十${upperNumbers[index.charAt(1)]}`
    }
    else {
      const index: any = String(num)
      return `${upperNumbers[index.charAt(0)]}十${upperNumbers[index.charAt(1)].replace('零', '')}`
    }
  }
  else {
    // TODO: 超出99暂不考虑
    return ''
  }
}
