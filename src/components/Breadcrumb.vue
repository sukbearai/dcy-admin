<script setup lang="ts">
import type { BreadcrumbRoute } from '@arco-design/web-vue'

const emit = defineEmits(['onReady'])

const route = useRoute()
const router = useRouter()

const initRoutes = [{
  path: '/',
  label: '资源首页',
}]

const routes = computed(() => {
  const pathArray = route.path.split('/')
  pathArray.shift()

  const routes = pathArray.reduce((breadcrumbArray: BreadcrumbRoute[], path, i) => {
    const to = `/${pathArray.slice(0, i + 1).join('/')}`
    breadcrumbArray.push({
      path: to,
      label: router.resolve(to).meta.locale as string,
    })

    // 过滤掉没有配置面包屑名字的页面
    const routes = breadcrumbArray.filter(n => n.label)
    return [...routes]
  }, [...initRoutes])
  emit('onReady', routes)
  return routes
})
</script>

<template>
  <div v-if="routes.length > 1" mb-4 border-0 rounded-lg bg-white p-3.5>
    <a-breadcrumb>
      <template #separator>
        <icon-right />
      </template>
      <a-breadcrumb-item v-for="r in routes" :key="r.label">
        <router-link :to="r.path">
          {{ r.label }}
        </router-link>
      </a-breadcrumb-item>
    </a-breadcrumb>
  </div>
</template>

<style scoped>
.breadcrumb {
  --at-apply: text-left;
}
:deep(.arco-breadcrumb-item-separator),
:deep(.arco-breadcrumb-item a) {
  color: #1a1a1a;
}
</style>
