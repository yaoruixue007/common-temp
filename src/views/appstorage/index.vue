<script setup>
import aHeader from '@/components/header/index.vue'
import {useRouter} from 'vue-router'
import lightApp from "../../sdk/lightAppSDK";
import {ref} from "@vue/reactivity";

const router = useRouter()

const launchCount = ref(0);
lightApp.getAppStorageItem('launchCount')
    .then(res => {
      let count = res;
      if (res){
        launchCount.value = res;
      }else {
        launchCount.value = 1;
        count = 1;
      }
      return Promise.resolve(count);
    })
    .then(res => lightApp.setAppStorageItem('launchCount', res + 1))
    .then(res => {
    });


</script>
<template>
  <div class="page">
    <!-- header -->
    <van-sticky>
      <aHeader title="App本地存储" @handleLeft="router.back()"/>
    </van-sticky>
    <div class="page-content">
      页面打开次数：{{launchCount}}
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