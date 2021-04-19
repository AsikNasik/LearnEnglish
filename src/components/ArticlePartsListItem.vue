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
};
</script>