<template>
  <meetup-view :meetup="meetup" v-if="meetup" />
</template>

<script>
import MeetupView from "@/components/MeetupView";
import { fetchMeetup } from "@/api/meetups";

export default {
  name: "MeetupPage",
  components: {
    MeetupView,
  },

  data() {
    return {
      meetup: null,
    };
  },

  mounted() {
    this.getMeetup();
  },

  methods: {
    async getMeetup() {
      fetchMeetup(this.$route.params.meetupId).then((result) => {
        this.meetup = result;
      });
    },
  },
};
</script>

<style scoped></style>
