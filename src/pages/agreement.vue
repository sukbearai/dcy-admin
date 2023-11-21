<script setup lang="ts">
defineOptions({
  name: 'AgreementPage',
})
</script>

<template>
  <div class="mt-[60px] flex justify-center">
    达成云《用户协议》
  </div>
</template>

<route lang="yaml">
meta:
  requiresAuth: false
  roles: ['*']
</route>

<style lang="less" scoped>
</style>
