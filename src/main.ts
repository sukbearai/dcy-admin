import { ViteSSG } from 'vite-ssg'
import { setupLayouts } from 'virtual:generated-layouts'

// import Previewer from 'virtual:vue-component-preview'
import ArcoVue from '@arco-design/web-vue'
import App from './App.vue'
import type { UserModule } from './types'
import { importMock } from './utils/import-mock'
import generatedRoutes from '~pages'

// 富文本
import '@vueup/vue-quill/dist/vue-quill.snow.css'

// 原子css
import '@unocss/reset/tailwind.css'
import 'uno.css'

// nprogress 和 markdown 样式
import '~/styles/main.css'

// layout-max-width 响应式样式
import '~/styles/global.less'

// axios 拦截器
import '~/api/interceptor'

// vue office
import '@vue-office/docx/lib/index.css'

// 组件库
import '@dcyjs-materials/login-page/dist/css/index.css'
import '@dcyjs-materials/the-header/dist/css/index.css'

// mock 拦截
importMock()

// 应用路由
const routes = setupLayouts(generatedRoutes)

// https://github.com/antfu/vite-ssg
export const createApp = ViteSSG(
  App,
  { routes, base: import.meta.env.BASE_URL },
  (ctx) => {
    // install all modules under `modules/`
    Object.values(import.meta.glob<{ install: UserModule }>('./modules/*.ts', { eager: true }))
      .forEach(i => i.install?.(ctx))
    ctx.app.use(ArcoVue)
    // ctx.app.use(Previewer)
  },
)
