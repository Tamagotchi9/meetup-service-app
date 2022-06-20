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
      serverErrors: null,
    };
  },

  beforeRouteEnter(to, from, next) {
    fetchMeetup(to.params.meetupId).then((result) => {
      next((vm) => vm.setMeetup(result.error, result));
    });
  },
  beforeRouteUpdate(to, from, next) {
    this.meetup = null;
    fetchMeetup(to.params.meetupId).then((result) => {
      this.setMeetup(result.error, result);
      next();
    });
  },

  methods: {
    async getMeetup() {
      fetchMeetup(this.$route.params.meetupId).then((result) => {
        this.meetup = result;
      });
    },
    setMeetup(err, meetup) {
      if (err) {
        this.serverErrors = err.toString();
      } else {
        this.meetup = meetup;
      }
    },
  },
};
</script>

<style scoped></style>
