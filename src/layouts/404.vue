<script setup lang="ts">
const router = useRouter()
</script>

<template>
  <a-result status="404" subtitle="抱歉，页面未找到～">
    <template #extra>
      <a-space>
        <a-button type="primary" @click="router.back()">
          返回
        </a-button>
      </a-space>
    </template>
  </a-result>
</template>
