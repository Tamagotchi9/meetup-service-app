<template>
  <div class="meetups-list transition-list">
    <fade-transition-group>
      <meetup-list-item
        v-for="meetup in meetups"
        :meetup="meetup"
        :key="meetup.id"
      ></meetup-list-item>
    </fade-transition-group>
  </div>
</template>

<script>
import MeetupListItem from "./MeetupsListItem";
import FadeTransitionGroup from "@/components/FadeTransitionGroup";

export default {
  name: "MeetupsList",

  props: {
    meetups: {
      type: Array,
      required: true,
    },
  },

  components: {
    MeetupListItem,
    FadeTransitionGroup,
  },
};
</script>

<style scoped>
</style>
