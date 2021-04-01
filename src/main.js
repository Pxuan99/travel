import Vue from "vue";
import App from "./App.vue";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from "./router";
import axios from 'axios';
import qs from 'qs';
import VueResource from "vue-resource";


Vue.config.productionTip = false;

Vue.use(router);
Vue.use(ElementUI);
Vue.use(VueResource);
// axios.defaults.baseURL = 'http://127.0.0.1:8088/';
// axios.interceptors.request.use(config=>{
//       config.headers['Content-Type']="application/json";
//        config.data=JSON.stringify(config.data);  
//      return config;
//   })
Vue.prototype.$axios = axios;

Vue.prototype.$qs = qs;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
