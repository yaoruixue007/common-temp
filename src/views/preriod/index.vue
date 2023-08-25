<script setup>
import aHeader from '@/components/header/index.vue'
import { useRouter } from 'vue-router'
import lightApp from "../../sdk/lightAppSDK";
import {ref} from "@vue/reactivity";
const router = useRouter()
let resourceInf = ref('');
const params = { peroid: 7 }
lightApp.setResourcePeroid(params)
.then(res => {
    resourceInf.value = JSON.stringify(res);
});

</script>
<template>
  <div class="page">
    <!-- header -->
    <van-sticky>
      <aHeader title="设置资源保存期限" @handleLeft="router.back()" />
    </van-sticky>
    <div class="page-content">
      <p>返回值：{{resourceInf}}</p>
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