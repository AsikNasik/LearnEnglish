<template>
  <div>
    <v-navigation-drawer
      absolute
      temporary
      v-model="drawer"
      class="hidden-md-and-up"
    >
      <v-list shaped>
        <v-subheader>
          MENU
        </v-subheader>

        <v-list-item
          v-for="(item, i) in menuItems"
          :key="`navdrawer${i}}`"
        >
          <v-list-item-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>

        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-card tile dark>
      <v-toolbar>
        <v-app-bar-nav-icon
          @click.stop="drawer = !drawer"
          class="hidden-md-and-up"
        ></v-app-bar-nav-icon>
        <router-link
          to="/"
          tag="span"
          style="cursor:pointer"
        >
          <v-toolbar-title v-text="'Learn English'"></v-toolbar-title>
        </router-link>
        <v-spacer></v-spacer>

        <v-toolbar-items class="hidden-sm-and-down">
          <v-btn
            v-for="(item, i) in menuItems"
            :key="`menuItem${i}`"
            :to="item.route"
          >
            <v-icon left v-html="item.icon"></v-icon>
            {{ item.title }}
          </v-btn>
          <v-btn
            text
            @click.prevent="signOut"
            v-if="isUserAuthenticated"
          >
            <v-icon left>exit_to_app</v-icon>
            Выйти
          </v-btn>
        </v-toolbar-items>

      </v-toolbar>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
    };
  },
  computed: {
    isUserAuthenticated() {
      return this.$store.getters.isUserAuthenticated
    },
    menuItems() {
      return this.isUserAuthenticated ? 
      [
        {
          icon: "visibility",
          title: " Читать",
          route: "/articles",
        },
        {
          icon: "extension",
          title: "Учить слова",
          route: "/words",
        },
        {
          icon: "account_circle",
          title: "Мой кабинет",
          route: "/profile",
        }
      ] : 
      [
         {
          icon: "visibility",
          title: " Читать",
          route: "/articles",
        },
        {
          icon: "input",
          title: "Вход",
          route: "/signin",
        },
        {
          icon: "lock_open",
          title: "Регистрация",
          route: "/signup",
        }
      ]
    },
  },
  methods: {
    signOut() {
      this.$confirm('Вы действительно хотите окончить сеанс изучения английского?').then(res => {
        if(res){
            this.$store.dispatch('signOut')
        }
      })
    }
  }
}
</script>

<style scoped>
</style>