import AppToast from "@/components/AppToast";

const Toaster = {
  install(Vue ) {
    const container = document.createElement("div");
    document.body.appendChild(container);

    Vue.prototype.$toaster = new Vue(AppToast).$mount(container);
  }
};

export default Toaster;
