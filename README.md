## Usage

⚡️⚡️基于vitesse和arco design pro的中后台模板

✅ 支持自动导入api、components、详解 vite.config.js、AutoImport 配置

✅ 基于 vue hook plus useRequest 的网络请求

✅ 本地mock数据

✅ 基于route代码块配置页面权限

✅ 基于 vite-plugin-pages 自动递归渲染菜单

✅ RichText 富文本组件

✅ Qrcode 二维码组件

✅ TabBar 标签页组件

✅ Breadcrumb 面包屑组件、根据route.path自动生成

✅ IconFont组件支持iconfont.js渲染图标，可以在Route代码库中配置使用

✅ 登录、注册、退出逻辑封装

<img width="1431" alt="image" src="https://github.com/sukbearai/dcy-admin/assets/120086676/d15f15f6-ca60-4f32-b508-2bbee15d64cf">

## mock

```ts
// http://mockjs.com/

import Mock from 'mockjs'
import setupMock, {
  failResponseWrap,
  successResponseWrap,
} from '~/utils/setup-mock'

import { isLogin } from '~/utils/auth'
import type { TodoMock } from '~/api/testMock'

setupMock({
  setup() {
    // Mock.XHR.prototype.withCredentials = true;

    // 代办事项
    Mock.mock(/\/dachengyun\/user\/queryTodoMockList/, () => {
      if (isLogin()) {
        const presetData = ['学习十分钟', '游泳一小时', '去聚餐', '打游戏', '练舞']
        const getTodoList: () => TodoMock[] = () => {
          const count = 5
          return new Array(count).fill(0).map((el, idx) => ({
            name: presetData[idx],
            finished: false,
          }))
        }
        return successResponseWrap(getTodoList())
      }
      return failResponseWrap(null, '未登录', 50008)
    })
  },
})
```

## 图表

```vue
<script setup lang="ts">
const { chartOption } = useChartOption((isDark) => {
  // echarts support https://echarts.apache.org/zh/theme-builder.html
  // It's not used here
  return {
    legend: {
      left: 'center',
      data: ['纯文本', '图文类', '视频类'],
      bottom: 0,
      icon: 'circle',
      itemWidth: 8,
      textStyle: {
        color: isDark ? 'rgba(255, 255, 255, 0.7)' : '#4E5969',
      },
      itemStyle: {
        borderWidth: 0,
      },
    },
    tooltip: {
      show: true,
      trigger: 'item',
    },
    graphic: {
      elements: [
        {
          type: 'text',
          left: 'center',
          top: '40%',
          style: {
            text: '内容量',
            textAlign: 'center',
            fill: isDark ? '#ffffffb3' : '#4E5969',
            fontSize: 14,
          },
        },
        {
          type: 'text',
          left: 'center',
          top: '50%',
          style: {
            text: '928,531',
            textAlign: 'center',
            fill: isDark ? '#ffffffb3' : '#1D2129',
            fontSize: 16,
            fontWeight: 500,
          },
        },
      ],
    },
    series: [
      {
        type: 'pie',
        radius: ['50%', '70%'],
        center: ['50%', '50%'],
        label: {
          formatter: '{d}%',
          fontSize: 14,
          color: isDark ? 'rgba(255, 255, 255, 0.7)' : '#4E5969',
        },
        itemStyle: {
          borderColor: isDark ? '#232324' : '#fff',
          borderWidth: 1,
        },
        data: [
          {
            value: [148564],
            name: '纯文本',
            itemStyle: {
              color: isDark ? '#3D72F6' : '#249EFF',
            },
          },
          {
            value: [334271],
            name: '图文类',
            itemStyle: {
              color: isDark ? '#A079DC' : '#313CA9',
            },
          },
          {
            value: [445694],
            name: '视频类',
            itemStyle: {
              color: isDark ? '#6CAAF5' : '#21CCFF',
            },
          },
        ],
      },
    ],
  }
})
</script>

<template>
  <div class="wrapper">
    <Chart height="310px" :option="chartOption" />
  </div>
</template>

<route lang="yaml">
meta:
  layout: DefaultLayout
  requiresAuth: false
</route>
```

## 路由监听

```vue
<script>
//
const selectedKey = ref('index')

// 每次路由变化都会触发，第二个参数填true会立即执行
listenerRouteChange((newRoute) => {
  const { requiresAuth, roles, name, ...rest } = newRoute.meta
  selectedKey.value = name
}, true)
</script>

<template>
  <a-menu
    :selected-keys="selectedKey.value"
  >
    菜单
  </a-menu>
</template>
```

## 权限指令

```vue
<template>
  <!-- ['*' | 'teacher' | 'student'] -->
  <div v-permission="['*']">
    只允许某个角色访问的内容
  </div>
</template>
```

## 路由配置与权限

```vue
<route lang="yaml">
meta:
  layout: DefaultLayout # 默认布局有header和footer，不需要就去掉
  requiresAuth: false # 是否登陆访问，默认为true，当requiresAuth为true时，没登录会被重定向到登录页
  roles: ['*'] # 页面的角色权限 ['*' | 'teacher' | 'student']
</route>
```

## 组件库设计变量

```
<!-- https://arco.design/vue/docs/token -->
<!-- 使用，变量名前面加@ -->
<!-- vite-config-ts 中的less配置可以修改变量值 -->
.top {
  height: 60px;
  background: @primary-6;
}
```

## 网络请求

### 请求地址

```
<!-- 线上地址 -->
VITE_API_BASE_URL= http://cloud.juzycn.com
<!-- 代理配置 -->
VITE_API_BASE_URL=api
VITE_SERVER_PROXY_URL=http://cloud.juzycn.com
```

### 初始化渲染数据

```vue
<script setup lang="ts">
// 定义接口url和请求参数
function getExercisesData(data: PaginationInfo) {
  // utils/request 封装了axios请求以及ts返回值类型
  return request<CommentRes>('/dachengyun/cloudresource/queryCloudResource', data)
}

// 定义接口参数
const paramsData = ref({
  pageIndex: 1,
  pageSize: 2,
  pid: '',
  cid: '',
  flag: 0,
  search: '',
})

// 默认执行，获取组件初始化时的渲染数据
const { data: exercisesData } = useRequest(() => getExercisesData(paramsData.value), {
  initialData: null, // 定义data的默认值
  refreshDeps: [paramsData], // 依赖刷新，重新获取接口数据
})
</script>
```

### 页面交互的防抖请求

```vue
<script setup lang="ts">
// 定义接口url和请求参数
function getAddCollect(data: { exerciseId: number }) {
  // 用户点击收藏
  return request<CommentRes>('/dachengyun/exerciseinteract/addResourceCollect', data)
}

// 手动触发异步函数
const { loading, run: onAddCollect } = useRequest(getAddCollect, {
  // 一秒内持续点击只会执行一次
  debounceWait: 1000,
  // false 为自动执行
  manual: true,
  // 请求成功
  onSuccess: (data) => {
    alert(data)
  },
  // 请求失败
  onError: (error) => {
    alert(error)
  },
})

// watch(eId, c => {
//  onAddCollect({ exerciseId: cs})
// })
</script>

<template>
  <a-button @click="onAddCollect({ exerciseId: 1 })" />
</template>
```

## 覆盖组件库样式 :deep

```vue
// 修改arco design样式
<style lang="less" scoped>
:deep(.arco-menu-inner) {
    .arco-menu-inline-header {
      display: flex;
      align-items: center;
    }
    .arco-icon {
      &:not(.arco-icon-down) {
        font-size: 18px;
      }
    }
  }
</style>
```

## 图标使用

[项目图标](https://icones.js.org/collection/carbon)

```html
  <!-- 也支持Arco Design Icon -->
 <span class="i-carbon:chevron-down" />
```

## 版本更新和Changelog

```bash
pnpm release
```

## 代码片段

 在vue文件中输入`vue`按下tab，如果是组件输入`component`按tab

```vue
<script setup lang="ts">
defineOptions({
  name: 'TempPage',
})
// const router = useRouter()
// const user = useUserStore()
// const props = defineProps<{ name: string }>()
const { t } = useI18n()
</script>

<template>
  <div>
    <div class="complex-node">
      {{ t('tempvue') }}
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: temp
</route>

<style>
.complex-node {
  --at-apply: text-lg text-pink-400 font-bold border-1 border-gray border-dashed rounded flex flex-warp items-center justify-evenly hover:text-red;
}
</style>
```

## 特性

- ⚡️ [Vue 3](https://github.com/vuejs/core), [Vite](https://github.com/vitejs/vite), [pnpm](https://pnpm.io/), [esbuild](https://github.com/evanw/esbuild) - 就是快！

- 🗂 [基于文件的路由](./src/pages)

- 📦 [组件自动化加载](./src/components)

- 🍍 [使用 Pinia 的状态管理](https://pinia.vuejs.org)

- 📑 [布局系统](./src/layouts)

- 📲 [PWA](https://github.com/antfu/vite-plugin-pwa)

- 🎨 [UnoCSS](https://github.com/unocss/unocss) - 高性能且极具灵活性的即时原子化 CSS 引擎

- 😃 [各种图标集为你所用](https://github.com/antfu/unocss/tree/main/packages/preset-icons)

- 🌍 [I18n 国际化开箱即用](./locales)

- 🗒 [Markdown 支持](https://github.com/antfu/vite-plugin-vue-markdown)

- 🔥 使用 [新的 `<script setup>` 语法](https://github.com/vuejs/rfcs/pull/227)

- 📥 [API 自动加载](https://github.com/antfu/unplugin-auto-import) - 直接使用 Composition API 无需引入

- 🖨 使用 [vite-ssg](https://github.com/antfu/vite-ssg) 进行服务端生成 (SSG)

- 🦔 使用 [critters](https://github.com/GoogleChromeLabs/critters) 的生成关键 CSS

- 🦾 TypeScript, 当然

- ⚙️ 结合 [GitHub Actions](https://github.com/features/actions)，使用 [Vitest](https://github.com/vitest-dev/vitest) 进行单元测试, [Cypress](https://cypress.io/) 进行 E2E 测试

- ☁️ 零配置部署 Netlify

<br>

## 预配置

### UI 框架

- [UnoCSS](https://github.com/antfu/unocss) - 高性能且极具灵活性的即时原子化 CSS 引擎
- [Arco Design Vue](https://arco.design/vue/docs/start) - 字节跳动出品的企业级设计系统

### Icons

- [Iconify](https://iconify.design) - 使用任意的图标集，浏览：[🔍Icônes](https://icones.netlify.app/)
- [UnoCSS 的纯 CSS 图标方案](https://github.com/antfu/unocss/tree/main/packages/preset-icons)

### 插件

- [Vue Router](https://github.com/vuejs/router)
  - [`vite-plugin-pages`](https://github.com/hannoeru/vite-plugin-pages) - 以文件系统为基础的路由
  - [`vite-plugin-vue-layouts`](https://github.com/JohnCampionJr/vite-plugin-vue-layouts) - 页面布局系统
- [Pinia](https://pinia.vuejs.org) - 直接的, 类型安全的, 使用 Composition API 的轻便灵活的 Vue 状态管理
- [`unplugin-vue-components`](https://github.com/antfu/unplugin-vue-components) - 自动加载组件
- [`unplugin-auto-import`](https://github.com/antfu/unplugin-auto-import) - 直接使用 Composition API 等，无需导入
- [`vite-plugin-pwa`](https://github.com/antfu/vite-plugin-pwa) - PWA
- [`vite-plugin-vue-markdown`](https://github.com/antfu/vite-plugin-vue-markdown) - Markdown 作为组件，也可以让组件在 Markdown 中使用
  - [`markdown-it-prism`](https://github.com/jGleitz/markdown-it-prism) - [Prism](https://prismjs.com/) 的语法高亮
  - [`prism-theme-vars`](https://github.com/antfu/prism-theme-vars) - 利用 CSS 变量自定义 Prism.js 的主题
- [Vue I18n](https://github.com/intlify/vue-i18n-next) - 国际化
  - [`unplugin-vue-i18n`](https://github.com/intlify/bundle-tools/tree/main/packages/unplugin-vue-i18n) - Vue I18n 的 Vite 插件
- [VueUse](https://github.com/antfu/vueuse) - 实用的 Composition API 工具合集
- [`vite-ssg-sitemap`](https://github.com/jbaubree/vite-ssg-sitemap) - 站点地图生成器
- [`@vueuse/head`](https://github.com/vueuse/head) - 响应式地操作文档头信息
- [`vite-plugin-vue-devtools`](https://github.com/webfansplz/vite-plugin-vue-devtools) - 旨在增强Vue开发者体验的Vite插件

### 编码风格

- 使用 Composition API 地 [`<script setup>` SFC 语法](https://github.com/vuejs/rfcs/pull/227)
- [ESLint](https://eslint.org/) 配置为 [@antfu/eslint-config](https://github.com/antfu/eslint-config), 单引号, 无分号.
- [commitlint] angular 规范

## Git 提交规范
- 需符合 [commitlint](https://commitlint.js.org/#/concepts-commit-conventions)规范
  - `feat`  新功能
  - `fix`  Bug 修复
  - `chore` 杂物处理
  - `docs` 文档更改
  - `style` 样式更改
  - `refactor` 重构
  - `perf` 性能改进
  - `test` 测试添加/更正
  - `revert` 还原提交
  - `ignore` 临时暂存可忽略
  - `ci` CI发版

### 开发工具
- [TypeScript](https://www.typescriptlang.org/)
- [Vitest](https://github.com/vitest-dev/vitest) - 基于 Vite 的单元测试框架
- [Cypress](https://cypress.io/) - E2E 测试
- [pnpm](https://pnpm.js.org/) - 快, 节省磁盘空间的包管理器
- [`vite-ssg`](https://github.com/antfu/vite-ssg) - 服务端生成
  - [critters](https://github.com/GoogleChromeLabs/critters) - 关键 CSS 生成器
- [Netlify](https://www.netlify.com/) - 零配置的部署
- [VS Code 扩展](./.vscode/extensions.json)
  - [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig) - 统一文件换行符
  - [Vite](https://marketplace.visualstudio.com/items?itemName=antfu.vite) - 自动启动 Vite 服务器
  - [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) - Vue 3 `<script setup>` IDE 支持
  - [Iconify IntelliSense](https://marketplace.visualstudio.com/items?itemName=antfu.iconify) - 图标内联显示和自动补全
  - [i18n Ally](https://marketplace.visualstudio.com/items?itemName=lokalise.i18n-ally) - 多合一的 I18n 支持
  - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

## 现在可以试试!

> 需要 Node 版本 >=18.16

## 使用

### 构建

构建该应用只需要执行以下命令

```bash
pnpm build
```

然后你会看到用于发布的 `dist` 文件夹被生成。

### 部署到 Netlify

前往 [Netlify](https://app.netlify.com/start) 并选择你的仓库, 一路 `OK` 下去，稍等一下后，你的应用将被创建.
