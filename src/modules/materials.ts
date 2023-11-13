import { type UserModule } from '~/types'

// Don't need this? Try vitesse-lite: https://github.com/antfu/vitesse-lite

export const install: UserModule = async ({ isClient, app }) => {
  if (!isClient)
    return

  const TheHeader = (await import('@dcyjs-materials/the-header')).default
  // 导航栏
  app.component('TheHeader', TheHeader)

  const LoginPage = (await import('@dcyjs-materials/login-page')).default
  // 登录组件
  app.component('LoginPage', LoginPage)
}
