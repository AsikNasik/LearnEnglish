<template>
  <div>
    <v-container>
      <span class="display-1">
        Слова
      </span>

      <v-data-iterator
        :items="words"
        hide-default-footer
        class="d-flex flex-wrap"
      >
        <v-flex
          slot="item"
          slot-scope="props"
          xs12 sm6 md4 lg3
        >
          <v-card>
            <v-card-title>
              <h4> {{ props.item.originText }} </h4>
            </v-card-title>

            <v-divider></v-divider>
            <v-card-text>
               {{ props.item.transText }}
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                class="md-2"
                fab
                dark
                small
                color="green"
            >
                <v-icon dark>
                mdi-plus
                </v-icon>
            </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-data-iterator>
    </v-container>
  </div>
</template>

<script>
export default {
  props: {
    words: {
      type: Array,
      required: true,
    },
  },
  data () {
    return {
      rowsPerPageItems: [4, 8, 12],
      pagination: {
        rowsPerPage: 4,
      }
    }
  },
};
</script>
