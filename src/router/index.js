import { createRouter, createWebHistory } from "vue-router";
import store from "../store";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../pages/HomeView.vue"),
    },
    {
      path: "/books/:id",
      name: "book_edit",
      component: () => import("../pages/BookView.vue"),
      beforeEnter: (to, from, next) => {
        const id = to.params.id;
        const bookById = store.getters.getBookById(parseInt(id));

        if (bookById) {
          next();
        } else {
          next({ name: "not-found" });
        }
      },
    },
    {
      path: "/book",
      name: "book_add",
      component: () => import("../pages/NewBookView.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: () => import("../pages/NotFound.vue"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  store.dispatch("populateFromCache");
  next();
});

export default router;
