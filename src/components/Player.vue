<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="Players"
      class="elevation-1"
      :items-per-page="1000"
      hide-default-footer
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Players</v-toolbar-title>
        </v-toolbar>
      </template>
    </v-data-table>
    <div class="d-flex justify-center my-5">
      <v-btn color="primary" @click="LoadMore()"> Load More </v-btn>
    </div>
    <v-dialog v-model="loadingdialog" persistent width="300">
      <v-card color="#fff" dark>
        <v-card-text class="black--text">
          Loading Please Wait...
          <v-progress-linear
            indeterminate
            color="primary"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
// import store from "@/store";
import axios from "axios";
export default {
  name: "Player",

  data() {
    return {
      per_page: 10,
      loadingdialog: false,
      Players: [],
      headers: [
        {
          text: "First Name",
          align: "start",
          value: "first_name",
        },
        { text: "Last Name", value: "last_name" },
        { text: "Height (ft)", value: "height_feet" },
        { text: "Weight (lb)", value: "weight_pounds" },
        { text: "Position", value: "position" },
      ],
    };
  },
  mounted() {
    let self = this;
    self.GetPlayers();
  },
  methods: {
    LoadMore() {
      let self = this;
      self.per_page += 10;
      self.GetPlayers();
    },
    async GetPlayers() {
      let self = this;
      self.loadingdialog = true;
      const res = await axios.get(
        `https://www.balldontlie.io/api/v1/players?per_page=${this.per_page}`
      );
      self.Players = res.data.data;
      self.loadingdialog = false;
    },
  },
};
</script>