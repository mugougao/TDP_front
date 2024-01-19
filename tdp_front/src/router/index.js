import { createRouter, createWebHashHistory } from 'vue-router'
import station from '../views/station.vue'
import transflow from '../views/transflow.vue'
import transflowSetting from '../views/transflowSetting.vue'
import start from '../views/start.vue'
import transflowSetting_new from '../views/transflowSetting_new.vue'
const routes = [
  {
    path: '/transflow',
    name: 'transflow',
    component: transflow
  },
  {
    path: '/transflowSetting',
    name: 'transflowSetting',
    component: transflowSetting
  },
  {
    path: '/transflowSetting_new',
    name: 'transflowSetting_new',
    component: transflowSetting_new
  },
  {
    path: '/station',
    name: 'station',
    component: station
  },
  {
    path: '/',
    name: 'start',
    component: start
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
