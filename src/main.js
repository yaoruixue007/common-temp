import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VConsole from 'vconsole'
import vant, {Lazyload} from 'vant'
import 'vant/lib/index.css';
import '@/assets/css/font/iconfont.css'
import request from './request/request'
import lightApp from './sdk/lightAppSDK'
import api from './api/index'
import constant from './constant'
import imgs from './assets/js/img'
import installComponents from './components'
import pinia from './store'
// 调试工具
// if (import.meta.env.VITE_APP_ENV === 'dev') {
  new VConsole()
// }


import './assets/css/index.scss'

lightApp.init();

const app = createApp(App)

// 添加到全局中
app.config.globalProperties.$sdk = lightApp
app.config.globalProperties.$request = request
app.config.globalProperties.$api = api
app.config.globalProperties.$constant = constant
app.config.globalProperties.$imgs = imgs

app.use(router)
app.use(vant)
app.use(Lazyload);
app.use(installComponents);
app.use(pinia);

app.mount('#app')
