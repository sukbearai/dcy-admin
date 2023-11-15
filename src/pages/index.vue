<script setup lang="ts">
defineOptions({
  name: 'IndexPage',
})

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
  </div>
</template>

<route lang="yaml">
meta:
  layout: SideLayout
  requiresAuth: true
  roles: ['*']
  order: 0
  locale: menu.index
  icon: icon-home
</route>
