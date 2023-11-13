import type { PaginationData } from './common'
import request from '~/utils/request'

export interface CourseInfo {
  id: string
  courseId: string
  courseName: string
  status: number
}

export interface JobTitle {
  code: number
  jobTitle: string
}

export interface SchoolRecords {
  id: string
  schoolId: string
  schoolName: string
  area: string
  areaCode: number[]
  [index: string]: any
}

export interface SchoolData {
  records: SchoolRecords[]
  total: number
  size: number
  current: number
  orders: []
  optimizeCountSql: boolean
  searchCount: boolean
  maxLimit: null
  countId: null
  pages: number
}

export interface SubjectRecord {
  id: string
  professionId: string
  professionName: string
  status: string
}

export function getSchoolList(data: PaginationData) {
  return request<SchoolData>('/dachengyun/school/getSchoolList', data)
}

export function getResourceNum() {
  return request<string>('/dachengyun/common/cloudresource/getResourceNum')
}

export function getClassesList(data: { id: any }) {
  return request<CourseInfo[]>('/dachengyun/cloudresource/queryProfessionClasses', data)
}

export function getJobTitleList() {
  return request<JobTitle[]>('/dachengyun/admin/getJobTitleList')
}

export function getProfessionList() {
  return request<SubjectRecord[]>('/dachengyun/resourcehome/queryProfessionInfo')
}
