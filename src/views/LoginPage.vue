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
            v-model="dataForm.email"
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
            v-model="dataForm.password"
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
import { withProgress } from "@/helpers/requests-wrapper";
import { login } from "@/api/auth";

export default {
  name: "LoginPage",
  components: { AuthLayout },
  data() {
    return {
      dataForm: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    async signIn() {
      try {
        await withProgress(login(this.dataForm));
        this.$toaster.success("Користувач авторизований");
        this.$router.push({ name: "meetups" });
      } catch (err) {
        this.$toaster.error(err.message);
      }
    }
  }
};
</script>

<style scoped></style>
