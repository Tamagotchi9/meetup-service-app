import axios from "axios";

export const ImageAPI = {
  fetchImage(imageId) {
    return `${process.env.VUE_APP_API_PROXY_TARGET}/images/${imageId}`;
  },
  async uploadImage(file) {
    return await axios.post(
      `${process.env.VUE_APP_API_PROXY_TARGET}/images/upload`,
      file
    );
  }
};
