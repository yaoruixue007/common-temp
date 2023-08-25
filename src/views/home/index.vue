<script setup>
  import aHeader from '@/components/header/index.vue'
  import { useRoute, useRouter } from 'vue-router'
  import { reactive, onMounted, onUnmounted, ref, getCurrentInstance, computed } from 'vue'
  const { proxy: { $api, $constant, $imgs, $toast, $closeToast } } = getCurrentInstance()
  const router = useRouter()
  const { query, meta: { title, show } } = useRoute()
  const active = ref(0)

  const handelBarList = [
    {
      id: 1,
      name: '焦距',
      img: $imgs.shuofangIcon
    },
    {
      id: 2,
      name: '截图',
      img: $imgs.jietuIcon
    },
    {
      id: 3,
      name: '录屏',
      img: $imgs.lupingIcon
    },
    {
      id: 4,
      name: '音量',
      img: $imgs.yingliangIcon
    },
  ]

  // 页面挂载
  onMounted(async () => { })
  // 页面卸载
  onUnmounted(() => { })

  /**
   * 接口相关
   */
  // 遥控上下左右
  const setCameraDirection = async (direction) => {
    const res = await $api.home.setCameraDirection(direction, '操作').catch(() => {})
  }
  /**
   * 操作相关
   */
  // 操作控件
  const handleScreen = (name) => {
    $toast({
      message: '操作' + name,
      src: $imgs.successIcon
    })
  }
  // 操作摄像头上、下、左、右
  const handleCamera = (direction) => {
    setCameraDirection(direction)
  }


</script>
<template>
  <div class="page">
    <!-- header -->
    <van-sticky>
      <aHeader :title="show ? title : ''" backFlag="custom" @handleLeft="router.back()">
        <template #right>
            <img class="icon-common" :src="$imgs.settingIcon" alt="">
        </template>
      </aHeader>
    </van-sticky>

    <!-- 内容主体 -->
    <div class="page-content">
      <div class="video-wrap">
        <img class="handle-screen" :src="$imgs.fangdaIcon" @click="handleScreen('全屏')">
      </div>
      <div class="handle-bar">
        <img class="handle-bar-img" v-for="info in handelBarList" :src="info.img" :key="info.id" @click="handleScreen(info.name)">
      </div>
      <div class="handle-menu">
        <div class="img-wrap">
          <img :src="$imgs.kongzhiIcon" alt="">
          <div class="handle-menu-btn up" key="handle-menu-btn-up" @click="handleCamera('Up')"></div>
          <div class="handle-menu-btn right" key="handle-menu-btn-right" @click="handleCamera('Right')"></div>
          <div class="handle-menu-btn down" key="handle-menu-btn-down" @click="handleCamera('Down')"></div>
          <div class="handle-menu-btn left" key="handle-menu-btn-left" @click="handleCamera('Left')"></div>
        </div>
        
      </div>
      
    </div>
    <van-tabbar v-model="active">
      <van-tabbar-item>
        <span>首页</span>
        <template #icon>
          <img src="../../assets/img/home.png" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item>
        <span>回看</span>
        <template #icon>
          <img src="../../assets/img/lookback.png" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
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
      .video-wrap {
        position: relative;
        height: 210px;
        background: #333333;
        .handle-screen {
          position: absolute;
          width: 25px;
          height: 25px;
          bottom: 10px;
          right: 10px;
        }
      }
      .handle-bar {
        height: 88px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        border-radius: 0px 0px 10px 10px;
        background: #FFFFFF;
        box-shadow: 0px 2px 2px 0px rgba(213,220,233,0.2);
        .handle-bar-img {
          width: 28px;
          height: 28px;
        }
      }
      .handle-menu {
       
        flex: 1;
        display: flex;
        justify-content: space-around;
        align-items: center;
        .img-wrap {
          position: relative;
          width: 160px;
          height: 160px;
          img {
            width: 100%;
            height: 100%;
            display: block;
          }
          .handle-menu-btn {
            position: absolute;
            width: 50px;
            height: 50px;
            &.up {
              top: 0;
              left: 50%;
              transform: translate(-50%, 0);
            }
            &.right {
              right: 0;
              top: 50%;
              transform: translate(0, -50%);
            }
            &.down {
              bottom: 0;
              left: 50%;
              transform: translate(-50%, 0);
            }
            &.left {
              left: 0;
              top: 50%;
              transform: translate(0, -50%);
            }
          }
        }
        
        
      }
    }
  }
  .notice-icon {
    display: inline-block;
    width: 20px;
    height: 20px;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
  }

  @keyframes run {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .van-tabbar--fixed {
    position: relative;
    box-shadow: 0px 0px 4px 0px rgba(182,205,239,0.42);
  }
  
</style>
