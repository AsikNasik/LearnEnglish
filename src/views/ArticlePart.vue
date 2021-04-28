<template>
    <v-container grid-list-md v-if="part">
        <v-layout row wrap>
            <v-flex xs12 sm10 offset-sm1 v-if="finishedDate">
              <v-card>
                <v-responsive>
                  <v-img
                    src="https://firebasestorage.googleapis.com/v0/b/english-6499f.appspot.com/o/done.jpg?alt=media&token=45442a48-0e44-4765-b0ed-6dcfc74879ca"
                    max-width="200px"
                  >
                  </v-img>
                </v-responsive>
                <v-card-title primary-title>
                  <div class="headline" >
                    Вы закончили эту часть {{ finishedDate | formattedDate }}!
                  </div>
                </v-card-title>
                <v-card-actions>
                    <span>Ваша оценка</span>
                    <v-rating
                      v-model="savedRating"
                      color="success"
                      readonly
                      large
                    >
                    </v-rating>
                  </v-card-actions>
              </v-card>
            </v-flex>
            <v-flex xs12 sm10 offset-sm1>
              <article-part-content
                :part="part"
              />
            </v-flex>
            <v-flex xs12 sm10 offset-sm1>
              <article-part-words
                :data="part.words"
              />
            </v-flex>
            <v-flex xs12 sm10 offset-sm1 class="text-center">
              <v-dialog
                v-model="finishDialog"
                persistent
                max-width="600px"
              >
                <template v-slot:activator="{ on }">
                  <v-btn
                    v-if="!finishedDate"
                    v-on="on"
                    color="success"
                    dark
                    @click="finishDialog = true"
                  >
                    <v-icon>check</v-icon>
                    Я закончил читать эту часть!
                  </v-btn>
                </template>

                <v-card>
                  <v-responsive>
                    <v-img
                      src="https://firebasestorage.googleapis.com/v0/b/english-6499f.appspot.com/o/done.jpg?alt=media&token=45442a48-0e44-4765-b0ed-6dcfc74879ca"
                      max-width="200px"
                    >
                    </v-img>
                  </v-responsive>

                  <v-card-title primary-title>
                    <div class="headline" >
                      Вы закончили эту часть!
                    </div>
                  </v-card-title>

                  <v-card-text>
                    <span>Ваша оценка</span>
                    <v-rating
                      v-model="rating"
                      color="success"
                      half-increments
                      large
                    >
                    </v-rating>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="primary"
                      dark
                      text
                      @click.native="finishDialog = false"  
                    >
                      <v-icon>close</v-icon>
                      Закрыть
                    </v-btn>
                    <v-btn
                      color="success"
                      dark
                      text
                      @click.native="finishWork"  
                    >
                      <v-icon>check</v-icon>
                        Закончить
                    </v-btn>
                  </v-card-actions>
                </v-card>

              </v-dialog>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import Vue from 'vue'
import ArticlePartContent from '@/components/ArticlePartContent';
import ArticlePartWords from '@/components/ArticlePartWords';

export default {
  props: {
    articleId: {
      type: String,
      required: true,
    },
    partId: {
      type: String,
      required: true,
    },
  },
  data () {
    return {
      part: null,
      finishDialog: false,
      rating: 0,
    }
  },
  computed: {
    finishedDate () {
      return this.$store.getters.userData.articles[this.articleId].parts[this.partId].finishedDate
    },
    savedRating () {
      return this.$store.getters.userData.articles[this.articleId].parts[this.partId].rating
    },
  },
  created () {
    Vue.$db.collection('articleParts')
      .where('articleId', '==', this.articleId)
      .where('articlePartId', '==', this.partId)
      .get()
      .then(querySnaphot => {
        querySnaphot.forEach(item => {
          this.part = item.data()
        })
      })
      .then(() => {
        this.$store.dispatch('UPDATE_USER_ARTICLE_PART_STATS',
          { articleId: this.articleId, partId: this.partId })
      })
      .catch(error => console.error(error))
  },
  methods: {
    finishWork () {
      this.$store.dispatch('FINISH_USER_ARTICLE_PART',
        { articleId: this.articleId, partId: this.partId, rating: this.rating })
      this.finishDialog = false
    }
  },
  components: {
    ArticlePartContent,
    ArticlePartWords,
  },
};
</script>
    ArticlePartWords