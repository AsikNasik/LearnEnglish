<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 sm10 offset-sm1>
        <v-tabs
          v-model="tabMode"
          color="green"
          fixed-tabs
        >
          <v-tab
            :key="'data'"
            ripple
          >
            Мои данные
          </v-tab>

          <v-tab
            :key="'articles'"
            ripple
          >
            Мои статьи
          </v-tab>

          <v-tab
            :key="'words'"
            ripple
          >
            Мои слова
          </v-tab>
          <v-tab-item :key="'data'">
            <user-profile-data></user-profile-data>
          </v-tab-item>
          <v-tab-item :key="'articles'">
          </v-tab-item>
          <v-tab-item :key="'words'">
            <user-profile-words></user-profile-words>
          </v-tab-item>

        </v-tabs>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import UserProfileData from '../components/UserProfileData'
import UserProfileWords from '../components/UserProfileWords'

export default {
  data () {
    return {
      tabMode: 'data',
    }
  },
  components: {
    UserProfileData,
    UserProfileWords,
  },
}
</script>
