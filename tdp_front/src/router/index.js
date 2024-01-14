import { createRouter, createWebHashHistory } from 'vue-router'
import station from '../views/station.vue'
import transflow from '../views/transflow.vue'
import transflowSetting from '../views/transflowSetting.vue'
const routes = [
  {
    path: '/',
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
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
