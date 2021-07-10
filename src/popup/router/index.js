import Vue from 'vue'
import VueRouter from 'vue-router'

// import dashboard from '../pages/dashboard.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    // {
    //   path: '/',
    //   redirect: '/dashboard'
    // },
    // {
    //   path: '/dashboard',
    //   name: 'Dashboard',
    //   component: dashboard,
    //   redirect: '/dashboard/account_list',
    //   children: [
    //     {
    //       path: 'account_list',
    //       name: 'Nạp tài khoản Facebook',
    //       component: account_list
    //     },
    //   ]
    // },
    // {
    //   path: '*',
    //   name: 'Lỗi',
    //   component: error
    // },
  ]
})

// router.beforeEach((to, from, next) => {
//   if (!localStorage.getItem('access_token')) return next({ path: '/error' })

//   next()
// })

export default router
