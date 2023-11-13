<script setup lang="ts">
import { Icon } from '@arco-design/web-vue'

defineProps({
  type: {
    type: String,
    default() {
      return ''
    },
  },
  size: {
    type: Number,
    default() {
      return ''
    },
  },
})

const IconFont = Icon.addFromIconFontCn({ src: 'https://dcyweb.oss-cn-qingdao.aliyuncs.com/images/iconfont.js' })
</script>

<template>
  <IconFont :type="type" :size="size" />
</template>

<style scoped lang="less">
</style>
