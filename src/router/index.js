import Vue from "vue";
import VueRouter from "vue-router";
import PlayerView from "../views/PlayerView.vue";
import TeamView from "../views/TeamView.vue";
import Login from "../views/Login.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/player",
    name: "PlayerView",
    component: PlayerView,
  },
  {
    path: "/team",
    name: "TeamView",
    component: TeamView,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
