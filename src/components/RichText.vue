<script setup lang="ts">
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import BlotFormatter from 'quill-blot-formatter/dist/BlotFormatter'

defineProps<{
  modelValue: string
}>()

const emit = defineEmits(['update:modelValue'])

const modules = {
  name: 'blotFormatter',
  module: BlotFormatter,
  options: {/* options */},
}

function onUpdateContent(content: any) {
  emit('update:modelValue', content)
}
</script>

<template>
  <div class="rich-text">
    <quill-editor :modules="modules" :content="modelValue" theme="snow" toolbar="full" content-type="html" h-20 @update:content="onUpdateContent" />
  </div>
</template>

<style scoped>
.rich-text {
  --at-apply: text-left;
}
</style>
