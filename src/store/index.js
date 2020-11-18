import Vue from 'vue'
import Vuex from 'vuex'
import UserModule from '../store/user'
import GeneralModule from "../store/general"
import ArticlesModule from "../store/articles"

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    UserModule,
    GeneralModule,
    ArticlesModule,
  },
});
