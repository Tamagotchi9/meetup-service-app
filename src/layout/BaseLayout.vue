<template>
  <div class="wrapper bg-grey">
    <Header />
    <main class="main">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from "../components/TheHeader";
import Footer from "../components/TheFooter";
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
