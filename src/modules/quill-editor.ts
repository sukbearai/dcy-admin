import { type UserModule } from '~/types'

// Import Vue Quill
// https://vueup.github.io/vue-quill/guide/usage.html
//
// Don't need this? Try vitesse-lite: https://github.com/antfu/vitesse-lite

export const install: UserModule = async ({ isClient, app }) => {
  if (isClient) {
    // 富文本组件
    const VueQuill = await import('@vueup/vue-quill')
    app.component('QuillEditor', VueQuill.QuillEditor)
  }
}
