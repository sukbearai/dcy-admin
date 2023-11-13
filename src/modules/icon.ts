import { type UserModule } from '~/types'

// Import Arco Design Icon
// https://arco.design/vue/
//
// Don't need this? Try vitesse-lite: https://github.com/antfu/vitesse-lite

export const install: UserModule = async ({ isClient, app }) => {
  if (!isClient)
    return
  const ArcoVueIcon = await import('@arco-design/web-vue/es/icon')

  app.use(ArcoVueIcon.default)
}
