<script setup lang="ts">
import { useArcoLocale } from './modules/arco-design-lang'
import { addEventListen } from './utils/event'

// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components,
// they will be rendered correctly in the html results with vite-ssg
useHead({
  title: '达成云_专业的在线教育平台',
  meta: [
    { name: 'description', content: '达成云专业在线教育平台，聚合大量优质教育机构和名师，下设职业培训、公务员考试、托福雅思、考证考级、英语口语、中小学教育等众多在线学习精品课程，打造老师在线上课教学、学生及时互动学习的课堂。达成云，学习成就梦想！' },
    {
      name: 'theme-color',
      content: () => isDark.value ? '#00aba9' : '#ffffff',
    },
  ],
  link: [
    {
      rel: 'shortcut icon',
      type: 'image/x-icon',
      href: 'https://dcyweb.oss-cn-qingdao.aliyuncs.com/icon/favicon.ico',
    },
  ],
})

// const designWidth = 1440
// const baseRem = 16

// 屏幕适配
function resizeRem() {
  // const screenWidth = document.documentElement.clientWidth || document.body.clientWidth
  // const currentRem = (screenWidth / designWidth) * baseRem
  // document.documentElement.style.fontSize = `${currentRem}px`
}

if (!import.meta.env.SSR) {
  addEventListen(window, 'resize', resizeRem)
  resizeRem()
}

const zhCN = useArcoLocale()
</script>

<template>
  <a-config-provider :locale="zhCN">
    <router-view />
    <global-setting />
  </a-config-provider>
</template>
