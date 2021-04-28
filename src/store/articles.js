import Vue from 'vue'

export default {
  state: {
    articles: [],
  },
  mutations: {
    SET_ARTICLES(state, payload) {
      state.articles = payload;
    },
  },
  actions: {
    LOAD_ARTICLES({ commit }) {
      Vue.$db.collection('articles')
        .get()
        .then(querySnapshot => {
          let articles = []
          querySnapshot.forEach(item => {
            const data = item.data()
            let article = {
              id: item.id,
              title: data.title,
              description: data.description,
              imageUrl: data.imageUrl,
              level: data.level.slice(),
              youtube_playlist_id: data.youtube_playlist_id,
            }

            let parts = []
            if (data.parts) {
              data.parts.forEach(part => {
                let newPart = {
                  id: part.id,
                  title: part.title,
                  youtube_id: part.youtube_id,
                }

                parts.push(newPart)
              })
            }

            article.parts = parts

            articles.push(article)
          })

          commit('SET_ARTICLES', articles)
        })
      .catch(error => console.error(error))
    },
  },
  getters: {
    getArticles: (state) => state.articles,
    // getArticleParts: (state) => state.articleParts,
  },
};
