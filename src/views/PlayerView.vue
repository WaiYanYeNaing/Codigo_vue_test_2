<template>
  <v-card class="pa-5">
    <div>
      <Player />
    </div>
  </v-card>
</template>
<script>
import Player from "../components/Player";
export default {
  name: "PlayerView",

  components: {
    Player,
  },
};
</script>