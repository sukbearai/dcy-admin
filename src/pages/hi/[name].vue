<script setup lang="ts">
const { t } = useI18n()
const route = useRoute()
const richTextValue = ref('🌈 QuillEditor')

const name = computed(() => route.params?.name)
</script>

<template>
  <div class="mt-16 flex flex-col items-center justify-center">
    <p class="text-[36px]">
      😊 {{ t('intro.hi', { name }) }}
    </p>
    <p class="mt-4">
      ⚡️⚡️ 这是一个基于Vitesse、Arco Design Pro的后端管理模板
    </p>
    <rich-text v-model="richTextValue" class="mt-4 w-[600px]" />
  </div>
</template>

<route lang="yaml">
meta:
  layout: DefaultLayout
  requiresAuth: true
  roles: ['*']
</route>
