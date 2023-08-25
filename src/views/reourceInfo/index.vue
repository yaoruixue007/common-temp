<script setup>
import aHeader from '@/components/header/index.vue'
import { useRouter } from 'vue-router'
import lightApp from "../../sdk/lightAppSDK";
import {ref} from "@vue/reactivity";
const router = useRouter()
let resourceInf = ref('');
const params = { page: 1, page_size: 10, device_id: '1692490305646174210', startAt: '', endAt: '' }
lightApp.getResource(params)
.then(res => {
    resourceInf.value = JSON.stringify(res);
});

</script>
<template>
  <div class="page">
    <!-- header -->
    <van-sticky>
      <aHeader title="查询资源信息" @handleLeft="router.back()" />
    </van-sticky>
    <div class="page-content">
      <p>资源返回值：{{resourceInf}}</p>
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