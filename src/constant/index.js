let OPEN_URL = ''
if (import.meta.env.VITE_APP_ENV === 'dev') {
    OPEN_URL = 'http://192.168.3.9:7005/'
    // OPEN_URL = 'http://192.168.3.5:7005/'
} else {
    OPEN_URL = window.origin + '/'
}
const ENUM_TYPE = {
    101: '抓拍图片'
}


export default {
    OPEN_URL,
    ENUM_TYPE
}