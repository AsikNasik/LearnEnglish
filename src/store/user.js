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
      state.user.isAuthenticated = true;
      state.user.uid = payload;
      },
      unsetUser(state) {
        state.user = {
          isAuthenticated: false,
          userId: null,
        }
      }
  },
  actions: {
    signUp({ commit }, payload) {
          commit("setProcessing", true);
          commit('cleanError')
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(() => {
          commit("setProcessing", false)
        })
        .catch(function(error) {
          commit("setProcessing", false)
          commit("setError", error.message)
        });
    },
    
    signIn({ commit }, payload) {
        commit("setProcessing", true)
        commit("cleanError");
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(() => {
          commit("setProcessing", false)
        })
        .catch(function(error) {
          commit("setProcessing", false)
          commit("setError", error.message)
        });
      },
    
    signOut() {
      firebase.auth().signOut()  
    },
    
    stateChange({ commit }, payload) {
      if(payload) {
        commit("setUser", payload.uid) 
      }
      else {
        commit("unsetUser")
      }
    }
  },
  getters: {
    isUserAuthenticated: (state) => state.user.isAuthenticated,
  },
};
