import Vue from 'vue'
import Router from 'vue-router'
import ZipForm from '@/components/ZipForm'
import Hello from '@/components/Hello'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/zipForm',
      name: 'ZipForm',
      component: ZipForm
    },
    {
      path: '/hello',
      name: 'Hello',
      component: Hello
    }
  ]
})
