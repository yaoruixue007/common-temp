# petcapture（算法轻应用）

# 应用说明

算法轻应用（spa），用来展示摄像头通过算法捕捉宠物宠物的一些精彩瞬间生成的靓照，

# 环境说明
 + nodejs 版本18.15.0
 + npm 版本 9.5.0
 > 适用人群，有一定的JavaScript基础，对vue2或者vue3有一定了解

# 技术栈说明
 + **vue3(3.2.47)** 主要应用框架，编码方式主要使用composition-api风格
 + **vue-roter(4.1.6)** 路由管理
 + **vant(4.1.2)** 第三方UI库
 + **pinia(2.1.3)** 公共使用存储
 + **vite(4.1.4)** 构建包工具
 + **node-sass && sass(8.0.0 && 1.61.0)** css预编译

# 图标说明
> 图标引用阿里iconfont
[iconfont](https://www.iconfont.cn/manage/index?manage_type=myprojects&projectId=4009903)

# 启动项目
  #### 下载依赖
  ```sh
  npm install
  ```

  #### 项目启动

  ```sh
  npm run dev
  ```

  #### 项目打包

  ```sh
  npm run build
  ```
# 新建页面
  #### 新增vue文件
  在**src/view**文件夹下新增 **demo/index.vue**，添加以下内容
  ```html
  // 模板
  <script setup>
    import { useRoute, useRouter } from 'vue-router'
    import { ref, onMounted } from 'vue'
    import aHeader from '@/components/header/index.vue'
    const router = useRouter()
    const { query, meta: { title, show } } = useRoute()
    const loading = ref(false) // 页面加载状态

    // 页面挂载
    onMounted(() => {
      getNoticeList()
    })
    /**
    * 接口相关
    */
    // 获取列表
    const getNoticeList = async () => {
      state.loading = true
      const res = await $api.demo.getNoticeInfo({ page: 1, pageSize: 10 }).catch(() => {})
      state.loading = false
      if (!res) return
    }
    /**
    * 操作相关
    */
    // 点击查看信息
    const handleSomething = (item) => {
      // todo semothing
    }
  </script>
  <template>
    <div class="page">
      <!-- 头部 -->
      <aHeader :title="show ? title : ''" backFlag="custom" @handleLeft="router.push({ path: '/home', query })" />

      <!-- 内容主体 -->
      <div class="page-content"></div>
    </div>
  </template>

  <style scoped lang="scss">
    .page {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      .page-content {
        flex: 1;
        padding: $content-padding-top $content-padding-right $content-padding-bottom
          $content-padding-left;
        overflow-y: auto;
      }
    }
  </style>

  ```
  #### 新建路由
  在**src/router/index.js**文件新增配置
  ```javascript
  {
    path: '/demo', // 路由路径
    name: 'demo',
    meta: {
      title: '新增页面', // header 标题
      show: true, // 是否显示header标题
    },
    component: () => import('@/views/demo/index.vue') // 使用路由懒加载的方式
  },
  ```
  #### 访问页面
  + history路由访问方式
  `当前启动服务的(ip/域名):端口号/路由路径`
  + hash路由访问方式
  `当前启动服务的(ip/域名):端口号/#/路由路径`

# 关于store
[pinia中文网官网](https://pinia.vuejs.org/zh/core-concepts/plugins.html)

# 接口管理
  src/api文件夹下放所有接口模块
  > 说明：为了增加代码可**阅读性和代码复用性**，通过插件的方式将api模块整体都挂载到vue实例上，接口内容可以按照**模块**划分，也可以按照**业务能力**划分（本文接口按照业务能力划分），如下文

  ```javascript
  import api from './api/index' // 引入模块
  const app = createApp(App)

  app.config.globalProperties.$api = api // 将模块挂载到全局
  ```
  #### 新增接口
  1. 在**src/api**文件夹下新增 **device/index.vue**，添加新的接口方法
  ```javascript
  import request from '@/request/request' // 引入封装好的ajax请求实例

  // 获取设备列表
  export const getDeviceList = async () => {
    return request.get('/rest/datastorage/v1/events')
  }

  export default {}
  ```
  2. 注册新增接口模块
  在**src/api/index.js**新增代码
   ```javascript
  import * as device from './device/index' // 引入设备相关接口模块

  export default {
    device,
  }
  ```
  #### 访问接口
  > 挂载到全局， 通过 `vue.getCurrentInstance()` 获取到**proxy**（应用实例）代理对象， 通过`proxy.$api[模块名][方法名]`调用，例如：
  ```html
  <script setup>
    import { ref, onMounted, getCurrentInstance } from 'vue'
    const { proxy: { $api } } = getCurrentInstance() // 获取应用实例
    const loading = ref(false) // 页面加载状态

    // 页面挂载
    onMounted(() => {
      getDeviceList()
    })
    /**
     * 接口相关
    */
    // 获取设备列表
    const getDeviceList = async () => {
      state.loading = true
      const res = await $api.device.getDeviceList({ page: 1, pageSize: 10 }).catch(() => {})
      state.loading = false
      if (!res) return
    }
    
  </script>
  ```