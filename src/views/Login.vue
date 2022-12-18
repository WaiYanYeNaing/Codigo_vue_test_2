<template>
  <v-app>
    <v-container fluid style="background-color: #1565c0">
      <v-row align="center" justify="center" style="height: 100vh" dense>
        <v-col
          cols="12"
          class="
            lighten-2
            fill-height
            d-flex
            flex-column
            justify-center
            align-center
          "
        >
          <v-card>
            <v-card-title>
              <span class="text-h5">Login</span>
            </v-card-title>
            <v-form ref="form" v-model="valid">
              <v-card-text>
                <v-container>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field
                      :rules="nameRules"
                      required
                      v-model="username"
                      label="UserName"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field
                      :rules="pwdRules"
                      v-model="password"
                      label="Password"
                      required
                    ></v-text-field>
                  </v-col>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="clear">
                  Cancel
                </v-btn>
                <v-btn
                  router
                  :to="player"
                  color="blue darken-1"
                  text
                  @click="signin()"
                  :disabled="!valid"
                >
                  Login
                </v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: 'Login',
  data: () => ({
    username: '',
    password: '',
    player: '/player',
    valid: true,
    nameRules: [(v) => !!v || 'Name is required'],
    pwdRules: [(v) => !!v || 'Password is required'],
  }),

  methods: {
    signin() {
      this.$store.dispatch('login', this.username)
    },
    clear() {
      this.username = ''
      this.password = ''
      this.$refs.form.resetValidation()
    },
  },
}
</script>
