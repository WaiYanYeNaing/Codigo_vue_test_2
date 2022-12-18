<template>
  <div>
    <v-data-table :headers="headers" :items="teams" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Team</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                Add Team
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>
              <v-form ref="form" v-model="valid">
                <v-card-text>
                  <v-container>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field
                        :rules="nameRules"
                        required
                        v-model="editedItem.name"
                        label="Team Name"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" md="12">
                      <v-select
                        v-model="editedItem.player"
                        :items="players"
                        :menu-props="{ maxHeight: '300' }"
                        label="Player"
                        multiple
                        :rules="[(v) => !!v || 'Player is required']"
                        persistent-hint
                        required
                      ></v-select>
                    </v-col>
                    <v-row class="ml-1 mr-1">
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          :rules="regionRules"
                          v-model="editedItem.region"
                          label="Region"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          required
                          :rules="countryRules"
                          v-model="editedItem.country"
                          label="Country"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">
                    Cancel
                  </v-btn>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="add"
                    :disabled="!valid"
                  >
                    Save
                  </v-btn>
                </v-card-actions>
              </v-form>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text"
                >Are you sure you want to delete this team?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn text color="primary"> No Data </v-btn>
      </template>
    </v-data-table>
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
  name: "Team",

  data() {
    return {
      dialog: false,
      dialogDelete: false,
      loadingdialog: false,
      headers: [
        {
          text: "Name",
          align: "start",
          value: "name",
          sortable: false,
        },
        { text: "Players", value: "player", sortable: false },
        { text: "Region", value: "region", sortable: false },
        { text: "Country", value: "country", sortable: false },
        { text: "Actions", value: "actions", sortable: false },
      ],
      editedIndex: -1,
      editedItem: {
        name: "",
        player: [],
        region: "",
        country: "",
      },
      defaultItem: {
        name: "",
        player: [],
        region: "",
        country: "",
      },
      players: [],
      valid: true,
      nameRules: [(v) => !!v || "Name is required"],
      regionRules: [(v) => !!v || "Region is required"],
      countryRules: [(v) => !!v || "Country is required"],
    };
  },
  mounted() {
    this.GetPlayers();
  },
  computed: {
    teams() {
      return this.$store.getters.getTeams;
    },
    formTitle() {
      return this.editedIndex === -1 ? "New Team" : "Edit Team";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  methods: {
    async GetPlayers() {
      let self = this;
      const res = await axios.get(`https://www.balldontlie.io/api/v1/players`);
      self.players = res.data.data.map((v) => v.first_name + v.last_name);
    },
    editItem(item) {
      this.editedIndex = this.teams.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.teams.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.$store.dispatch("removeTeam", this.editedIndex);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
      this.$refs.form.resetValidation();
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    validateAddTeamName() {
      let nameDuplicate = this.teams.filter(
        (item) => item.name == this.editedItem.name
      );
      if (nameDuplicate.length != 0) {
        return true;
      }
      return false;
    },
    validateEditTeamName() {
      let notSameList = this.teams.filter((el) => el.id != this.editedItem.id);

      let nameDuplicate = notSameList.filter(
        (item) => item.name == this.editedItem.name
      );
      if (nameDuplicate.length != 0) {
        return true;
      }
      return false;
    },
    edit() {
      let nameTest = this.validateEditTeamName();
      if (nameTest != true) {
        this.$store.dispatch("updateTeam", this.editedItem);
      } else {
        alert("Team name should be unique");
      }
    },
    duplicateCheckEditPlayer() {
      let notSameList = this.teams.filter((el) => el.id != this.editedItem.id);
      let temp = notSameList.map((item) => item.player);
      let arr1 = Array.prototype.concat(...temp);
      let arr2 = this.editedItem.player;
      let nameDuplicate = arr1.filter((i1) => arr2.includes(i1));
      if (nameDuplicate.length != 0) {
        alert("Player is already in another team!");
        return true;
      }
      return false;
    },

    duplicateCheckPlayer() {
      let temp = this.teams.map((item) => item.player);
      let arr1 = Array.prototype.concat(...temp);
      let arr2 = this.editedItem.player;
      let nameDuplicate = arr1.filter((i1) => arr2.includes(i1));
      if (nameDuplicate.length != 0) {
        alert("Player is already in another team!");
        return true;
      }
      return false;
    },
    add() {
      if (this.editedIndex > -1) {
        let playerCheck = this.duplicateCheckEditPlayer();
        if (playerCheck != true) {
          this.edit();
        }
      } else {
        let playerCheck = this.duplicateCheckPlayer();
        let nameTest = this.validateAddTeamName();
        if (playerCheck != true) {
          if (nameTest != true) {
            this.$store.dispatch("addTeam", this.editedItem);
          } else {
            alert("Team name should be unique");
          }
        }
      }
      this.close();
    },
  },
};
</script>