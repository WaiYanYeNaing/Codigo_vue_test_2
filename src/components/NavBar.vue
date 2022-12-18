<template>
  <div>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title class="ml-2 mr-2"> State Management </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text router :to="player">Player</v-btn>
      <v-btn text router :to="team">Team</v-btn>
      <v-btn color="success" router :to="team" @click="onClick">Logout</v-btn>
      <!-- <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn text v-bind="attrs" v-on="on">
            {{ username }}
          </v-btn>
        </template>

        <v-list>
          <v-list-item @click="onClick">
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu> -->
    </v-app-bar>
  </div>
</template>
<script>
export default {
  name: 'NavBar',
  data: () => ({
    player: '/player',
    team: '/team',
  }),
  computed: {
    username() {
      return this.$store.getters.getUserName
    },
  },
  methods: {
    onClick() {
      this.$router.push('/')
    },
  },
}
</script>
