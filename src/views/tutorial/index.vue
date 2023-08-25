<script setup>
import aHeader from '@/components/header/index.vue'
import { useRouter } from 'vue-router'
import lightApp from "../../sdk/lightAppSDK";
const router = useRouter()

  const list = [
    {
      title: '1.查询底座App信息',
      path: '/appinfo'
    },
    {
      title: '2.退出轻应用',
      path: '/exit'
    },
    {
      title: '3.刷新轻应用',
      path: '/refresh'
    },
    {
      title: '4.获取底座App网络状态',
      path: '/network'
    },
    {
      title: '5.App本地存储',
      path: '/appstorage'
    },
    {
      title: '6.打开底座页面',
      path: '/nativepage'
    },
    {
      title: '7.摄像头Demo',
      path: '/home'
    },
    {
      title: '8.获取资源',
      path: '/resource'
    },
    {
      title: '8.设置保存期限',
      path: '/preriod'
    }
  ];

  const navigateToPage = (item) => {
    if (item.path === '/exit'){
      lightApp.exit();
    }else if (item.path === '/refresh'){
      lightApp.refresh();
    }else{
      router.push({ path: item.path})
    }
  };
</script>
<template>
  <div class="page">
    <!-- header -->
    <van-sticky>
      <aHeader title="使用教程" :backFlag="false"/>
    </van-sticky>
    <van-list>
      <van-cell v-for="item in list" :key="item" :title="item.title" is-link @click="navigateToPage(item)"/>
    </van-list>
  </div>
</template>

<style scoped lang="scss">
.page {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  background-color: $main-bg;
}
</style>