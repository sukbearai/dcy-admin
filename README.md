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

## GIT暂存

git stash命令用于将当前工作目录的未提交的改动保存到一个暂存区域，这样你就可以切换到别的分支进行其他工作，然后再切换回来继续你的工作。这是在不进行commit的情况下，暂时保存当前的工作进度。

```bash
# 将当前的未提交改动保存到暂存区，并附带一条消息。如果不提供消息，Git会创建一个默认消息
git add .
git stash save "message"
# 显示所有的暂存
git stash list
# stash@{n}是在git stash list命令输出中看到的暂存名字。
# 应用指定的暂存，并从暂存列表中删除这个暂存
git stash pop "stash@{n}"
# 删除指定的暂
git stash drop "stash@{n}"
# 删除所有的暂存
git stash clear
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

### 开发

```bash
# 克隆代码到本地
git clone http://git.juzycn.com:3000/dachengyun/dcy-web.git

# 新建本地工作分支并切换到新建的分支， <branch name> 替换为你的实际分支名称，分支名中应包含自己的名字或者缩写
git checkout -b <branch name>

# 启动本地开发
npm install pnpm@8.5.1 -g
pnpm install
pnpm dev

# 在终端通过url访问应用,例如
#  ➜  Local:   http://localhost:4000/

# 当你在本地开发完一个新功能或者修复掉一个新bug后，为保证git记录线性可控，请按照如下策略合并代码
# 按顺序执行👇👇👇下面命令
# 0. 提交你的代码
git add .
git commit -m 'feat: 新功能'
git branch
# 2. 如果不在你的工作分支，使用如下命令切换到你的工作分支
git checkout <branch name>
# 3. 在合并代码之前创建一个新的分支来备份你的工作,这个分支会包含 <branch name>分支的所有commit
git checkout -b <branch name>_backup
# 4. 将备份分支推送到远程仓库,备份到线上
git push origin <branch name>_backup
# 5. 切回你的工作分支
git checkout <branch name>
# 6. 更新main分支，然后在工作分支上使用rebase合并main分支的最新提交，git rebase只适合个人分支使用，因为 rebase 会改写提交历史，多人分支容易导致冲突混乱
git checkout main
git pull origin main --no-verify
git checkout <branch name>
git rebase origin/main --no-verify
# 7. 如果rebase过程中遇到冲突，请手动解决冲突，再执行如下命令继续rebase
# ❗️只有在代码冲突并解决后才执行下面两行命令 <resolved-files> 是你解决冲突后的文件
git add .
git rebase --continue
# ❗️或者取消rebase合并
git rebase --abort
# 8. rebase结束后，切换回 main 分支
git checkout main
# 9. 将工作分支的改动合并到main分支,如 --ff-only 不能合并 git merge --abort 取消合并，尝试使用 --no-ff 或者解决冲突后再合并
git merge --ff-only <branch name>
# 10 ✨(可选). 通过终端交互，更新git tag、版本和更新日志
# release commit 需要手动发布才行，因为配置了husky prepare-commit-msg 只支持命令行提交
# ❗️请在 (commit) 选择 no，通过步骤11手动提交版本信息
pnpm run release
# 11 ✨(可选). 添加发布提交
git commit -m "chore: release v1.3.0" # 请手动更新版本号，如果出现commitizen终端交互按住 control + c 跳过交互步骤
# 12. 将最终代码推送到远程仓库
git push origin main
# 13. 在删除备份分支之前，建议再次确认主分支代码无异常。
git branch -D <branch name>_backup
git push origin --delete <branch name>_backup
```

### 构建

构建该应用只需要执行以下命令

```bash
pnpm build
```

然后你会看到用于发布的 `dist` 文件夹被生成。

### 部署到 Netlify

前往 [Netlify](https://app.netlify.com/start) 并选择你的仓库, 一路 `OK` 下去，稍等一下后，你的应用将被创建.
