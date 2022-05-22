<template>
  <p class="meetup-description">{{ description }}</p>
</template>

<script>
export default {
  name: "MeetupDescription",
  // props
  props: {
    description: {
      type: String,
      default: "Описание",
    },
  },
};
</script>

<style scoped>
</style>
