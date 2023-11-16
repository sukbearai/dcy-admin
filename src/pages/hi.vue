<script setup lang="ts">
</script>

<template>
  <div>
    <router-view />
  </div>
</template>

<route lang="yaml">
meta:
  layout: SideLayout
  requiresAuth: true
  roles: ['*']
  order: 3
  locale: menu.hi
  icon: icon-list
  iconFont: icon-a-bajiaohuangjinjinsejinpaixunzhanghuizhangwwwbirckejcn
</route>
