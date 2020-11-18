<template>
  <v-container grid-list-md v-if="article">
    <v-layout row wrap>
        <v-flex xs12 sm10 offset-sm1>
            <article-detailes :article="article"></article-detailes>
        </v-flex>
        <v-flex v-for="part in article.parts" :key="part.id" xs12 sm10 offset-sm1>
            <article-parts-list-item :part="part" :articleId="article.id"></article-parts-list-item>
        </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ArticleDetailes from "../components/ArticleDetailes"
import ArticlePartsListItem from "../components/ArticlePartsListItem"
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  computed: {
    article() {
      return this.$store.getters.getArticles.find((item) => item.id == this.id);
    },
  },
  components: {
      ArticleDetailes,
      ArticlePartsListItem
  }
};
</script>