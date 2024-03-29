import Vue from "vue";
import firebase from "firebase";
import { EventBus } from '../eventBus/eventBus'

const defaultUserData = {
  articles: {},
  words: {},
};

export default {
  state: {
    userData: defaultUserData,
  },
  mutations: {
    SET_USER_DATA(state, payload) {
      state.userData = payload;
    },
    ADD_USER_ARTICLE(state, payload) {
      Vue.set(state.userData.articles, payload.articleId, payload.article);
    },
    ADD_USER_WORD(state, payload) {
      Vue.set(state.userData.words, payload.wordId, payload.word);
    },
    ADD_USER_ARTICLE_PART(state, payload) {
      Vue.set(
        state.userData.articles[payload.articleId].parts,
        payload.partId,
        { addedDate: payload.timestamp }
      );
    },
    UPDATE_USER_ARTICLE_PART_LAST_OPENED_DATE(state, payload) {
      Vue.set(
        state.userData.articles[payload.articleId].parts[payload.partId],
        "lastOpenedDate",
        payload.timestamp
      );
    },
    UPDATE_USER_ARTICLE_PART_FINISH_INFO(state, payload) {
      Vue.set(
        state.userData.articles[payload.articleId].parts[payload.partId],
        "finishedDate",
        payload.timestamp
      );
      Vue.set(
        state.userData.articles[payload.articleId].parts[payload.partId],
        "rating",
        payload.rating
      );
    },
    REMOVE_USER_WORD(state, payload) {
      Vue.delete(state.userData.words, payload);
      EventBus.notify("userword:updated", payload);
    },
    UPDATE_USER_WORD(state, payload) {
      Vue.set(state.userData.words[payload.wordId], 'bucket', payload.word.bucket)
      Vue.set(state.userData.words[payload.wordId], 'nextShowDate', payload.word.nextShowDate)
      EventBus.notify("userword:updated", payload.wordId);
    },
  },
  actions: {
    LOAD_USER_DATA({ commit }, payload) {
      commit("SET_PROCESSING", true);
      let userDataRef = Vue.$db.collection("userData").doc(payload);
      userDataRef
        .get()
        .then((data) => {
          let userData = data.exists ? data.data() : defaultUserData;

          if (!userData.articles) {
            userData.articles = {};
          }
          if (!userData.words) {
            userData.words = {};
          }

          commit("SET_USER_DATA", userData);
          commit("SET_PROCESSING", false);
        })
        .catch(() => {
          commit("SET_PROCESSING", false);
        });
    },
    ADD_USER_ARTICLE({ commit, getters }, payload) {
      commit("SET_PROCESSING", true);
      let userDataRef = Vue.$db.collection("userData").doc(getters.userId);
      let article = {
        addedDate: new Date(),
        parts: {},
      };

      userDataRef
        .set(
          {
            articles: {
              [payload]: article,
            },
          },
          { merge: true }
        )
        .then(() => {
          commit("ADD_USER_ARTICLE", { articleId: payload, article: article });
          commit("SET_PROCESSING", false);
        })
        .catch(() => {
          commit("SET_PROCESSING", false);
        });
    },
    UPDATE_USER_ARTICLE_PART_STATS({ commit, getters }, payload) {
      let userDataRef = Vue.$db.collection("userData").doc(getters.userId);
      let timestamp = new Date();

      if (!getters.userData.articles[payload.articleId].parts[payload.partId]) {
        userDataRef
          .update({
            [`articles.${payload.articleId}.parts.${payload.partId}.addedDate`]: timestamp,
          })
          .then(() => {
            commit("ADD_USER_ARTICLE_PART", {
              articleId: payload.articleId,
              partId: payload.partId,
              timestamp: timestamp,
            });
          });
      }

      userDataRef
        .update({
          [`articles.${payload.articleId}.parts.${payload.partId}.lastOpenedDate`]: timestamp,
        })
        .then(() => {
          commit("UPDATE_USER_ARTICLE_PART_LAST_OPENED_DATE", {
            articleId: payload.articleId,
            partId: payload.partId,
            timestamp: timestamp,
          });
        });
    },
    FINISH_USER_ARTICLE_PART({ commit, getters }, payload) {
      let userDataRef = Vue.$db.collection("userData").doc(getters.userId);
      let timestamp = new Date();

      userDataRef
        .update({
          [`articles.${payload.articleId}.parts.${payload.partId}.finishedDate`]: timestamp,
          [`articles.${payload.articleId}.parts.${payload.partId}.rating`]: payload.rating,
        })
        .then(() => {
          commit("UPDATE_USER_ARTICLE_PART_FINISH_INFO", {
            articleId: payload.articleId,
            partId: payload.partId,
            timestamp: timestamp,
            rating: payload.rating,
          });
        });
    },
    ADD_USER_WORD({ commit, getters }, payload) {
      commit("SET_PROCESSING", true);
      let userDataRef = Vue.$db.collection("userData").doc(getters.userId);
      let word = {
        origText: payload.origText,
        transText: payload.transText,
        type: payload.type,
        addedDate: new Date(),
        bucket: 1,
        nextShowDate: new Date(),
      };

      userDataRef
        .set(
          {
            words: {
              [payload.key]: word,
            },
          },
          { merge: true }
        )
        .then(() => {
          commit("ADD_USER_WORD", { wordId: payload.key, word: word });
          commit("SET_PROCESSING", false);
        })
        .catch(() => {
          commit("SET_PROCESSING", false);
        });
    },

    PROCESS_USER_WORD({ commit, getters }, payload) {
      let word = getters.userData.words[payload];
      let userDataRef = Vue.$db.collection("userData").doc(getters.userId);

      if (word.bucket == 5) {
        userDataRef
          .update({
            [`words.${payload}`]: firebase.firestore.FieldValue.delete(),
          })
          .then(() => {
            commit("REMOVE_USER_WORD", payload);
          });
      } else {
        let nextShowDate = new Date();
        nextShowDate = new Date(
          nextShowDate.setDate(new Date().getDate() + word.bucket * 2)
        );
        word.nextShowDate = nextShowDate;
        word.bucket++;

        userDataRef
          .set(
            {
              words: {
                [payload]: word,
              },
            },
            { merge: true }
          )
          .then(() => {
            commit("UPDATE_USER_WORD", { word: word, wordId: payload });
          });
      }
    },
  },
  getters: {
    userData: (state) => state.userData,
  },
};
