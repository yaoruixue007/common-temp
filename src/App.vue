<script setup>
  import { watch, computed, getCurrentInstance } from 'vue'
  import { RouterView } from 'vue-router'
  import useCommonStore from '@/store/commonStore'
  import successIcon from '@/assets/img/success-icon.png'
  const {
    proxy: { $toast, $closeToast, $sdk }
  } = getCurrentInstance()
  const commonStore = useCommonStore()
  const commonLoading = computed(() => commonStore.commonLoading)
  const loadingText = computed(() => commonStore.loadingText)
  const isShowLoading = computed(() => commonStore.isShowLoading)

  $sdk.init();


  watch([isShowLoading, loadingText, commonLoading], (newValue, oldValue) => {
    const [isShowLoading, loadingText, commonLoading] = newValue
    if (isShowLoading) {
      if (commonLoading) {
        $toast({
          loading: true,
          message: `正在${loadingText}...`
        })
      } else {
        $toast({
          message: `${loadingText}成功`,
          src: successIcon,
          duration: 2000
        })
      }
    } else {
      $closeToast()
    }
    console.log('count changed from', oldValue, 'to', newValue)
  })
</script>

<template>
  <div class="page-app">
    <RouterView />
  </div>
</template>

<style>
  #app {
    width: 100%;
    height: 100%;
  }
  .page-app {
    width: 100vw;
    height: 100vh;
  }
</style>
