import axios from "axios";

export const ImageAPI = {
  fetchImage(imageId) {
    return `${process.env.VUE_APP_API_URL}/images/${imageId}`;
  },
  async uploadImage(file) {
    return await axios.post(
      `${process.env.VUE_APP_API_URL}/images/upload`,
      file
    );
  }
};
