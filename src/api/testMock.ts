import request from '~/utils/request'

export interface TodoMock {
  name: string
  finished: boolean
}

export function fetchTodoList() {
  return request<TodoMock[]>('/dachengyun/user/queryTodoMockList')
}
