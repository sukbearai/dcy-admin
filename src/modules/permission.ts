import type { DirectiveBinding } from 'vue'
import { useUserStore } from '~/stores'
import type { UserModule } from '~/types'

function checkPermission(el: HTMLElement, binding: DirectiveBinding) {
  const { value } = binding
  const userStore = useUserStore()
  const { role } = userStore

  if (Array.isArray(value)) {
    if (value.length > 0) {
      const permissionValues = value

      const hasPermission = permissionValues.includes('*') || permissionValues.includes(role)
      if (!hasPermission && el.parentNode)
        el.parentNode.removeChild(el)
    }
  }
  else {
    throw new TypeError('need roles! Like v-permission="[\'teacher\',\'student\',\'*\']"')
  }
}

export const install: UserModule = ({ app, isClient }) => {
  if (isClient) {
    app.directive('permission', {
      mounted(el: HTMLElement, binding: DirectiveBinding) {
        checkPermission(el, binding)
      },
      updated(el: HTMLElement, binding: DirectiveBinding) {
        checkPermission(el, binding)
      },
    })
  }
}
