import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    name: "layout",
    path: "/",
    component: () => import("../layouts/Default.vue"),
    children: [
      {
        name: "temperature",
        path: "/temperature",
        component: () => import("../views/Temperature.vue"),
        meta: {
          title: "Temperature",
        },
      },
      {
        name: "dashboard",
        path: "/",
        component: () => import("../views/Dashboard.vue"),
        meta: {
          title: "Dashboard",
        },
      },
    ],
  },
];

const history = createWebHistory();

const router = createRouter({ history, routes });
router.afterEach((to: any) => {
  const items = [import.meta.env.VITE_TITLE];
  /**
   * To Change Document header in HTML
   */
  to.meta.title != null && items.unshift(to.meta.title);
  document.title = items.join(" · ");
});

export default router;
