<script setup lang="ts">
defineOptions({
  name: 'VitessePage',
})
const user = useUserStore()
const name = ref(user.userName)
const router = useRouter()
function go() {
  if (name.value)
    router.push(`/hi/${encodeURIComponent(name.value)}`)
}

const { t } = useI18n()
</script>

<template>
  <div>
    <div class="flex flex-col items-center py-16">
      <div text-4xl>
        <div i-carbon-campsite inline-block />
      </div>
      <p>
        <a rel="noreferrer" href="https://github.com/antfu/vitesse" target="_blank">
          Vitesse
        </a>
      </p>
      <p>
        <em text-sm opacity-75>{{ t('intro.desc') }}</em>
      </p>

      <div py-4 />

      <TheInput
        v-model="name"
        :placeholder="t('intro.whats-your-name')"
        autocomplete="false"
        @keydown.enter="go"
      />
      <label class="hidden" for="input">{{ t('intro.whats-your-name') }}</label>

      <div>
        <button
          m-3 text-sm btn
          :disabled="!name"
          @click="go"
        >
          {{ t('button.go') }}
        </button>
      </div>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: SideLayout
  requiresAuth: true
  roles: ['*']
  order: 1
  locale: menu.vitesse
  icon: icon-robot
</route>
