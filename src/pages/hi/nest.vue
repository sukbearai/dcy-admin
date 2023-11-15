<script setup lang="ts">
</script>

<template>
  <div class="flex flex-col items-center py-16">
    这是一个嵌套路由 😊
  </div>
</template>

<route lang="yaml">
meta:
  layout: SideLayout
  requiresAuth: true
  roles: ['*']
  order: 0
  locale: menu.nest
</route>
