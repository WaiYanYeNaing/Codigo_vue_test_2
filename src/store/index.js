import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
});
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    teams: [],
    username: null,
  },
  getters: {
    getUserName: state => state.username,
    getTeams: state => state.teams,
  },
  mutations: {
    logging(state, username) {
      state.username = username;
    },
    addingTeam(state, newTeam) {
      state.teams.push(newTeam);
      state.teams = state.teams.map((item, index) => ({
        ...item,
        id: index + 1,
      }));
    },
    updatingTeam(state, newTeam) {
      const item = state.teams.find(item => item.id === newTeam.id);
      Object.assign(item, newTeam);
    },
    removingTeam: (state, id) =>
      (state.teams = state.teams.filter((team, index) => index != id)),
  },
  actions: {
    login: (commit, username) => commit("logging", username),
    addTeam: ({ commit }, newTeam) => commit("addingTeam", newTeam),
    updateTeam: ({ commit }, newTeam) => commit("updatingTeam", newTeam),
    removeTeam: ({ commit }, id) => commit("removingTeam", id),
  },
  plugins: [vuexLocal.plugin],
});
