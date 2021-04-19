<template>
    <v-container grid-list-md v-if="part">
        <v-layout row wrap>
            <v-flex xs12 sm10 offset-sm1>
              <article-part-content
                :part="part"
              />
            </v-flex>
            <v-flex xs12 sm10 offset-sm1>
              <article-part-words
                :words="part.words"
              />
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
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
  computed: {
    part () {
      let value = this.$store.getters.getArticleParts
        .find(item => item.articlePartId === this.partId)
      return value
    },
  },
  components: {
    ArticlePartContent,
    ArticlePartWords,
  },
};
</script>
    ArticlePartWords