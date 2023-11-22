import { ref } from 'vue'
import { type UserModule } from '~/types'

// Import Arco Lang
// https://arco.design/vue/component/icon#basic
//
// Don't need this? Try vitesse-lite: https://github.com/antfu/vitesse-lite

const zhCN = ref<any>(null)

export const install: UserModule = async ({ isClient }) => {
  if (isClient)
    zhCN.value = (await import('@arco-design/web-vue/es/locale/lang/zh-cn')).default
}

export function useArcoLocale() {
  return zhCN
}
