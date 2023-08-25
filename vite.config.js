
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vue from '@vitejs/plugin-vue'
// import eslintPlugin from 'vite-plugin-eslint'

// https://vitejs.dev/config/
export default () => defineConfig({
 plugins: [ //配置需要使用的插件列表
  vue(),
  vueJsx(),
  // eslintPlugin({
  //   include: ['src/**/*.js', 'src/**/*.vue', 'src/*.js', 'src/*.vue']
  // })
 ],

 //静态资源服务的文件夹
 publicDir: "public",
 base: './',
 //静态资源处理
 assetsInclude: "",
 //控制台输出的级别 info 、warn、error、silent
 logLevel: "info",
 // 设为false 可以避免 vite 清屏而错过在终端中打印某些关键信息
 clearScreen: true,
 resolve: {
  alias: {
    '@': fileURLToPath(new URL('./src', import.meta.url))
  },
 },

 // 公共样式
 css: {
  // 🔥此处添加全局scss🔥
  preprocessorOptions: {
    scss: {
      additionalData: '@import "./src/assets/css/common.scss";'
    }
  }
},

 //本地运行配置，以及反向代理配置
 server: {
  host: "localhost",
  https: false,//是否启用 http 2
  cors: true,//为开发服务器配置 CORS , 默认启用并允许任何源
  open: true,//服务启动时自动在浏览器中打开应用
  port: "9000",
  strictPort: false, //设为true时端口被占用则直接退出，不会尝试下一个可用端口
  force: true,//是否强制依赖预构建
  hmr: false,//禁用或配置 HMR 连接
  // 传递给 chockidar 的文件系统监视器选项
  watch: {
   ignored:["!**/node_modules/your-package-name/**"]
  },
  // 反向代理配置
  proxy: { 
   '/light-app': {
    // target: "http://192.168.3.9:7005/",
    target: "http://192.168.3.3:7005/light-app",
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/light-app/, '')
   }
  }
 },
 //打包配置
 build: {
  //浏览器兼容性  "esnext"|"modules"
  target: "modules",
  //指定输出路径
  outDir: "./dist",
  //生成静态资源的存放路径
  assetsDir: "assets",
  //小于此阈值的导入或引用资源将内联为 base64 编码，以避免额外的 http 请求。设置为 0 可以完全禁用此项
  assetsInlineLimit: 12288,
  //启用/禁用 CSS 代码拆分
  cssCodeSplit: true,
  //构建后是否生成 source map 文件
  sourcemap: process.env.NODE_ENV === 'development',

  // boolean | 'terser' | 'esbuild'
  minify: "terser", //terser 构建后文件体积更小
  //启用/禁用 brotli 压缩大小报告
  brotliSize: true,
  //chunk 大小警告的限制
  chunkSizeWarningLimit: 500
 },
})
