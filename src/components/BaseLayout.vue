<template>
  <div>
    <Header />
    <main class="main">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from "./TheHeader";
import Footer from "./TheFooter";
export default {
  name: "BaseLayout",
  components: {
    Header,
    Footer
  }
};
</script>

<style scoped>
main {
  flex: 1 0 auto;
}
</style>
