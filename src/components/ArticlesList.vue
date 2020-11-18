<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
        <v-container fluid>
          <v-layout row>
            <v-flex xs7 md8>
              <v-text-field label="Поиск" v-model="searchTerm" color="red">
              </v-text-field>
            </v-flex>
            <v-flex ms5 md4>
              <v-select
                label="Уровень"
                :items="levels"
                v-model="level"
                color="yellow"
                multiple
              >
              </v-select>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
      <v-flex
        v-for="article in filteredArticles"
        :key="article.id"
        xs12
        sm10
        md8
        offset-sm1
        offset-md2
      >
        <articles-list-item :article="article"></articles-list-item>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ArticlesListItem from "./ArticlesListItem";
export default {
  data() {
    return {
      searchTerm: null,
      level: [],
      levels: ["A1", "A2", "B1", "B2", "C1", "C2"],
    };
  },
  computed: {
    articles() {
      return this.$store.getters.getArticles;
    },
    filteredArticles() {
      let articles = this.articles;
      if (this.searchTerm) {
        articles = articles.filter(
          (a) =>
            a.title.toLowerCase().indexOf(this.searchTerm.toLowerCase()) >= 0 ||
            a.description
              .toLowerCase()
              .indexOf(this.searchTerm.toLowerCase()) >= 0
        );
      }
      if (this.level.length) {
        articles = articles.filter(
          (a) =>
            this.level.filter((val) => a.level.indexOf(val) !== -1).length > 0
        );
      }

      return articles;
    },
  },
  components: {
    ArticlesListItem,
  },
};
</script>

<style scoped>
</style>