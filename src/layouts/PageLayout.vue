<script lang="ts" setup>
import { computed } from 'vue'
import { useTabBarStore } from '~/stores'

const tabBarStore = useTabBarStore()

const cacheList = computed(() => tabBarStore.getCacheList)
</script>

<template>
  <router-view v-slot="{ Component, route }">
    <transition name="fade">
      <div :key="route.fullPath">
        <component
          :is="Component"
          v-if="route.meta.ignoreCache"
          :key="route.fullPath"
        />
        <keep-alive v-else :include="cacheList">
          <component :is="Component" :key="route.fullPath" />
        </keep-alive>
      </div>
    </transition>
  </router-view>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
