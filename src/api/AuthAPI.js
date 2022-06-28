import axios from "axios";

export const AuthAPI = {
  async fetchUser() {
    try {
      const request = await axios.get(`${process.env.API_URL}/auth/user`);
      const response = await request.json();
      return response;
    } catch (err) {
      console.log(err.message);
    }
  },
  async login(email, password) {
    try {
      const request = await axios.post(`${process.env.API_URL}/auth/login`, {
        email,
        password,
      });
      const response = await request.json();
      return response;
    } catch (err) {
      console.log(err.message);
    }
  },
  async register(user) {
    try {
      const request = await axios.post(`${process.env.API_URL}/auth/register`, {
        user,
      });
      const response = await request.json();
      return response;
    } catch (err) {
      console.log(err.message);
    }
  },
  async logout() {
    try {
      const request = await axios.post(`${process.env.API_URL}/auth/logout`);
      const response = await request.json();
      return response;
    } catch (err) {
      console.log(err.message);
    }
  },
};
