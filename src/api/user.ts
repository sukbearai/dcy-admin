import axios from 'axios'
import type { RouteRecordNormalized } from 'vue-router'
import type { UserState } from '~/stores/modules/user/types'
import request from '~/utils/request'

export interface UserLoginData {
  mobile: string
  idcard: string
  passWord: string
}

export interface LoginData {
  username: string
  password: string
}

export interface LoginRes {
  token: string
}

export function getMenuList() {
  return axios.post<RouteRecordNormalized[]>('/api/user/menu')
}

export function login(data: UserLoginData) {
  return request<string>('/dachengyun/guest/login/accountLogin', data)
}

export function logout() {
  return request<string>('/dachengyun/common/user/logout')
}

export function getUserInfo() {
  return request<UserState>('/dachengyun/guest/login/userTokenVerify', {}, 'GET')
}
