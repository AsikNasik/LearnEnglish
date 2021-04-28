<template>
  <div>
    <v-card
      color="grey darken-3"
      class="white--text"
    >
      <v-card-title
        primary-title
        class="headline"
      >
        {{ part.title }}
      </v-card-title>

      <v-card-actions>
        <v-spacer></v-spacer>
        <div v-if="finishedDate" class="mr-2">
          <v-icon dark>check</v-icon>
          Прочитано {{ finishedDate | formattedDate }}
        </div>
        <v-btn
          v-if="isUserArticleLoaded"
          color="red"
          class="normal"
          text
          :to="{name: 'articlePart', params: {articleId: articleId , partId: part.id}}"
        >
          Открыть
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    part: {
      type: Object,
      required: true,
    },
    articleId: {
      required: true,
    },
  },
  computed: {
    ...mapGetters(['isUserAuthenticated', 'userData', 'getProcessing']),
    isUserArticleLoaded () {
      return this.isUserAuthenticated &&
        !this.getProcessing &&
        !!this.userData.articles[this.articleId]
    },
    finishedDate () {
      if (!this.isUserArticleLoaded) return false

      let article = this.userData.articles[this.articleId]
      if (article && article.parts[this.part.id]) {
        return article.parts[this.part.id].finishedDate
      }

      return false
    },
  },
};
</script>