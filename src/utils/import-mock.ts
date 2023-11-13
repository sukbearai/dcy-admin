// 会把接口返回的blob数据转成字符串导致文件下载失败
export async function importMock() {
  if (import.meta.env.DEV)
    await import('../mock')
}
