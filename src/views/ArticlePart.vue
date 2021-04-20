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
    }
  },
  computed: {
    // part () {
    //   let value = this.$store.getters.getArticleParts
    //     .find(item => item.articlePartId === this.partId)
    //   return value
    // },
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
      .catch(error => console.error(error))
  },
  components: {
    ArticlePartContent,
    ArticlePartWords,
  },
};
</script>
    ArticlePartWords