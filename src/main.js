// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import rate from 'vue-rate'
import 'vue-rate/dist/vue-rate.css'
Vue.config.productionTip = false
Vue.use(rate)
// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
