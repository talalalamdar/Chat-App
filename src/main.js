import Vue from 'vue'
import App from './App.vue'
import io from 'socket.io-client'
import VueSocketIO from 'vue-socket.io'

Vue.use(new VueSocketIO({
  connection: io('http://localhost:3333')
}));

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
