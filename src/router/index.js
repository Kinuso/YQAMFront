import { createRouter, createWebHistory } from "vue-router";
import UserApi from "../service/UserApi";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/HomeView.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/security/LoginView.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/security/RegisterView.vue"),
  },
  {
    path: "/most-recent",
    name: "most-recent",
    component: () => import("../views/recipe/MostRecentView.vue"),
  },
  {
    path: "/recipe/:title",
    name: "show-recipe",
    component: () => import("../views/recipe/RecipeView.vue"),
  },
  {
    path: "/search",
    name: "recipe-search",
    component: () => import("../views/recipe/SearchPageView.vue"),
  },
  {
    path: "/recipe/add",
    name: "recipe-add",
    component: () => import("../views/recipe/RecipeAddView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/recipe/edit",
    name: "recipe-edit",
    component: () => import("../views/recipe/RecipeEditView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/profile",
    name: "profile",
    component: () => import("../views/user/ProfileView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/politique-confidentialite",
    name: "privacy-policy",
    component: () => import("../views/privacy/PrivacyPolicyView.vue"),
  },
  {
    path: "/condition-utilisation",
    name: "term-usage",
    component: () => import("../views/privacy/termUsageView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!UserApi.getUser()) {
      next({
        path: "/login",
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
