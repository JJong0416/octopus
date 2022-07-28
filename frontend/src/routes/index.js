import Vue from "vue";
import VueRouter from "vue-router";
// import HomeView from "../views/HomeView.vue";
import store from "@/store/index.js";
// import MainView from "@/components/MainView.vue";
import MainView from "@/views/MainView.vue";
Vue.use(VueRouter);

// https://router.vuejs.org/kr/guide/advanced/navigation-guards.html
const onlyAuthUser = async (to, from, next) => {
  // console.log(store);
  const checkUserInfo = store.getters["memberStore/checkUserInfo"];
  const getUserInfo = store._actions["memberStore/getUserInfo"];
  let token = sessionStorage.getItem("access-token");
  if (checkUserInfo == null && token) {
    await getUserInfo(token);
  }
  if (checkUserInfo === null) {
    alert("로그인이 필요한 페이지입니다..");
    next({ name: "signIn" });
    // router.push({ name: "signIn" });
  } else {
    // console.log("로그인 했다.");
    next();
  }
};

const routes = [
  {
    path: "/",
    name: "MainView",
    component: MainView,
  },
  {
    path: "/mypage",
    name: "Mypage",
    onlyAuthUser,
    component: () => import("@/views/MypageView.vue"),
  },
  {
    path: "/search",
    name: "Search",
    component: () => import("@/views/SearchView.vue"),
  },
  {
    path: "/signup",
    name: "Signup",
    component: () => import("@/views/SignupView.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/LoginView.vue"),
  },
  {
    path: "/aboutus",
    name: "Aboutus",
    component: () => import("@/views/AboutusView.vue"),
  },
  {
    path: "/create",
    name: "Create",
    component: () => import("@/views/CreateView.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
