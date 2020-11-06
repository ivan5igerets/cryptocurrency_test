import Vue from 'vue'
import store from './store'
import App from './App.vue'
import VueNativeSock from 'vue-native-websocket'

Vue.config.productionTip = false

Vue.use(
  VueNativeSock,
  'wss://streamer.cryptocompare.com/v2?api_key=864180b9c0ef1b51a84f02e3d615d7038f0f4d13831d6b74c568e9dc60371046',
  { store: store}
)

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
