import { acceptHMRUpdate, defineStore } from 'pinia'
import { Message } from '@arco-design/web-vue'
import useAppStore from '../app'
import type { UserState } from './types'

import {
  getUserInfo,
  login as userLogin,
  logout as userLogout,
} from '~/api/user'
import { clearToken, setToken } from '~/utils/auth'
import { removeRouteListener } from '~/utils/route-listener'
import type { UserLoginData } from '~/api/user'

const useUserStore = defineStore('user', {
  state: (): UserState => ({
    savedName: '',
    previousNames: [],
    avatar: 'https://avatars.githubusercontent.com/u/120086676?v=4',
    schollName: '',
    schollId: '',
    idcard: '',
    grade: '',
    mobile: '',
    course: [],
    professionalTitle: '',
    userType: 0,
    userName: '',
    id: '',
    courseId: [],
    professional: '',
    status: 0,
    role: '',
    verifyCode: '',
    exerciseInfo: '',
  }),

  getters: {
    userInfo(state: UserState): UserState {
      return { ...state }
    },
    otherNames(state: UserState) {
      return state.previousNames.filter(name => state.savedName !== name)
    },
  },

  actions: {
    setNewName(name: string) {
      if (this.savedName)
        this.previousNames.push(this.savedName)
      this.savedName = name
    },
    switchRoles() {
      return new Promise((resolve) => {
        this.role = this.role === 'teacher' ? 'student' : 'teacher'
        resolve(this.role)
      })
    },
    setExerciseInfo(res: any) {
      this.exerciseInfo = res
    },

    // Set user's information
    setInfo(partial: Partial<UserState>) {
      this.$patch(partial)
    },

    // Reset user's information
    resetInfo() {
      this.$reset()
    },

    // Get user's information
    async info() {
      // setupUserLoginInfoGuard 会处理错误请求
      const userInfo = await getUserInfo()

      this.setInfo({ ...userInfo, role: userInfo.userType === 0 ? '*' : (userInfo.userType === 1 ? 'student' : 'teacher') })
    },

    // Login
    async login(loginForm: UserLoginData, logincCallback: () => void) {
      try {
        const token = await userLogin(loginForm)
        setToken(token)
        Message.success('登录成功')
        logincCallback()
      }
      catch (err) {
        clearToken()
        throw err
      }
    },
    logoutCallBack() {
      const appStore = useAppStore()
      this.resetInfo()
      clearToken()
      removeRouteListener()
      appStore.clearServerMenu()
    },
    // Logout
    async logout() {
      try {
        await userLogout()
        Message.success('退出成功')
      }
      finally {
        this.logoutCallBack()
      }
    },
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore as any, import.meta.hot))

export default useUserStore
