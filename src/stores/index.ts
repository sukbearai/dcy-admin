import { createPinia } from 'pinia'
import useUserStore from './modules/user'
import useAppStore from './modules/app'
import useTabBarStore from './modules/tab-bar'

const pinia = createPinia()

export { useUserStore, useAppStore, useTabBarStore }
export default pinia
