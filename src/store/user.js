import firebase from 'firebase'

export default {
  state: {
    user: {
      isAuthenticated: false,
      userId: null,
    },
  },
  mutations: {
    SET_USER(state, payload) {
      state.user.isAuthenticated = true;
      state.user.uid = payload;
      },
      UNSET_USER(state) {
        state.user = {
          isAuthenticated: false,
          userId: null,
        }
      }
  },
  actions: {
    signUp({ commit }, payload) {
          commit("SET_PROCESSING", true);
          commit('CLEAN_ERROR')
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(() => {
          commit("SET_PROCESSING", false);
        })
        .catch(function(error) {
          commit("SET_PROCESSING", false);
          commit("SET_ERROR", error.message);
        });
    },
    
    signIn({ commit }, payload) {
        commit("SET_PROCESSING", true);
        commit("CLEAN_ERROR");
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(() => {
          commit("SET_PROCESSING", false);
        })
        .catch(function(error) {
          commit("SET_PROCESSING", false);
          commit("SET_ERROR", error.message)
        });
      },
    
    signOut() {
      firebase.auth().signOut()  
    },
    
    stateChange({ commit }, payload) {
      if(payload) {
        commit("SET_USER", payload.uid) 
      }
      else {
        commit("UNSET_USER")
      }
    }
  },
  getters: {
    isUserAuthenticated: (state) => state.user.isAuthenticated,
  },
};
