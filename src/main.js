import Vue from 'vue'
import App from './App.vue'

import ApiPlugin from './plugins/api'

Vue.config.productionTip = false
Vue.use(ApiPlugin)

new Vue({
  render: h => h(App)
}).$mount('#app')
