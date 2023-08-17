import axios from "axios";

export const AuthAPI = {
  async fetchUser() {
    return await axios.get(`${process.env.VUE_APP_API_URL}/auth/user`);
  },
  async login(email, password) {
    return await axios.post(
      `${process.env.VUE_APP_API_URL}/auth/login`,
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
  async register(email, password, fullname) {
    return await axios.post(
      `${process.env.VUE_APP_API_URL}/auth/register`,
      {
        email,
        password,
        fullname
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  },
  async logout() {
    return await axios.post(`${process.env.VUE_APP_API_URL}/auth/logout`);
  }
};
