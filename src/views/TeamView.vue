<template>
  <v-card class="pa-5">
    <div>
      <Team />
    </div>
  </v-card>
</template>
<script>
import Team from "../components/Team";
export default {
  name: "TeamView",
  components: {
    Team,
  },
};
</script>