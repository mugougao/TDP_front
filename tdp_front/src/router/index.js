import { createRouter, createWebHashHistory } from 'vue-router'
import station from '../views/station.vue'
import transflow from '../views/transflow.vue'
import transflowSetting from '../views/transflowSetting.vue'
import start from '../views/start.vue'
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
