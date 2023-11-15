import routes from '~pages'

const filterMenus = ['login', 'all']

const appClientMenus = [...routes].filter(el => !filterMenus.includes(el.name as string)).map((el) => {
  const { name, path, meta, redirect, children } = el

  return {
    name,
    path,
    meta,
    redirect,
    children,
  }
})
export default appClientMenus
