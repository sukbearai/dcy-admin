import { type UserModule } from '~/types'

// Don't need this? Try vitesse-lite: https://github.com/antfu/vitesse-lite

export const install: UserModule = async ({ isClient, app }) => {
  if (isClient) {
    // pdf预览组件
    const VueOfficePdf = await import('@vue-office/pdf')
    app.component('VueOfficePdf', VueOfficePdf)
  }
}
