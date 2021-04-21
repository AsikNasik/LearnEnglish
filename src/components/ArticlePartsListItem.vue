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
    isUserArticleLoaded() {
      return this.isUserAuthenticated &&
        !this.getProcessing &&
        !!this.userData.articles[this.articleId]
    },
  },
};
</script>