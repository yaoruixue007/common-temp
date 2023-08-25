// request.ts
import { showNotify } from 'vant';
import useCommonStore from '@/store/commonStore'
import lightApp from "../sdk/lightAppSDK";

const methodArr = ['get', 'post', 'put', 'delete']
const request = {}

methodArr.forEach(method => {
  request[method] = async (url, data, msg) => {
    return new Promise((resolve, rejected) => {
      const ommonStore = useCommonStore()
      if (msg) {
        ommonStore.setCommonLoading(true, msg, true)
      }
      // const searchPrams = location.hash.slice(location.hash.indexOf('?'))
      // const queryParams = Object.fromEntries(new URLSearchParams(searchPrams))
      // const requestOptions = {
      //   url,
      //   method,
      // }
      const commonData = {
        uid: lightApp.userId,
        deviceId: lightApp.deviceId,
        appId: lightApp.appId,
        ...data
      }
      // if (method === 'get' || method === 'delete') {
      //   requestOptions.params = {
      //     ...commonData,
      //     ...data
      //   }
      // } else {
      //   requestOptions.data = {
      //     ...commonData,
      //     ...data
      //   }
      // }
      let requestUrl = url;
      let bodyData;
      if (method === 'get' || method === 'delete') {
        const  searchParams = new URLSearchParams(commonData);
        requestUrl = requestUrl + '?' + searchParams.toString();
      }else{
         bodyData = commonData;
      }
      lightApp.fetch(requestUrl,{
        method: method.toUpperCase(),
        body: bodyData
      }).then(res =>{
        if (msg) {
          ommonStore.setCommonLoading(true, msg, false)
        }
        if (res.code === 0 || res.code == 200) {
          resolve(res)
          return
        }
        showNotify({ type: 'danger', message: res.message || res.msg });
        $closeToast()
        rejected()
      }).catch((err) => {
        console.log(err, '----errerr')
        switch (err.status) {
          case 302:
            showNotify({ type: 'danger', message: err.data.message || '接口重定向了！' })
            break
          case 400:
            showNotify({ type: 'danger', message: err.data.message || '服务器异常' })
            break
          // 401: 未登录
          // 未登录则跳转登录页面，并携带当前页面的路径
          // 在登录成功后返回当前页面，这一步需要在登录页操作。
          case 401: //重定向
            showNotify({ type: 'danger', message: err.data.message || '登录失效' })
            // 需要跳转登录
            break
          // 403 token过期
          // 清除token并跳转登录页
          case 403:
            showNotify({ type: 'danger', message: err.data.message || '登录过期' })
            // 需要跳转登录
            break
          case 404:
            showNotify({ type: 'danger', message: err.data.message || '请求未定义' })
            break
      
          case 500:
            showNotify({ type: 'danger', message: err.data.message || '服务器异常' })
            break
      
          default:
            showNotify({ type: 'danger', message: err.data.message || '服务端错误, 请稍后再试!!' })
        }
        ommonStore.setCommonLoading(false)
        rejected()
      })
    })
  }
})

export default request