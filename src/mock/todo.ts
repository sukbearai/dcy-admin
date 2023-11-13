import Mock from 'mockjs'
import setupMock, {
  failResponseWrap,
  successResponseWrap,
} from '~/utils/setup-mock'

import { isLogin } from '~/utils/auth'
import type { TodoMock } from '~/api/testMock'

setupMock({
  mock: false,
  setup() {
    // Mock.XHR.prototype.withCredentials = true;

    // 代办事项
    Mock.mock(/\/dachengyun\/user\/queryTodoMockList/, () => {
      if (isLogin()) {
        const presetData = ['学习十分钟', '游泳一小时', '去聚餐', '打游戏', '练舞']
        const getTodoList: () => TodoMock[] = () => {
          const count = 5
          return new Array(count).fill(0).map((el, idx) => ({
            name: presetData[idx],
            finished: false,
          }))
        }
        return successResponseWrap(getTodoList())
      }
      return failResponseWrap(null, '未登录', 50008)
    })
  },
})
