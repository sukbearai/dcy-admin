import type { RouteRecordRaw } from 'vue-router'
import routes from '~pages'

function filterHideInMenu() {
  function travel(_routes: RouteRecordRaw[]) {
    return _routes.map((menu) => {
      if (menu?.children && menu.children.length)
        menu.children = travel(menu?.children) as RouteRecordRaw[]

      if (!menu?.meta?.hideInMenu)
        return menu

      return null
    }).filter(el => el !== null)
  }

  return travel(routes)
}

const appClientMenus = [...filterHideInMenu()].map((el) => {
  const { name, path, meta, redirect, children } = el as RouteRecordRaw

  return {
    name,
    path,
    meta,
    redirect,
    children,
  }
})
export default appClientMenus
