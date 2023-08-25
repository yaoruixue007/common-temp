<script setup>
import { defineProps, getCurrentInstance } from 'vue'
import loadingIcon from '../../assets/img/loading-icon.png'
const { proxy } = getCurrentInstance()
const props = defineProps({
  // 图片icon
  src: {
    type: String,
    default: loadingIcon
  },
  // iconfont
  iconClass: {
    type: String,
    default: 'icon-loading'
  },
  loading: {
    type: Boolean,
    default: false
  },
  // 弹窗延时关闭时间，0 永久
  duration: {
    type: Number,
    default: 2000
  },
  // 提示消息
  message: {
    type: String,
    default: '正在处理...'
  },
})

</script>
<template>
  <div class="page-toast">
    <div class="page-toast-icon">
      <img v-if="src" :class="[{ run: loading }]" :src="src" alt="">
      <span v-else :class="['iconfont', iconClass, { run: loading }]"></span>
    </div>
    <div class="page-toast-message">
      {{ message }}
    </div>
  </div>
</template>

<style scoped lang="scss">
  .page-toast {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 15px;
    border-radius: 10px;
    background: rgba(0,0,0,0.6);
    .page-toast-icon {
      width: 30px;
      height: 30px;
      margin-bottom: 15px;
      img {
        width: 100%;
        height: 100%;
        display: block;
      }
    }
    .page-toast-message {
      font-size: 14px;
      color: #fff;
    }
    .run {
      animation: run 1.5s linear infinite;
    }
    @keyframes run {
      0% {
        transform: rotate(0);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }
</style>
