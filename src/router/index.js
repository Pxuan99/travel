import router  from 'vue-router';
import Vue from "vue";


Vue.use(router);
export default new router({
    routes:[
    {
        path: "/login",
        name: "login",
        component: () =>import("../views/login")
      },
      {
        path: "/changepassword",
        name: "changepassword",
        component: () =>import("../views/changepassword")
      },
    {
        path: "/test",
        name: "test",
        component: () =>import("../views/test.vue")
      },
      {
        path: "/detailSearch",
        name: "detailSearch",
        component: () =>import("../views/detailSearch.vue")
      },
    {
        path: "/",
        name: "main",
        component: () =>import("../views/main")
    },
    {
      path: "/register",
      name: "register",
      component: () =>import("../views/register")
    },
    {
      path: "/recommend",
      name: "reconmmend",
      component: () =>import("../views/recommend")
    },
    {
      path: "/TravelRecommend",
      name: "TravelRecommend",
      component: () =>import("../views/TravelRecommend")
    },
    {
      path: "/detail",
      name: "detail",
      component: () =>import("../views/detail")
    },
    {
      path: "/Myticket",
      name: "Myticket",
      component: () =>import("../views/Myticket")
    },
    {
      path: "/search",
      name: "search",
      component: () =>import("../views/search")
    },
    {
      path: "/searchAll",
      name: "searchAll",
      component: () =>import("../views/searchAll")
    },
    {
      path: "/admin",
      name: "admin",
      component: () =>import("../admin/nav"),
      children: [
      {
        path: "/user",
        name: "user",
        component: () =>import("../admin/user")
      },
      {
        path: "/ticket",
        name: "ticket",
        component: () =>import("../admin/ticket")
      },
      {
        path: "/scenery",
        name: "scenery",
        component: () =>import("../admin/scenery")
      },
      {
        path: "/add",
        name: "添加景点",
        component: () =>import("../admin/Addscenery")
      },
    ]
    },
  ]
});
