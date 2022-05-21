<template>
  <auth-layout title="Реєстрація">
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
import { login } from "@/api/auth";

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
      if (this.email === "") {
        return alert("Требуется ввести Email");
      } else if (this.password === "") {
        return alert("Требуется ввести пароль");
      }
      await login(this.email, this.password).then(obj => {
        if (obj.fullname) {
          return alert(obj.fullname);
        } else {
          return alert(obj.message);
        }
      });
    }
  }
};
</script>

<style scoped></style>
