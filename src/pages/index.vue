<script setup lang="ts">
defineOptions({
  name: 'IndexPage',
})
const user = useUserStore()
const name = ref(user.userName)
const router = useRouter()
function go() {
  if (name.value)
    router.push('/hi/name')
}

const { t } = useI18n()

// 图表渲染
const { chartOption: chartOptionOne } = useChartOption((isDark) => {
  return {
    tooltip: {
      show: true,
      trigger: 'item',
    },
    graphic: {
      elements: [
        {
          type: 'text',
          left: 'center',
          top: '48%',
          style: {
            text: '85.15%',
            textAlign: 'center',
            fill: isDark ? '#ffffffb3' : '#333',
            fontSize: 12,
            fontWeight: 500,
          },
        },
      ],
    },
    series: [
      {
        type: 'pie',
        radius: ['65%', '90%'],
        center: ['50%', '50%'],
        label: {
          show: false,
          position: 'center',
        },
        data: [
          {
            value: 86,
            name: '达成',
            itemStyle: {
              color: '#249EFF',
            },
          },
          {
            value: 24,
            name: '未达成',
            itemStyle: {
              color: 'rgb(232,232,232)',
            },
          },
        ],
      },
    ],
  }
})

const { chartOption: chartOptionTwo } = useChartOption((isDark) => {
  return {
    tooltip: {
      show: true,
      trigger: 'item',
    },
    graphic: {
      elements: [
        {
          type: 'text',
          left: 'center',
          top: '48%',
          style: {
            text: '85.15%',
            textAlign: 'center',
            fill: isDark ? '#ffffffb3' : '#333',
            fontSize: 12,
            fontWeight: 500,
          },
        },
      ],
    },
    series: [
      {
        type: 'pie',
        radius: ['65%', '90%'],
        center: ['50%', '50%'],
        label: {
          show: false,
          position: 'center',
        },
        data: [
          {
            value: 30,
            name: '已完成',
            itemStyle: {
              color: 'purple',
            },
          },
          {
            value: 70,
            name: '未完成',
            itemStyle: {
              color: '#fff',
            },
          },
        ],
      },
    ],
  }
})
</script>

<template>
  <div class="flex flex-col items-center py-16">
    <div class="w-full flex justify-center">
      <Chart width="110px" height="110px" :option="chartOptionOne" />
      <Chart width="110px" height="110px" :option="chartOptionTwo" />
    </div>
    <a-space class="mt-4">
      <a-button type="primary">
        Primary
      </a-button>
      <a-button>Secondary</a-button>
      <a-button type="dashed">
        Dashed
      </a-button>
      <a-button type="outline">
        Outline
      </a-button>
      <a-button type="text">
        Text
      </a-button>
      <icon-customer-service />
    </a-space>
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
</template>

<route lang="yaml">
meta:
  layout: SideLayout
  requiresAuth: true
  roles: ['*']
  order: 1
  locale: menu.index
  icon: icon-dashboard
</route>
