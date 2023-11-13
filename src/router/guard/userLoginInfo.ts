import type { LocationQueryRaw, Router } from 'vue-router'

import NProgress from 'nprogress' // progress bar

import { useUserStore } from '~/stores'
import { isLogin } from '~/utils/auth'

export default function setupUserLoginInfoGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    NProgress.start()
    const userStore = useUserStore()

    const requiresAuth = to.meta.requiresAuth !== false

    if (isLogin()) {
      // 已登陆
      if (userStore.role) {
        next()
      }
      else {
        try {
          await userStore.info()
          next()
        }
        catch (error) {
          await userStore.logout()
          next({
            name: 'login',
            query: {
              redirect: to.path,
              ...to.query,
            } as LocationQueryRaw,
          })
        }
      }
    }
    else {
      if (!requiresAuth || to.name === 'login') {
        next()
        return
      }
      next({
        name: 'login',
        query: {
          redirect: to.path,
          ...to.query,
        } as LocationQueryRaw,
      })
    }
  })
}
