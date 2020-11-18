export default {
  state: {
    articles: [
      {
        id: "asdfg1234hjkl",
        title: "Harry Potter Part 1",
        description: "Первая глава книги Гарри Поттер.",
        image: "qwerty",
        level: ["B2", "C1"],
        rating: 4,
        ratingCount: 100,
        youTubePlaylistId: "123qwe123qwe",
        parts: [
          {
            id: "asdffdgs1",
            title: "Title 1",
            youtube_id: "qqqqqqwwwwww1",
          },
          {
            id: "asdffdgs2",
            title: "Title 2",
            youtube_id: "qqqqqqwwwwww2",
          },
          {
            id: "asdffdgs3",
            title: "Title 3",
            youtube_id: "qqqqqqwwwwww3",
          },
          {
            id: "asdffdgs4",
            title: "Title 4",
            youtube_id: "qqqqqqwwwwww4",
          },
        ],
      },
      {
        id: "asdwerfg1234hjkl",
        title: "Harry Potter Part 2",
        description: "Вторая глава книги Гарри Поттер.",
        image: "qwerty",
        level: ["B1", "B2"],
        rating: 3.5,
        ratingCount: 68,
        youTubePlaylistId: "123qw3e123qwe",
        parts: [
          {
            id: "asdffdgs11",
            title: "Title 11",
            youtube_id: "qqqqqqwwwwww11",
          },
          {
            id: "asdffdgs22",
            title: "Title 22",
            youtube_id: "qqqqqqwwwwww22",
          },
          {
            id: "asdffdgs33",
            title: "Title 33",
            youtube_id: "qqqqqqwwwwww33",
          },
          {
            id: "asdffdgs44",
            title: "Title 44",
            youtube_id: "qqqqqqwwwwww44",
          },
        ],
      },
      {
        id: "asdwererfg1234hjkl",
        title: "Harry Potter Part 3",
        description: "Третья глава книги Гарри Поттер.",
        image: "qwerty",
        level: ["A1"],
        rating: 3.7,
        ratingCount: 63,
        youTubePlaylistId: "123qw3e123qwe",
        parts: [
          {
            id: "asdffdgs1",
            title: "Title 1",
            youtube_id: "qqqqqqwwwwww1",
          },
          {
            id: "asdffdgs2",
            title: "Title 2",
            youtube_id: "qqqqqqwwwwww2",
          },
          {
            id: "asdffdgs3",
            title: "Title 3",
            youtube_id: "qqqqqqwwwwww3",
          },
          {
            id: "asdffdgs4",
            title: "Title 4",
            youtube_id: "qqqqqqwwwwww4",
          },
        ],
      },
    ],

    articleParts: [
      {
        articleID: "asdwererfg1234hjkl",
        articlePartId: "asdffdgs4",
        articleTitle: "Harry Potter Part 1",
        partTitle: "Title 4",
        youtube_id: "gdfsdas4",
        content: [
          {
            sentences: [
              {
                originText: "asdfghjkl",
                transText: "фывапролд",
              },
              {
                originText: "qwertyuiop",
                transText: "йцукенгшщз",
              },
              {
                originText: "zxcvbnm",
                transText: "ячсмить",
              },
            ],
          },
          {
            sentences: [
              {
                originText: "asdfghjkl12345",
                transText: "фывапролд12345",
              },
              {
                originText: "qwertyuiop54312",
                transText: "йцукенгшщз54321",
              },
              {
                originText: "zxcvbnm098765",
                transText: "ячсмить098765",
              },
            ],
          },
        ],
        words: [
          {
            originText: "Hello!",
            transText: "Привет!",
          },
          {
            originText: "How are you?",
            transText: "Как дела?",
          },
          {
            originText: "I am fine.",
            transText: "У меня все хорошо.",
          },
          {
            originText: "Hello!11",
            transText: "Привет!11",
          },
          {
            originText: "Hello!22",
            transText: "Привет!22",
          },
          {
            originText: "Hello!33",
            transText: "Привет!33",
          },
          {
            originText: "Hello!44",
            transText: "Привет!44",
          },
          {
            originText: "Hello!55",
            transText: "Привет!55",
          },
          {
            originText: "Hello!66",
            transText: "Привет!66",
          },
        ],
      },
    ],
  },
  mutations: {
    SET_ARTICLES(state, payload) {
      state.articles = payload;
    },
  },
  getters: {
    getArticles: (state) => state.articles,
    getArticleParts: (state) => state.articleParts,
  },
};
