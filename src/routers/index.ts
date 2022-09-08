import { createRouter, createWebHistory } from "vue-router";
import { AUTH } from "@/configs";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "index",
      component: () => import("@/pages/Index.vue"),
    },
  ],
});

export const ROUTE_WHITE_LIST = ["/"];

router.beforeEach((to, from, next) => {
  // 白名单
  for (const white of ROUTE_WHITE_LIST) {
    if (new RegExp(white).test(to.path)) {
      next();
      return;
    }
  }
  // 校验登录
  if (!AUTH.TOKEN) {
    // TODO 通常是跳转到登录页面
    alert("未登录");
    return;
  }
  next();
});

router.afterEach((to) => {
  for (let i = document.body.classList.length - 1; i >= 0; i--) {
    const clsNa = document.body.classList[i];
    if (/^route/.test(clsNa)) {
      document.body.classList.remove(clsNa);
    }
  }
  const name = to.name as string;
  document.body.classList.add(`route-${name}`);
});

export default router;
