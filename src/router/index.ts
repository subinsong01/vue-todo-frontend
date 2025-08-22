// src/router/index.ts
import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "@/page/LoginPage.vue";
import TodoPage from "@/page/TodoPage.vue";
export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "login", component: LoginPage },
    { path: "/todo", name: "todo", component: TodoPage },
  ],
});
