import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "CharactersList",
    // component: Characters
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/CharactersList.vue")
  },
  {
    path: "/character/:id/edit",
    name: "EditCharacter",
    component: () =>
      import("../views/EditCharacter.vue")
  },
  {
    path: "/sourcies",
    name: "Sourcies",
    component: () =>
      import("../views/Sourcies.vue")
  },
  {
    path: "/character/:id",
    name: "ShowCharacter",
    component: () =>
      import("../views/ShowCharacter.vue")
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
