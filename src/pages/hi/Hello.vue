<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <div class="flex flex-col items-center py-16">
    {{ t('hi.hello') }}
  </div>
</template>

<route lang="yaml">
meta:
  layout: SideLayout
  requiresAuth: true
  roles: ['*']
  order: 0
  locale: menu.hello
</route>
