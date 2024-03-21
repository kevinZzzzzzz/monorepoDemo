import { createApp } from 'vue'
import './style.less'
import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist'
import router from './router/index'
import api from '@/Api'
import App from './App.vue'
import HandleComputed from '@monorepo/compute'
import PluginAdd from '@monorepo/todo'
const Computed = new HandleComputed()
const Todo = new PluginAdd()

declare module 'vue' {
  export interface ComponentCustomProperties {
    $api: any,
    $plugin: any
  }
}
const store = createPinia().use(piniaPluginPersist)
const app = createApp(App)
app.config.globalProperties.$api = { ...api }
app.config.globalProperties.$plugin = {
  Computed,
  Todo
}
// 全局错误拦截
app.config.errorHandler = (err, vm, info) => {
  console.error()
}
app.use(store).use(router).mount('#app')
