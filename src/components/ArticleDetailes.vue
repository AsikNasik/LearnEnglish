<template>
  <v-card class="mx-auto" dark>
    <v-container fluid>
      <v-layout row class="hidden-sm-and-down">
        <v-flex xs4 md3>
          <v-img
            height="150"
            :src="article.imageUrl"
          >
          </v-img>
          <div class="mt-3 text-center">
            <v-btn text colot="white">
              <v-icon left> visibility </v-icon>
              YouTube
            </v-btn>
          </div>
        </v-flex>
        <v-flex xs8 md9>
          <v-card-title>
            <div class="headline">{{ article.title }}</div>
          </v-card-title>
          <v-card-text>
            <div>{{ article.description }}</div>
            <v-divider class="white"></v-divider>
            <div>
              Уровень: {{ getArticleLevel(article.level) }},
              {{ article.parts.length }} частей
            </div>
          </v-card-text>
          <v-card-actions>
            <!-- <v-rating
              v-model="article.rating"
              length="5"
              color="yellow"
              readonly
              dense
              half-increments
            >
            </v-rating>
            <div class="ml-2">
              <span>{{ article.rating }} </span>
              <span>({{ article.ratingCount }})</span>
            </div> -->
            <v-spacer></v-spacer>
            <v-btn
              v-if="canLoadArticle(article.id)"
              color="green"
              class="normal"
              text
              @click="loadArticle(article.id)"
            > Загрузить </v-btn>

            <div v-if="getUserDataArticle(article.id)">
               <v-icon color="white">work_outline</v-icon>
               Скачано {{ getArticlesAddedDate(article.id) | formattedDate}}
            </div>
  
          </v-card-actions>
        </v-flex>
      </v-layout>

      <div class="hidden-md-and-up">
        <v-layout row>
          <v-flex xs4 md3>
            <v-img
              height="100"
              :src="article.imageUrl"
            >
            </v-img>
          </v-flex>
          <v-flex xs8 md9>
            <v-card-title>
              <h3>{{ article.title }}</h3>
            </v-card-title>
            <div>
              <v-btn text colot="white">
                <v-icon left> visibility </v-icon>
                YouTube
              </v-btn>
            </div>
          </v-flex>
        </v-layout>

        <v-layout row>
          <v-flex xs12>
            <v-card-text>
              <div class="mb-2">{{ article.description }}</div>
              <div>
                Уровень: {{ getArticleLevel(article.level) }},
                {{ article.parts.length }} частей
              </div>
            </v-card-text>
          </v-flex>
        </v-layout>

        <v-layout row>
          <v-flex xs12>
            <v-card-actions>
              <!-- <v-rating
                v-model="article.rating"
                length="5"
                color="yellow"
                readonly
                dense
                half-increments
              >
              </v-rating>
              <div class="ml-2">
                <span>{{ article.rating }} </span>
                <span>({{ article.ratingCount }})</span>
              </div> -->
              <v-spacer></v-spacer>
              <v-btn
                v-if="canLoadArticle(article.id)"
                class="normal"
                color="green"
                text
                @click="loadArticle(article.id)"
              >
                Загрузить
              </v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </div>
    </v-container>
  </v-card>
</template>

<script>
import * as articleHelper from "../helpers/article"
import { mapGetters } from 'vuex'

export default {
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters(['isUserAuthenticated', 'userData', 'getProcessing']),
  },
  methods: {
    getArticleLevel: articleHelper.getArticleLevel,
    canLoadArticle (articleId) {
      let article = this.getUserDataArticle(articleId)
      return this.isUserAuthenticated && !this.getProcessing && !article
    },
    getUserDataArticle (articleId) {
      return this.userData.articles[articleId]
    },
    loadArticle (articleId) {
      this.$store.dispatch('ADD_USER_ARTICLE', articleId)
    },
    getArticlesAddedDate(articleId) {
      let article = this.getUserDataArticle(articleId)
      return article.addedDate
    }
  },
};
</script>