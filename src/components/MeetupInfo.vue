<template>
  <ul class="info-list">
    <li>
      <img
        class="icon info-list__icon"
        alt="icon"
        src="@/assets/icons/icon-user.svg"
      />
      {{ organizer }}
    </li>
    <li>
      <img
        class="icon info-list__icon"
        alt="icon"
        src="@/assets/icons/icon-map.svg"
      />
      {{ place }}
    </li>
    <li>
      <img
        class="icon info-list__icon"
        alt="icon"
        src="@/assets/icons/icon-cal-lg.svg"
      />
      <time datetime="2020-01-01">{{ localDate }}</time>
    </li>
  </ul>
</template>

<script>
export default {
  name: "MeetupInfo",
  props: {
    organizer: {
      type: String,
      required: true,
    },
    place: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  computed: {
    localDate() {
      return new Date(this.date).toLocaleString(navigator.language, {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },
  },
};
</script>

<style scoped>
</style>
