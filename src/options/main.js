import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import async from 'async'
import _ from 'lodash'
import Swal from 'sweetalert2'
import background from './services/background'

window.background = background
window.Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 1000,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})
window.Swal = Swal
window.async = async
window._ = _
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
