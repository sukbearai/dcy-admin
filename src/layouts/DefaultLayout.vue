<script setup lang="ts">
import type { RouteLocationNormalized } from 'vue-router'
import {
  listenerRouteChange,
  removeRouteListener,
} from '~/utils/route-listener'

const userStore = useUserStore()
const router = useRouter()
const route = useRoute()
const permission = useUserPermission()
const tabBarStore = useTabBarStore()

const tagList = computed(() => {
  return tabBarStore.getTabList
})

watch(
  () => userStore.role,
  (roleValue) => {
    if (roleValue && !permission.accessRouter(route))
      router.push({ name: 'all' })
  },
)

useResponsive(true)

listenerRouteChange((route: RouteLocationNormalized) => {
  if (
    !route.meta.noAffix
      && !tagList.value.some(tag => tag.fullPath === route.fullPath)
  )
    tabBarStore.updateTabList(route)
}, true)

onUnmounted(() => {
  removeRouteListener()
})
</script>

<template>
  <main class="page">
    <nav-header />
    <div class="main">
      <page-layout />
    </div>
    <nav-footer />
  </main>
</template>

<style scoped lang="less">
.page {
  --at-apply: flex flex-col relative;
  min-height: 100%;
  min-width: 1277px;
}

.main {
  --at-apply: flex-1 relative;
  z-index:1;
}
</style>
