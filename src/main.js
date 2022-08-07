import Vue from "vue";
import App from "./App.vue";
import "./assets/styles/app.css";
import "./assets/styles/index.css";
import router from "./router";
import ToasterPlugin from "@/plugins/ToasterPlugin";
import TopProgressBarPlugin from "@/plugins/TopProgressBar/plugin";
import { AuthAPI } from "@/api/AuthAPI";
import { authService } from "@/services/AuthService";

Vue.use(TopProgressBarPlugin, { router });

Vue.use(ToasterPlugin);
Vue.config.productionTip = false;

const user = localStorage.getItem("loggedUser");

if (user) {
  AuthAPI.fetchUser()
    .then(user => {
      localStorage.setItem("loggedUser", JSON.stringify(user.data));
      authService.user = user.data;
    })
    .catch(() => {
      localStorage.clear();
      authService.user = null;
    });
}

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
