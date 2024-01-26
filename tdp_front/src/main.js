import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus';  
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import './globalStyles.css'; 
//createApp(App).use(router).mount('#app').use(ElementPlus)
const Vue = createApp(App)
Vue.use(router)
Vue.use(ElementPlus)
Vue.mount('#app')
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    Vue.component(key, component)
  }