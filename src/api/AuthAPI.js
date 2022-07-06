import axios from "axios";

export const AuthAPI = {
  async fetchUser() {
    try {
      const request = await axios.get(`${process.env.API_URL}/auth/user`);
      const response = await request;
      return response;
    } catch (err) {
      console.log(err.message);
    }
  },
  async login(email, password) {
    return await axios.post(
      `${process.env.VUE_APP_API_PROXY_TARGET}/auth/login`,
      {
        email,
        password
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  },
  async register(user) {
    return await axios.post(
      `${process.env.VUE_APP_API_PROXY_TARGET}/auth/register`,
      {
        user
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  },
  async logout() {
    try {
      const request = await axios.post(`${process.env.API_URL}/auth/logout`);
      const response = await request.json();
      return response;
    } catch (err) {
      console.log(err.message);
    }
  }
};
