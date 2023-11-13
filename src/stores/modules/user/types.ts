export type RoleType = '' | '*' | 'teacher' | 'student'
export interface UserState {
  schollName: string
  schollId: string
  idcard: string
  grade: string
  mobile: string
  course: string[]
  professionalTitle: string
  userType: number
  userName: string
  id: string
  courseId: string[]
  professional: string
  status: number
  role: RoleType
  verifyCode: string
  exerciseInfo: any
}
