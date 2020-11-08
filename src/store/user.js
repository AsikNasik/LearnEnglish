import firebase from 'firebase'

export default {
  state: {
    user: {
      isAuthenticated: false,
      userId: null,
    },
  },
  mutations: {
      setUser(state, payload) {
          state.user.isAuthenticated = true
          state.user.uid = payload
      }
  },
  actions: {
      signUp({ commit }, payload) {
        commit('setProcessing', true)
        firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
            .then(user => {
                commit("setUser", user.uid)
                commit("setProcessing", false);
            })
            .catch(function(error) {
                commit("setProcessing", false)
                commit("setError", error.message);
            // var errorCode = error.code;
            // var errorMessage = error.message;
          });
    }
  },
  getters: {
      isUserAuthenticated: (state) => state.user.isAuthenticated
  }
};
