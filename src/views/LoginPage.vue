<template>
  <auth-layout title="Логін">
    <form class="form" @submit.prevent="signIn">
      <div class="form-group">
        <label class="form-label">Email</label>
        <div class="input-group">
          <input
            type="email"
            placeholder="demo@email"
            class="form-control"
            v-model="email"
          />
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Пароль</label>
        <div class="input-group">
          <input
            type="password"
            placeholder="password"
            class="form-control"
            v-model="password"
          />
        </div>
      </div>
      <div class="form__buttons">
        <button type="submit" class="button button_primary button_block">
          Вхід
        </button>
      </div>
      <div class="form__append">
        Немає облікового запису?
        <router-link :to="{ name: 'register' }" class="link"
          >Зареєструйтесь</router-link
        >
      </div>
    </form>
  </auth-layout>
</template>

<script>
import AuthLayout from "../layout/AuthLayout";
import { AuthAPI } from "@/api/AuthAPI";
import { withProgress } from "@/helpers/requests-wrapper";
import { authService } from "@/services/AuthService";

export default {
  name: "LoginPage",
  components: { AuthLayout },
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    async signIn() {
      try {
        const response = await withProgress(
          AuthAPI.login(this.email, this.password)
        );
        localStorage.setItem("loggedUser", JSON.stringify(response.data));
        authService.user = response.data;
        this.$toaster.success("Користувач авторизований");
        this.$router.push({ name: "meetups" });
      } catch (err) {
        this.$toaster.error(err.response.data.message);
      }
    }
  }
};
</script>

<style scoped></style>
