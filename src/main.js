import Vue from "vue";
import App from "./App.vue";
import "./assets/styles/app.css";
import "./assets/styles/index.css";
import router from "./router";
import store from "./store";
import ToasterPlugin from "@/plugins/ToasterPlugin";
import TopProgressBarPlugin from "@/plugins/TopProgressBar/plugin";

Vue.use(TopProgressBarPlugin, { router });

Vue.use(ToasterPlugin);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
