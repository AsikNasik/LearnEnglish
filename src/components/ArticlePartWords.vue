<template>
  <div>
    <v-container>
      <span class="display-1"> Слова </span>

      <v-data-iterator
        :items="words"
        hide-default-footer
        class="d-flex flex-wrap"
      >
        <v-flex slot="item" slot-scope="props" xs12 sm12 md6 lg6>
          <v-card>
            <v-card-title>
              <div class="headline">
                <v-tooltip bottom>
                  <v-avatar v-if="props.item.type == 1" color="teal" size="45">
                    <span class="white--text"> W </span>
                  </v-avatar>
                  <span>Word / Слово</span>
                </v-tooltip>

                <v-tooltip bottom>
                  <v-avatar
                    v-if="props.item.type == 2"
                    color="indigo"
                    size="45"
                  >
                    <span class="white--text"> PH </span>
                  </v-avatar>
                  <!-- need to do (add the helper when hover 'word/phrase') -->
                  <span>Phrase / Фраза</span>
                </v-tooltip>
                {{ props.item.origText }}
              </div>
            </v-card-title>

            <v-divider></v-divider>
            <v-card-text>
              <div class="headline">
                {{ props.item.transText }}
              </div>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                class="md-2"
                fab
                dark
                small
                color="green"
                @click="addWord(props.item)"
                :disabled="checking || processing"
              >
                <v-icon dark> mdi-plus </v-icon>
              </v-btn>

              <v-snackbar v-model="snackbar" bottom light color="error">
                <v-icon>warning</v-icon>
                {{ snackbarText }}
              </v-snackbar>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-data-iterator>
    </v-container>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      dafaule: null,
    },
  },
  computed: {
    words() {
      if (!this.data) return [];

      let words = [];

      for (let property in this.data) {
        // eslint-disable-next-line no-prototype-builtins
        if (this.data.hasOwnProperty(property)) {
          let word = this.data[property];
          word.key = property;
          words.push(word);
        }
      }

      return words;
    },
    processing() {
      return this.$store.getters.getProcessing;
    },
  },
  data() {
    return {
      rowsPerPageItems: [4, 8, 12],
      pagination: {
        rowsPerPage: 4,
      },
      snackbarText: null,
      snackbar: false,
      checking: false,
    };
  },
  methods: {
    addWord(entity) {
      this.checking = true

      let userWords = this.$store.getters.userData.words;
      let wordAdded = userWords[entity.key];

      if (wordAdded) {
        this.snackbar = true;
        this.snackbarText = "Вы уже добавили это слово для изучения";
      } else if (Object.keys(userWords).length > 100) {
        this.snackbar = true;
        this.snackbarText = "Вы уже добавили слишком много слов для изучения";
      } else {
        this.$store.dispatch("ADD_USER_WORD", entity);
      }

      this.checking = false
    },
  },
};
</script>
