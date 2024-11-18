import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/checkout",
      name: "CheckoutPageView",

      component: () => import("../views/CheckoutPageView.vue"),
    },
  ],
});

export default router;
