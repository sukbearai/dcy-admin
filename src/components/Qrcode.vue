<script setup lang="ts">
// 定义props
const props = defineProps<{
  width: number
  height: number
  content: string
}>()

const generateQrUrl = inject<((style: string, content: string, width: number, height: number) => string)>('generateQrUrl')

const imageUrl = computed(() => {
  return generateQrUrl ? generateQrUrl('A1', props.content, props.width, props.height) : ''
})
</script>

<template>
  <img :src="imageUrl" :width="props.width" :height="props.height" alt="qrcode">
</template>

<style scoped>
</style>
