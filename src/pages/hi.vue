<template>
  <div class="layout-max-width">
    <router-view />
  </div>
</template>

<route lang="yaml">
  meta:
    layout: DefaultLayout
    requiresAuth: true
    roles: ['*']
</route>
