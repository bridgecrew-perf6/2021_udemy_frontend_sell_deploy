// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import axios from "axios";
import VueAxios from "vue-axios";
import VueRouter from "vue-router";

// 1. 導入組件
import Goods from "@/components/Goods/Goods";
import Ratings from "@/components/Ratings/Ratings";
import Seller from "@/components/Seller/Seller";

Vue.config.productionTip = false;

// 安裝  VueRouter 插件
Vue.use(VueRouter);

Vue.use(VueAxios, axios);

//2.定義路由
const routes = [
  { path: "/", redirect: "/goods" },
  { path: "/goods", component: Goods },
  { path: "/ratings", component: Ratings },
  { path: "/Seller", component: Seller }
];

// 3. 创建 router 实例
const router = new VueRouter({
  routes, // (缩写) 相当于 routes: routes
  // 選中後的類名
  linkActiveClass: "active" // 默认值: "router-link-active"
});

/* eslint-disable no-new */
new Vue({
  el: "#app",
  components: { App },
  template: "<App/>",
  // 4. 创建和挂载根实例。
  router
});
