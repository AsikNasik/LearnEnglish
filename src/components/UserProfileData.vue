<template>
  <div>
    <v-card>
      <v-card-title primary-title>
        <div>
          <h3 class="headline mb-0">
            <v-icon>person</v-icon>
            {{ userName }}
          </h3>
          <h3 class="headline mb-0">
            <v-icon>email</v-icon>
            {{ userEmail }}
          </h3>
        </div>
      </v-card-title>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-dialog v-model="dialog" persistent max-width="550">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="orange" v-bind="attrs" v-on="on" text>
              Изменить мои данные
            </v-btn>
          </template>

          <v-card>
            <v-card-title class="headline"> Изменить мои данные? </v-card-title>

            <v-card-text>
              <v-alert
                color="orange"
                outlined
                text
                type="warning"
                :value="getError"
              >
                {{ getError }}
              </v-alert>
              <v-form v-model="valid">
                <v-text-field
                  prepend-icon="person"
                  name="login"
                  label="Email"
                  type="email"
                  v-model="email"
                  :rules="emailRules"
                  required
                ></v-text-field>

                <v-text-field
                  id="password"
                  prepend-icon="lock"
                  name="password"
                  label="Password"
                  type="password"
                  v-model="password"
                  :rules="passwordRules"
                  required
                ></v-text-field>

                <h3>Я хочу изменить</h3>
                <v-radio-group v-model="changeType">
                  <v-radio label="Имя" :value="'name'"></v-radio>
                  <v-text-field
                    v-if="changeType == 'name'"
                    prepend-icon="person"
                    name="newname"
                    label="Новое имя"
                    type="text"
                    v-model="newName"
                    :rules="nameRules"
                    required
                  ></v-text-field>

                  <v-radio label="Email" :value="'email'"></v-radio>
                  <v-text-field
                    v-if="changeType == 'email'"
                    prepend-icon="email"
                    name="newlogin"
                    label="Новый email"
                    type="email"
                    v-model="newEmail"
                    :rules="emailRules"
                    required
                  ></v-text-field>

                  <v-radio label="Пароль" :value="'password'"></v-radio>
                  <v-text-field
                    v-if="changeType == 'password'"
                    prepend-icon="lock"
                    name="newpassword"
                    label="Новый пароль"
                    type="password"
                    v-model="newPassword"
                    :rules="passwordRules"
                    required
                  ></v-text-field>
                </v-radio-group>
              </v-form>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" text @click="dialog = false">
                Отмена
              </v-btn>
              <v-btn
                color="green darken-1"
                text
                @click.prevent="changeUserData"
                :disabled="getProcessing || !valid"
              >
                Изменить
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      dialog: false,
      email: null,
      password: null,
      valid: false,
      newName: null,
      newEmail: null,
      newPassword: null,
      changeType: "name",
      nameRules: [(v) => !!v || "Пожалуйста введите Ваше имя"],
      emailRules: [
        (v) => !!v || "Пожалуйста введите email",
        (v) =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/.test(v) ||
          "Неправильный email",
      ],
      passwordRules: [
        (v) => !!v || "Пожалуйста введите пароль",
        (v) =>
          (v && v.length >= 6) ||
          "Пароль слишком короткий - минимум 6 символов",
      ],
    };
  },
  computed: {
    ...mapGetters(["userName", "userEmail", "getProcessing", "getError"]),
  },
  created () {
    this.$bus.$on('user-profile-data-change', () => {
      this.dialog = false
    })
  },
  beforeDestroy () {
    this.$bus.$off('user-profile-data-change')
  },
  methods: {
    changeUserData() {
      this.$store.dispatch("CHANGE_USER_PROFILE_DATA", {
        email: this.email,
        password: this.password,
        newName: this.newName,
        newEmail: this.newEmail,
        newPassword: this.newPassword,
        changeType: this.changeType,
      });
    },
  },
};
</script>
