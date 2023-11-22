import { type UserModule } from '~/types'

// Don't need this? Try vitesse-lite: https://github.com/antfu/vitesse-lite

export const install: UserModule = async ({ isClient, app }) => {
  if (isClient) {
    // word预览组件
    const VueOfficeDocx = await import('@vue-office/docx')
    app.component('VueOfficeDocx', VueOfficeDocx)
  }
}
