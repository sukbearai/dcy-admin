import Mock from 'mockjs'
import setupMock, {
  failResponseWrap,
  successResponseWrap,
} from '~/utils/setup-mock'

import { isLogin } from '~/utils/auth'

setupMock({
  mock: false,
  setup() {
    // Mock.XHR.prototype.withCredentials = true;

    // 代办事项
    Mock.mock(/\/dachengyun\/exerciseinteract\/queryInteractExercises/, () => {
      if (isLogin()) {
        const getRenderData = () => {
          return {
            records: [
              {
                createDate: '2023-07-12 03:08:44',
                updateDate: '2023-07-19 13:50:20',
                createUid: 1001,
                isDeleted: 0,
                id: 1,
                libId: 1,
                exercisesInfo: {
                  createDate: '2023-07-12 02:40:06',
                  updateDate: '2023-07-17 10:08:29',
                  isDeleted: 0,
                  id: 1,
                  exercisesId: '4001',
                  exercisesName: '习题库4001',
                  pid: 1,
                  courseInfo: {
                    createDate: '2023-07-12 02:34:31',
                    updateDate: '2023-07-12 10:34:31',
                    createUid: null,
                    updateUid: null,
                    isDeleted: 0,
                    id: 1,
                    courseId: '2001',
                    courseName: '2001课程',
                    status: 0,
                  },
                  cid: 1,
                  professionInfo: {
                    createDate: '2023-07-12 02:33:40',
                    updateDate: '2023-07-12 10:33:40',
                    createUid: null,
                    updateUid: null,
                    isDeleted: 0,
                    id: 1,
                    professionId: '1001',
                    professionName: '专业1001',
                    status: 0,
                  },
                  num: 3,
                  manager: 1001,
                  approver: [
                    1001,
                    1002,
                  ],
                  collectCount: 100,
                },
                knowledgeId: [
                  1,
                  2,
                ],
                knowledgeInfoList: [
                  {
                    createDate: '2023-07-12 02:37:17',
                    updateDate: '2023-07-12 10:37:17',
                    isDeleted: 0,
                    id: 1,
                    pid: 1,
                    cid: 1,
                    fatherPointId: 0,
                    thisPoint: '5001知识点',
                  },
                  {
                    createDate: '2023-07-12 02:37:22',
                    updateDate: '2023-07-12 10:37:22',
                    isDeleted: 0,
                    id: 2,
                    pid: 1,
                    cid: 1,
                    fatherPointId: 0,
                    thisPoint: '5002知识点',
                  },
                ],
                type: 'SINGLE_CHOICE',
                score: 20,
                content: '测试题目1',
                options: [
                  {
                    optionCode: 'A',
                    optionContent: '选项A',
                    isCorrect: false,
                  },
                  {
                    optionCode: 'B',
                    optionContent: '选项B',
                    isCorrect: true,
                  },
                  {
                    optionCode: 'C',
                    optionContent: '选项C',
                    isCorrect: false,
                  },
                ],
                answer: 'B',
                analysis: '答案解析1',
                difficulty: 0.7,
                collectCount: 106,
                practiceCount: 100,
                wrongCount: 0,
                open: false,
                stage: 3,
                status: 1,
                isCollect: 0,
              },
              {
                createDate: '2023-07-12 03:08:44',
                updateDate: '2023-07-19 13:50:20',
                createUid: 1001,
                isDeleted: 0,
                id: 2,
                libId: 1,
                exercisesInfo: {
                  createDate: '2023-07-12 02:40:06',
                  updateDate: '2023-07-17 10:08:29',
                  isDeleted: 0,
                  id: 1,
                  exercisesId: '4001',
                  exercisesName: '习题库4001',
                  pid: 1,
                  courseInfo: {
                    createDate: '2023-07-12 02:34:31',
                    updateDate: '2023-07-12 10:34:31',
                    createUid: null,
                    updateUid: null,
                    isDeleted: 0,
                    id: 1,
                    courseId: '2001',
                    courseName: '2001课程',
                    status: 0,
                  },
                  cid: 1,
                  professionInfo: {
                    createDate: '2023-07-12 02:33:40',
                    updateDate: '2023-07-12 10:33:40',
                    createUid: null,
                    updateUid: null,
                    isDeleted: 0,
                    id: 1,
                    professionId: '1001',
                    professionName: '专业1001',
                    status: 0,
                  },
                  num: 3,
                  manager: 1001,
                  approver: [
                    1001,
                    1002,
                  ],
                  collectCount: 100,
                },
                knowledgeId: [
                  1,
                  2,
                ],
                knowledgeInfoList: [
                  {
                    createDate: '2023-07-12 02:37:17',
                    updateDate: '2023-07-12 10:37:17',
                    isDeleted: 0,
                    id: 1,
                    pid: 1,
                    cid: 1,
                    fatherPointId: 0,
                    thisPoint: '5001知识点',
                  },
                  {
                    createDate: '2023-07-12 02:37:22',
                    updateDate: '2023-07-12 10:37:22',
                    isDeleted: 0,
                    id: 2,
                    pid: 1,
                    cid: 1,
                    fatherPointId: 0,
                    thisPoint: '5002知识点',
                  },
                ],
                type: 'SINGLE_CHOICE',
                score: 20,
                content: '测试题目1',
                options: [
                  {
                    optionCode: 'A',
                    optionContent: '选项A',
                    isCorrect: false,
                  },
                  {
                    optionCode: 'B',
                    optionContent: '选项B',
                    isCorrect: true,
                  },
                  {
                    optionCode: 'C',
                    optionContent: '选项C',
                    isCorrect: false,
                  },
                ],
                answer: 'B',
                analysis: '答案解析1',
                difficulty: 0.7,
                collectCount: 106,
                practiceCount: 100,
                wrongCount: 0,
                open: false,
                stage: 3,
                status: 1,
                isCollect: 0,
              },
            ],
            total: 1,
            size: 2,
            current: 1,
            orders: [],
            optimizeCountSql: true,
            searchCount: true,
            maxLimit: null,
            countId: null,
            pages: 1,
          }
        }
        return successResponseWrap(getRenderData())
      }
      return failResponseWrap(null, '未登录', 50008)
    })
  },
})
