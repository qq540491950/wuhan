import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('../views/Home'),
    children: [
      {
        path: '',
        redirect: 'yqmap'
      },
      {
        path: 'yqmap',
        name: 'yqmap',
        component: () => import('../views/yqmap/Yqmap')
      },
      {
        path: 'kjyq',
        name: 'kjyq',
        component: () => import('../views/kjyq/Kjyq')
      },
      {
        path: 'ssbb',
        name: 'ssbb',
        component: () => import('../views/ssbb/Ssbb')
      },
      {
        path: 'tccx',
        name: 'tccx',
        component: () => import('../views/tccx/Tccx')
      }
    ]
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
