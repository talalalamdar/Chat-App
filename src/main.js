import Vue from 'vue'
import App from './App.vue'
import io from 'socket.io-client'
import VueSocketIO from 'vue-socket.io'

const DOMAIN = process.env.NODE_ENV === 'development' ? 'http://localhost:3333' : window.location.origin.replace(/(http)(s)?\:\/\//, "ws$2://");

Vue.use(new VueSocketIO({
  connection: io(DOMAIN)
}));

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
