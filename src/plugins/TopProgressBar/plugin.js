import TopProgressBar from './index';
import TheTopProgressBar from './TheTopProgressBar';

export default {
  /**
   * @param {VueConstructor} Vue
   * @param {Object} options
   * @param {VueRouter} [options.router]
   */
  install(Vue, { router } = {}) {
    if (!TopProgressBar.instance) {
      const container = document.body.appendChild(
        document.createElement('div'),
      );
      TopProgressBar.instance = new Vue(TheTopProgressBar).$mount(container);
    }

    if (router) {
      router.beforeEach((to, from, next) => {
        TopProgressBar.start();
        next();
      });
      router.afterEach(() => {
        TopProgressBar.finish();
      });
      router.onError((err) => {
        TopProgressBar.fail();
        throw err;
      });
    }

    Vue.$progress = TopProgressBar;
    Vue.prototype.$progress = TopProgressBar;
  },
};
