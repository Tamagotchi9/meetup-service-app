import axios from "axios";

export const ImageAPI = {
  async fetchImage(imageId) {
    try {
      const request = await axios.post(
        `${process.env.API_URL}/images/${imageId}`
      );
      return await request.json();
    } catch (err) {
      console.log(err.message);
    }
  },
  async uploadImage(file) {
    try {
      const request = await axios.post(`${process.env.API_URL}/images/upload`, {
        file
      });
      return await request.json();
    } catch (err) {
      console.log(err.message);
    }
  }
};
