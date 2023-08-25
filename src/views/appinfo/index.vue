<script setup>
import aHeader from '@/components/header/index.vue'
import { useRouter } from 'vue-router'
import lightApp from "../../sdk/lightAppSDK";
import {ref} from "@vue/reactivity";
const router = useRouter()

const appInfo = ref({
  uniqueId:'111111111',
  model: 'Huawei P30',
  deviceName: 'Huawei手机',
  versionName: '0.1.0'
});

lightApp.getAppInfo()
.then(res => appInfo.value = res);

</script>
<template>
  <div class="page">
    <!-- header -->
    <van-sticky>
      <aHeader title="查询底座App信息" @handleLeft="router.back()" />
    </van-sticky>
    <div class="page-content">
      <p/>手机设备ID：{{appInfo.uniqueId}}
      <p/>手机设备型号：{{appInfo.model}}
      <p/>手机设备名称：{{appInfo.deviceName}}
      <p/>底座App版本：{{appInfo.versionName}}
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