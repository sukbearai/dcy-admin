<script setup lang="ts">
const router = useRouter()
</script>

<template>
  <a-result status="403" subtitle="对不起，你没有访问该资源的权限">
    <template #extra>
      <a-space>
        <a-button type="primary" @click="router.back()">
          返回
        </a-button>
      </a-space>
    </template>
  </a-result>
</template>
