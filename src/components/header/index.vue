<script setup>
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const props = defineProps({
  // 页面标题
  title: {
    type: String,
    default: ''
  },
  // 是否有返回按钮以及按钮作用
  backFlag: {
    type: String,
    default: 'back' // back 调用 go(-1)  other 嗲用自定义事件
  },
  // 是否有删除按钮
  isDelete: {
    type: Boolean,
    default: false
  },
})

const emit = defineEmits(['handleLeft'])
const handleBack = () => {
    const flag = props.isDelete ? 'del' : props.backFlag
    if (!flag) return
    emit('handleLeft', flag)
    
}

</script>
<template>
  <div class="page-header van-hairline--bottom van-safe-area-top">
    <div class="header-left">
      <span v-if="props.backFlag || props.isDelete" :class="['iconfont', {'icon-fanhui': props.backFlag}, {'icon-guanbi': props.isDelete}]" @click="handleBack"></span>
    </div>
    <div class="header-center">{{ props.title }}</div>
    <div class="header-right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .page-header {
    width: 100%;
    height: 44px;
    background-color: $content-bg;
    box-shadow: 0px 1px 1px 0px rgba(213,220,233,0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    .header-left {
      padding-left: $item-padding-left;
    }
    .header-center {
      font-size: $header-size;
      font-weight: 600;
    }
    .header-right {
      padding-right: $item-padding-right;
    }
  }
</style>
