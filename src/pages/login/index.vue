<script setup lang="ts">
interface UserLoginInfo {
  account: string
  password: string
  remember: boolean
}

interface VerificationInfo {
  phone: string
}

interface ForgetInfo {
  code: string
  password1: string
  password2: string
  phone: string
}

interface RegisterInfo {
  code: string
  course: string[]
  idCard: string
  isAgree: boolean
  password: string
  phone: string
  role: string
  school: string
  subject: string
  title: string
  username: string
  year: string
}

const userStore = useUserStore()
const router = useRouter()
const loginSuccess = ref(false)
const forgetSuccess = ref(false)
const registerSuccess = ref(false)

// 短信模板
const smsTemplate = 'SMS_213920328'

const { data: courseList } = useRequest(() => getClassesList({ id: '' }), {
  initialData: [],
  refreshDeps: [],
})

const { data: titleList } = useRequest(() => getJobTitleList(), {
  initialData: [],
  refreshDeps: [],
})

const { data: schoolData } = useRequest(() => getSchoolList({ pageIndex: 0, pageSize: 1000 }), {
  initialData: null,
  refreshDeps: [],
})

const { data: subjectList } = useRequest(() => getProfessionList())

const schoolList = computed(() => schoolData.value?.records)

async function onLogin(userInfo: UserLoginInfo) {
  await requestUserLogin(userInfo)
  // loginSuccess.value = true
}

async function requestUserLogin(res: UserLoginInfo) {
  userStore.login({
    mobile: res.account,
    idcard: res.account,
    passWord: res.password,
  }, () => {
    // 登录成功，跳转页面
    const { redirect, ...othersQuery } = router.currentRoute.value.query
    router.push({
      path: (redirect as string) || '/',
      query: {
        ...othersQuery,
      },
    })
  })
}

async function onSend({ phone }: VerificationInfo) {
  await getVerificationSend({ mobile: phone, smsTemplate })
}

async function onForget({ phone, code, password2 }: ForgetInfo) {
  const data = {
    mobile: phone,
    idcard: phone,
    passWord: password2,
    verifyCode: code,
  }
  await getResetPassWord(data)
  forgetSuccess.value = true
}

async function onRegister(registerInfo: RegisterInfo) {
  const data = {
    userType: registerInfo.role === 'teacher' ? 2 : 1, /* 1学生 2老师 */
    userName: registerInfo.username,
    mobile: registerInfo.phone,
    idcard: registerInfo.idCard,
    passWord: registerInfo.password,
    schollId: registerInfo.school,
    professional: registerInfo.subject,
    grade: registerInfo.year,
    course: courseList.value!.filter((item: any) => registerInfo.course.includes(item.id))
      .map((item: any) => item.courseName),
    courseId: registerInfo.course,
    professionalTitle: registerInfo.title,
    verifyCode: registerInfo.code,
  }

  await getUserRegister(data)

  registerSuccess.value = true
}

function onUpdateForgetSuccess(res: boolean) {
  forgetSuccess.value = res
}

function onUpdateRegisterSuccess(res: boolean) {
  registerSuccess.value = res
}

function clickAgreement() {
  if (!import.meta.env.SSR)
    window.open('/agreement', '_blank')
}
</script>

<route lang="yaml">
meta:
  requiresAuth: false
  roles: ['*']
  hideInMenu: true
</route>

<template>
  <div class="login-page">
    <login-page
      :login-success="loginSuccess" :forget-success="forgetSuccess" :register-success="registerSuccess"
      :school-list="schoolList" :course-list="courseList" :title-list="titleList" :subject-list="subjectList"
      @login="onLogin" @send-code="onSend" @forget="onForget" @register="onRegister"
      @update-forget-success="onUpdateForgetSuccess" @update-register-success="onUpdateRegisterSuccess"
      @click-agreement="clickAgreement"
    >
      <template #logo>
        <span i-dcy:logo style="font-size: 27px;" />
      </template>
    </login-page>
  </div>
</template>

<style lang="less">
.login-page {
  width: 100vw;
  height: 100vh;
}
</style>
