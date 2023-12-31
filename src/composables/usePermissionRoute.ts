import type { RouteLocationNormalized, RouteRecordRaw } from 'vue-router'
import { useUserStore } from '~/stores'
import type { RoleType } from '~/stores/modules/user/types'

export default function usePermissionRoute() {
  const userStore = useUserStore()
  return {
    accessRouter(route: RouteLocationNormalized | RouteRecordRaw) {
      return (
        !route.meta?.requiresAuth
        || !route.meta?.roles
        || route.meta?.roles?.includes('*')
        || route.meta?.roles?.includes(userStore.role)
      )
    },
    findFirstPermissionRoute(_routers: any, role: RoleType) {
      const cloneRouters = [..._routers]
      while (cloneRouters.length) {
        const firstElement = cloneRouters.shift()
        if (
          firstElement?.meta?.roles?.find((el: string[]) => {
            return el.includes('*') || el.includes(role)
          })
        )
          return { name: firstElement.name || 'all' }
        if (firstElement?.children)
          cloneRouters.push(...firstElement.children)
      }
      return null
    },
    // You can add any rules you want
  }
}
