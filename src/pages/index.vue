<script setup lang="ts">
import Editor from '@tinymce/tinymce-vue'

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
    <div class="mb-4">
      <Editor
        api-key="hrmrb9qlwaatmd663ipwubv3bm5elgxsf39xt0xd1q7c2jlj"
        initial-value="Welcome to TinyMCE， 一个支持 MathType 的编辑器！"
        :init="{
          height: 500,
          tinycomments_mode: 'embedded',
          tinycomments_author: 'Author name',
          mergetags_list: [
            { value: 'First.Name', title: 'First Name' },
            { value: 'Email', title: 'Email' },
          ],
          toolbar_mode: 'sliding',
          plugins: 'tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss',
          external_plugins: { tiny_mce_wiris: 'https://www.wiris.net/demo/plugins/tiny_mce/plugin.js' },
          toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat | tiny_mce_wiris_formulaEditor | tiny_mce_wiris_formulaEditorChemistry',
        }"
      />
    </div>
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
