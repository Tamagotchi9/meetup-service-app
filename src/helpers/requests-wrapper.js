import TopProgressBar from "../plugins/TopProgressBar/TheTopProgressBar";
import Vue from "vue";

const progress = new Vue(TopProgressBar);

export async function withProgress(promise) {
  progress.start();

  return promise
    .catch(err => {
      progress.fail();

      throw err;
    })
    .finally(() => {
      progress.finish();
    });
}
