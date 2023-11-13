import createRouteGuard from '~/router/guard'
import type { UserModule } from '~/types'

export const install: UserModule = async ({ router, isClient, routes }) => {
  if (isClient)
    createRouteGuard(router, [...routes])
}
