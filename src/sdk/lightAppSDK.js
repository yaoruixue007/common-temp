let messageId = 10000;
const messageListeners = [];


const methodArr = ['get', 'post', 'put', 'delete']
const request = {}

window.WebViewBridge = {
    onMessage: (data) => {
        messageListeners.forEach(item => item.onmessage(data));
    }
}
// test code
if (process.env.NODE_ENV === 'development') {
    window.ReactNativeWebView = {
        postMessage: (data) => {
            console.log('recive message', data);
            const {msgId} = JSON.parse(data);
            console.log('test response message');
            data = {
                msgId: msgId,
                code: 0,
                message: 'ok',
                data: {'launchCount': 5}
            };
            setTimeout(() => window.WebViewBridge.onMessage(JSON.stringify(data)), 10);
        }
    }
}

export const requestNative = (method, params = {}) => {
    return new Promise((resolve, reject) => {
        const tmpMsgId = (messageId++);

        //创建监听器
        const listener = {
            onmessage: (result) => {
                console.log('response onmessage',method, result);
                const {msgId, code, message, data} = result;//JSON.parse(result);
                if (msgId === tmpMsgId) {
                    console.log('response',method, data);
                    if (code === 0) {
                        resolve(data);
                    } else {
                        reject(new Error(message));
                    }
                    //移除监听器
                    const index = messageListeners.indexOf(listener);
                    if (index !== -1) {
                        messageListeners.splice(index, 1);
                    }
                }
            }
        };
        //添加监听器
        messageListeners.push(listener);

        const message = {
            msgId: tmpMsgId,
            method: method,
            params: params
        };
        console.log('request',method, message);
        window.ReactNativeWebView.postMessage(JSON.stringify(message));
    })
};

const searchParams = new URLSearchParams(window.location.hash.slice(window.location.hash.indexOf('?')));
const appId = searchParams.get('appId');
const token = searchParams.get('token');
const host = searchParams.get('host');
const userId = searchParams.get('userId');
const deviceId = searchParams.get('deviceID');

const lightApp = {
    version: '0.2.0',
    miniVersion: {
        OS: '1.70.01',
        Android: '1.70.01',
        iOS: '1.70.01',
        Web: '1.70.01'
    },
    //轻应用appId,
    appId: appId,
    //主机设备网络地址
    host: '',
    //轻应用appId,
    userId: userId,
    token: token,
    deviceId: deviceId,
    appStorage: null,
    appInfo: null,
    init: function () {
        const _this = this;
        if (window.location.protocol === 'file:' && host) {
            _this.host = host;
            _this.addEventListener('hostChange',res => _this.host = res);
        }
        _this.getAppInfo().then(res => _this.appInfo = res);
        console.log('lightAppSDK init appId=' + this.appId + ',token=' + this.token+',hostDevice=' + (window.location.protocol === 'file:' && host ? host : window.location.host) );

        methodArr.forEach(method => {
            request[method] = async (url, data) => {
              return new Promise((resolve, rejected) => {
                const commonData = {
                  uid: lightApp.userId,
                  deviceId: lightApp.deviceId,
                  appId: lightApp.appId,
                  app_id: lightApp.appId,
                  ...data
                }
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
                  if (res.code === 0 || res.code == 200) {
                    resolve(res)
                    return
                  }
                  rejected(res)
                }).catch((err) => {
                  console.log(err, '----errerr')
                  rejected(err)
                })
              })
            }
          })
    },
    //添加底座App事件监听器
    addEventListener: function (eventName, callback) {
        //创建监听器
        const listener = {
            onmessage: (result) => {
                const {event, data} = result;//JSON.parse(result);
                if (event === eventName) {
                    callback(data);
                }
            }
        };
        messageListeners.push(listener);
        return listener;
    },
    //移除底座App监听器
    removeEventListener: function (listener) {
        const index = messageListeners.indexOf(listener);
        if (index !== -1) {
            messageListeners.splice(index, 1);
        }
    },
    //主机设备http请求
    fetch: async function (path, requestInit) {
        const response = await fetch(this.host + path, {
            ...requestInit,
            body: requestInit.body ? JSON.stringify(requestInit.body) : null,
            headers: {
                ...requestInit.headers,
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': this.token,
            },
            mode: 'cors',
            credentials: "same-origin"
        });
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.indexOf('json') !== -1) {
            return response && response.json();
        } else {
            return response && response.text();
        }
    },
    //查询主机设备网络地址
    getDeviceHost: () => requestNative('getDeviceHost'),
    //查询底座App信息
    getAppInfo: () => requestNative('getAppInfo'),
    //退出轻应用
    exit: function () {
        if (this.appInfo) {
            return requestNative('exit');
        } else {
            window?.ReactNativeWebView?.postMessage(JSON.stringify({type: 'exitLightApp'}));
            return Promise.resolve(true);
        }
    },
    //刷新轻应用
    refresh: () => requestNative('refresh'),
    //hostApp key:value存储
    setAppStorageItem: async function (key, value) {
        if (!this.appStorage) {
            this.appStorage = await requestNative('getAppStorage');
            if (!this.appStorage) {
                this.appStorage = {};
            }
        }
        this.appStorage[key] = value;
        return await requestNative('setAppStorage', this.appStorage);
    },
    getAppStorageItem: async function (key) {
        if (!this.appStorage) {
            this.appStorage = await requestNative('getAppStorage');
            if (!this.appStorage) {
                this.appStorage = {};
            }
        }
        return this.appStorage[key];
    },
    // 导航到底座页面
    // params: {path:...}
    navigateToNativePage: (params) => requestNative('navigateToNativePage', params),
    //获取底座App网络状态
    getNetworkInfo: () => requestNative('getNetworkInfo'),
    //申请访问本地硬件资源权限（如camera）
    requestPermission: (params) => requestNative('requestPermission', params),
    //检查主机设备连接状态
    checkDeviceStatus: () => requestNative('checkDeviceStatus'),
    //下载文件 {type: 'image|video', url: url}
    downloadFile: function (params) {
        if (this.appInfo) {
            return requestNative('downloadFile', params);
        } else {
            window?.ReactNativeWebView?.postMessage(JSON.stringify(params));
            return Promise.resolve(true);
        }
    },
    //获取资源（图片，视频等）
    async getResource(params) {
        return request.get('/light-app/open-api/storage-manager/rest/datastorage/v1/app/resources', params)
    },
    //设置资源保存期限
    async setResourcePeroid(params) {
        return request.put('/light-app/open-api/storage-manager/rest/datastorage/v1/app/peroid', params, '设置')
    }
};

export default lightApp