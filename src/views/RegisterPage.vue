<template>
  <auth-layout title="Реєстрація">
    <form class="form" @submit.prevent="signUp">
      <div class="form-group">
        <label class="form-label">Email</label>
        <div class="input-group">
          <input type="email" class="form-control" v-model="email" />
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Ім'я</label>
        <div class="input-group">
          <input type="text" class="form-control" v-model="fullName" />
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Пароль</label>
        <div class="input-group">
          <input type="password" class="form-control" v-model="password" />
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Повтор пароля</label>
        <div class="input-group">
          <input
            type="password"
            class="form-control"
            v-model="passwordConfirm"
          />
        </div>
      </div>
      <div class="form-group">
        <label class="checkbox"
          ><input type="checkbox" v-model="checked"/> Я згідний з умовами
          <span></span
        ></label>
      </div>
      <div class="form__buttons">
        <button type="submit" class="button button_primary">
          Зареєстуватись
        </button>
      </div>
      <div class="form__append">
        Маєте обліковий запис?
        <router-link :to="{ name: 'login' }" class="link">Увійдіть</router-link>
      </div>
    </form>
  </auth-layout>
</template>

<script>
import AuthLayout from "../layout/AuthLayout";
import { AuthAPI } from "@/api/AuthAPI";

export default {
  name: "RegisterPage",
  components: {
    AuthLayout
  },
  data() {
    return {
      email: "",
      fullName: "",
      password: "",
      passwordConfirm: "",
      checked: false
    };
  },
  methods: {
    async signUp() {
      try {
        this.$progress.start();
        const response = await AuthAPI.register({
          email: this.email,
          password: this.password,
          fullname: this.fullName
        });
        console.log(response);
        this.$progress.finish();
      } catch (err) {
        console.log(err);
        this.$progress.fail();
      }
    }
  }
};
</script>

<style scoped>
.form-group {
  position: relative;
  margin-bottom: 24px;
}

.form-group.form-group_inline {
  display: inline-block;
  margin-bottom: 0;
}

.form-group.form-group_inline + .form-group.form-group_inline {
  margin-left: 16px;
}

.form-label {
  font-weight: 400;
  font-size: 20px;
  line-height: 28px;
  color: var(--body-color);
  margin-bottom: 10px;
  display: block;
}

.form-control {
  padding: 12px 16px;
  height: 52px;
  border-radius: 8px;
  border: 2px solid var(--blue-light);
  font-family: "Nunito", sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
  color: var(--body-color);
  transition: 0.2s all;
  background-color: var(--white);
  outline: none;
  box-shadow: none;
}

.form-control::placeholder {
  font-weight: 400;
  color: var(--blue-2);
}

.form-control:focus {
  border-color: var(--blue);
}

textarea.form-control {
  width: 100%;
  min-height: 211px;
}

.form-control.form-control_rounded {
  border-radius: 26px;
}

.form-control.form-control_sm.form-control_rounded {
  border-radius: 22px;
}

.form-control.form-control_sm {
  padding: 8px 16px;
  height: 44px;
  border-radius: 4px;
}

.input-group {
  position: relative;
}

.input-group .form-control {
  width: 100%;
}

.input-group.input-group_icon .form-control {
  padding-left: 50px;
}

.input-group.input-group_icon .icon {
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
}

.input-group.input-group_icon.input-group_icon-left .icon {
  left: 16px;
}

.input-group.input-group_icon.input-group_icon-right .icon {
  right: 16px;
}
</style>
