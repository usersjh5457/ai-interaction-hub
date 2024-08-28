import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../components/Home.vue";
import ImageDerivation from "../components/ImageDerivation.vue";
import TextCommunication from "../components/TextCommunication.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/", component: Home },
  { path: "/text-communication", component: TextCommunication },
  { path: "/image-derivation", component: ImageDerivation },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
