import { RouteRecordRaw } from 'vue-router';
import { RouteName } from '@/constants/route-names'

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: RouteName.Home,
    component: () => import("../views/Home.vue"),
  },
  { 
    path: '/users/page=:page',
    name: RouteName.List,
    component: () => import('../views/Home.vue'),
    props: true,
  },
];

export default routes;