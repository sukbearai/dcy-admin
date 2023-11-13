<template>
  <div class="nav-footer">
    <p>
      Copyright © 2023 dachengyun All Rights Reserved
    </p>
    <p>@dcyjs 版权所有 <a href="https://beian.miit.gov.cn/">赣ICP备xxxxxxxx号-10</a> </p>
    <div style="width: 300px;margin: 0 auto; padding: 0.5rem 0;" text-center>
      <a target="_blank" href="https://www.beian.gov.cn/portal/registerSystemInfo?recordcode=36010602000293" style="display: inline-block; text-decoration: none; height: 20px; line-height: 20px;">
        <img src="/src/assets/images/beian.png" style="float: left;">
        <p style="float: left; height: 20px; line-height: 20px; margin: 0px 0px 0px 5px; color:#9e9e9e;">赣公网安备 xxxxxxxxxx号</p>
      </a>
    </div>
  </div>
</template>

<style scoped lang="less">
.nav-footer {
  --at-apply: flex flex-col justify-center items-center;
  height: 200px;
  background: #f2f2f2;
  color: #666;
  p{
    --at-apply: my-2;
  }
}
</style>
