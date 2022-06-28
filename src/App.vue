<template>
  <div id="app">
    <app-toast ref="toaster" />
    <base-layout>
      <router-view />
    </base-layout>
  </div>
</template>

<script>
import BaseLayout from "@/layout/BaseLayout";
import AppToast from "@/components/AppToast";
export default {
  name: "App",
  components: { BaseLayout, AppToast },

};
</script>

<style scoped></style>
