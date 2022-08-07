import progress from "../plugins/TopProgressBar/index";

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
