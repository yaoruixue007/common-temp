<script setup>
import aHeader from '@/components/header/index.vue'
import { useRouter } from 'vue-router'
import lightApp from "../../sdk/lightAppSDK";
import {ref} from "@vue/reactivity";
const router = useRouter()

//-1:是未知网络 ，0 是无网络 ，1 是移动蜂窝网络，2 是WIFI
const networkInfo = ref(-1);

//获取底座App网络状态
lightApp.getNetworkInfo().then(status => networkInfo.value = status);

//监听底座App网络变化
lightApp.addEventListener('networkChange',status => {
  networkInfo.value = status;
});

</script>
<template>
  <div class="page">
    <!-- header -->
    <van-sticky>
      <aHeader title="获取底座App网络状态" @handleLeft="router.back()" />
    </van-sticky>
    <div class="page-content">
      当前网络状态：{{networkInfo > 0 ? '网络已连接':'网络已断开'}}
    </div>
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

  .page-content {
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow-y: auto;
  }
}
</style>