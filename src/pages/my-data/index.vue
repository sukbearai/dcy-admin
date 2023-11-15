<script setup lang="ts">
defineOptions({
  name: 'MyDataPage',
})
</script>

<template>
  <div class="container">
    <Breadcrumb />
    <div class="layout">
      <div class="layout-content">
        <a-space :size="16" direction="vertical" fill>
          <Studio />
          <StudioInformation />
        </a-space>
      </div>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: SideLayout
  requiresAuth: true
  roles: ['*']
  order: 2
  locale: menu.my.data
  icon: icon-user
</route>

<style scoped lang="less">
  .container {
    padding: 20px 20px 20px 20px;
  }

  .content {
    display: flex;
    margin-top: 12px;

    &-left {
      flex: 1;
      margin-right: 16px;
      overflow: hidden;
      // background-color: var(--color-bg-2);

      :deep(.arco-tabs-nav-tab) {
        margin-left: 16px;
      }
    }

    &-right {
      width: 332px;
    }

    .tab-pane-wrapper {
      padding: 0 16px 16px 16px;
    }
  }
</style>

<style lang="less" scoped>
  .mobile {
    .content {
      display: block;
      &-left {
        margin-right: 0;
        margin-bottom: 16px;
      }
      &-right {
        width: 100%;
      }
    }
  }
</style>
