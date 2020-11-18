<template>
    <v-container grid-list-md v-if="part">
        <v-layout row wrap>
            <v-flex xs12 sm10 offset-sm1>
            </v-flex>
            <v-flex xs12 sm10 offset-sm1>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
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
    part() {
      let value = this.$store.getters.getParts.find(
        (item) =>
          item.articleId == this.articleId && item.articlePartId == this.partId
      )
      return value
    },
  },
};
</script>