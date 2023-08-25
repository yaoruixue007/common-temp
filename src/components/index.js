import { createApp } from 'vue'
import toastComponent from './toast/index.vue'

class Toast {
  constructor() {
    this.vm = null
    this.container = null
  }

  toast = (options) => {
    const duration = options.duration || 2000
    if (this.vm) {
      this.destroyCom()
    }
    // 创建容器
    this.container = document.createElement('div')
    this.container.id = 'toastContainer'
    // 创建虚拟nom
    this.vm = createApp(toastComponent, options)
    // this.vm = createVNode(toastComponent, options)
    console.log(this.vm)
    // 渲染虚拟dom
    this.vm.mount(this.container)
    // render(vm, container)
    // 挂载节点
    document.body.appendChild(this.container)
    if (!options.duration) return
   
    setTimeout(() => {
      this.destroyCom()
    }, duration);
  }
  closeToast = () => {
    this.destroyCom()
  }
  destroyCom = () => {
    this.vm?.unmount()
    this.vm = null
    const oldContainer = document.getElementById('toastContainer')
    if (!oldContainer) return
    document.body.removeChild(this.container)
  }
}

const toastIns = new Toast()

const installComponents = {
  install(app) {
    // 注册toast api组件
    app.config.globalProperties.$toast = toastIns.toast
    app.config.globalProperties.$closeToast = toastIns.closeToast
  }
}
export default installComponents