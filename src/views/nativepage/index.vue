<script setup>
import aHeader from '@/components/header/index.vue'
import {useRouter} from 'vue-router'
import lightApp from "../../sdk/lightAppSDK";
import {ref} from "@vue/reactivity";

const router = useRouter()

const gotoUserPage = () => {
  lightApp.navigateToNativePage({path: '/user/center'}).then(res => {
  });
}

</script>
<template>
  <div class="page">
    <!-- header -->
    <van-sticky>
      <aHeader title="打开底座页面" @handleLeft="router.back()"/>
    </van-sticky>
    <div class="page-content">
      <van-button type="primary" @click="gotoUserPage">打开用户中心</van-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.page {
  width: 100%;
  height: 10%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  background-color: $main-bg;

  .page-content {
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow-y: auto;
  }
}
</style>