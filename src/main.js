import Vue from "vue";
import App from "./App.vue";
import "./assets/styles/app.css";
import "./assets/styles/index.css";
import router from "./router";
import ToasterPlugin from "@/plugins/ToasterPlugin";
import TopProgressBarPlugin from "@/plugins/TopProgressBar/plugin";
import { authObserver } from "@/api/auth";

Vue.use(TopProgressBarPlugin, { router });

Vue.use(ToasterPlugin);
Vue.config.productionTip = false;

// TODO: think of other places to place it
authObserver();

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
