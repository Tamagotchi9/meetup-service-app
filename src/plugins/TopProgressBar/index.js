export default {
  instance: null,

  start() {
    this.instance && this.instance.start();
  },

  finish() {
    this.instance && this.instance.finish();
  },

  fail() {
    this.instance && this.instance.fail();
  },
};
