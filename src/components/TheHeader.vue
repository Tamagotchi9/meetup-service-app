<template>
  <header class="header">
    <div>
      <h1>
        <router-link
          :to="{ name: 'meetups' }"
          class="router-link-exact-active router-link-active"
          ><img src="../assets/logo.svg" alt="Meetups"
        /></router-link>
      </h1>
    </div>
    <nav>
      <router-link v-if="showReturnToMeetups" :to="{ name: 'meetups' }">
        &larr; Повернутися до списку
      </router-link>
      <router-link
        v-if="user"
        :to="{ name: 'meetups', query: { participation: 'attending' } }"
        >Мої конференції</router-link
      >
      <router-link
        v-if="user"
        :to="{ name: 'meetups', query: { participation: 'organizing' } }"
        >Організовані конференції</router-link
      >
      <router-link v-if="user === null" :to="{ name: 'login' }"
        >Вхід</router-link
      >
      <router-link v-if="user === null" :to="{ name: 'register' }"
        >Реєстрація</router-link
      >
      <router-link :to="{ name: 'create' }">Створити конференцію</router-link>
      <a v-if="user !== null" @click="signOut"
        >{{ user.displayName }} (Вихід)</a
      >
    </nav>
  </header>
</template>

<script>
import { withProgress } from "@/helpers/requests-wrapper";
import { authService } from "@/services/AuthService";
import { logout } from "@/plugins/firebase";

export default {
  name: "TheHeader",

  computed: {
    showReturnToMeetups() {
      return this.$route.matched.some(route => route.meta.showReturnToMeetups);
    },
    user() {
      return authService.user;
    }
  },

  methods: {
    async signOut() {
      try {
        await withProgress(logout());
        this.$router.push({ name: "login" });
        // localStorage.clear();
        // window.location.reload();
      } catch (err) {
        this.$toaster.error(err.message);
      }
    }
  }
};
</script>

<style scoped>
.header {
  padding: 44px 0 32px;
  background-color: var(--white);
}

.header h1,
.header h1 a {
  font-weight: 900;
  font-size: 34px;
  line-height: 30px;
  text-align: center;
  margin: 0 0 24px;
  text-transform: uppercase;
  color: var(--body-color);
  text-decoration: none;
}

.header nav {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 24px;
}

.header nav a {
  font-size: 20px;
  line-height: 28px;
  color: var(--body-color);
  text-decoration: none;
  padding: 0 20px;
  position: relative;
  display: inline-flex;
}

.header nav a + a {
  margin-top: 8px;
}

.header nav a:hover {
  color: var(--blue);
}

.header nav a:before {
  content: "";
  position: absolute;
  left: 0;
  top: 50%;
  transform: translate(-2px, -50%);
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: var(--grey);
}

@media all and (min-width: 992px) {
  .header nav {
    flex-direction: row;
    align-items: center;
    margin-left: 0;
  }

  .header nav a,
  .header nav a + a {
    margin-top: 0;
  }

  .header nav a:first-child:before {
    display: none;
  }
}
</style>
