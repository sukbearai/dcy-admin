<script setup lang="ts">
import type { RouteLocationNormalized } from 'vue-router'
import { listenerRouteChange } from '~/utils/route-listener'

const userStore = useUserStore()
const router = useRouter()
const appStore = useAppStore()

interface Menu {
  name: string
  url: string
  count?: number
  children?: Menu[]
}

const menus = ref([
  {
    name: '首页',
    url: '/',
  },
  {
    name: '课程',
    url: '/',
    children: [
      {
        name: '教学空间',
        url: '/teaching-space',
      },
      {
        name: '课程主页',
        url: '/course',
      },
      {
        name: '教学任务',
        url: '/teaching-task',
      },
      {
        name: '课程达成',
        url: '/',
      },
    ],
  },
  {
    name: '项目',
    url: '/',
  },
  {
    name: '资源',
    url: '/exercise-library',
    children: [
      {
        name: '资源首页',
        url: '/',
      },
      {
        name: '云资源',
        url: '/cloud-resource',
      },
      {
        name: '我的资源',
        url: '/my-resources/my-library',
      },
    ],
  },
  {
    name: '互动',
    url: '/interaction',
  },
  {
    name: '日程',
    url: '/schedule',
  },
])

const word = ref('')

const defaultMenusSelectedKeys = ref(menus.value[0].name)

const userInfo = computed(() => ({ userName: userStore.userName }))

function updateCount(menus: Menu[], targetName: string, newCount: number): Menu[] {
  return menus.map((menu: Menu) => {
    if (menu.name === targetName)
      return { ...menu, count: newCount }

    if (menu.children)
      return { ...menu, children: updateCount(menu.children, targetName, newCount) }

    return menu
  })
}

function onSearch() {
  if (!word.value.trim())
    return
  router.push({ name: 'search', query: { word: word.value.trim() } })
}

function onClickMenuName(url: string) {
  router.push(url)
}

// function onLogin() {
//   router.push('/login')
// }

// function onLogout() {
//   visible.value = true
// }
function onLogout() {
  userStore.logout()
}
// function handleCancel() {
//   visible.value = false
// }

function resetWordValue(newRoute: RouteLocationNormalized) {
  if (newRoute.name !== 'search') {
    if (word.value.trim())
      word.value = ''
  }
}

function hideSearchBar(newRoute: RouteLocationNormalized) {
  const whiteList = ['my-data']
  if (whiteList.includes(newRoute.name as string))
    appStore.toggleSearchBar(false)
  else
    appStore.toggleSearchBar(true)
}

function getCurrentMenu(menus: Menu[], newRoute: RouteLocationNormalized) {
  return menus.find(item => item.url.includes(newRoute.path.split('/')[1]))
}

function activeMenu(newRoute: RouteLocationNormalized) {
  const match = getCurrentMenu(menus.value, newRoute)
  if (match)
    defaultMenusSelectedKeys.value = match.name
}

listenerRouteChange((newRoute) => {
  resetWordValue(newRoute)
  hideSearchBar(newRoute)
  activeMenu(newRoute)
  // activeSubMenu(newRoute)
}, true)

// 教学任务
// const { run: getTeachTaskCount } = useRequest(getStatisticTeachTask, {
//   // false 为自动执行
//   manual: true,
//   // 请求成功
//   onSuccess: (data: { totalCount: number; [index: string]: any }) => {
//     menus.value = updateCount(menus.value, '教学任务', data.totalCount)
//   },
//   // 请求失败
//   onError: () => {
//   },
// })

const { run: getResourceCount } = useRequest(() => getResourceNum(), {
  manual: true,
  initialData: '0',
  refreshDeps: [],
  onSuccess: (countNumber: string) => {
    // data.totalCount
    menus.value = updateCount(menus.value, '我的资源', Number(countNumber))
  },
})

async function fetchCountNum() {
  await getResourceCount()
  // await getTeachTaskCount()
}

watch(() => userStore.userName, (newVal) => {
  if (newVal)
    fetchCountNum()
})

if (userInfo.value.userName)
  fetchCountNum()
</script>

<template>
  <the-header
    v-model="word"
    class="nav-header"
    :menus="menus"
    :user-info="userInfo"
    @search="onSearch"
    @logout="onLogout"
    @click-menu-name="onClickMenuName"
  >
    <template #logo>
      <span i-dcy:logo style="font-size: 27px;" />
    </template>
  </the-header>
</template>

<style scoped lang="less">
.nav-header {
  margin-bottom: 17px;
}
</style>
