<template>
  <div class="meetup-cover" :style="link ? { '--bg-url': `url(${link})` } : ''">
    <h1 class="meetup-cover__title">{{ title }}</h1>
  </div>
</template>

<script>
export default {
  name: "MeetupCover",
  // props
  props: {
    link: {
      type: String,
    },
    title: {
      type: String,
      default: "Название митапа",
    },
  },
};
</script>

<style scoped>
</style>
