import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from '@/plugins/vuetify';
import 'vuetify/dist/vuetify.min.css'
import VuetifyConfirm from 'vuetify-confirm'
import firebaseConfig from './configs/firebase'
import firebase from 'firebase'

Vue.config.productionTip = false

Vue.use(VuetifyConfirm, {
  buttonTrueText: 'Да',
  buttonFalseText: 'Нет',
  color: 'warning',
  icon: 'warning',
  title: 'Внимание',
  width: 400,
  property: '$confirm',
})

firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  created() {
    let vm = this
    firebase.auth().onAuthStateChanged(function(user) {
      vm.$store.dispatch('stateChange', user)
    });
  }
}).$mount('#app')
