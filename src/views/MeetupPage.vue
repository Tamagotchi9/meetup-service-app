<template>
  <meetup-view :meetup="meetup" v-if="meetup" />
</template>

<script>
import MeetupView from "@/components/MeetupView";
import { MeetupsAPI } from "@/api/MeetupsAPI";
import { withProgress } from "@/helpers/requests-wrapper";

export default {
  name: "MeetupPage",
  components: {
    MeetupView
  },

  data() {
    return {
      meetup: null
    };
  },

  beforeRouteEnter(to, from, next) {
    withProgress(MeetupsAPI.fetchMeetup(to.params.meetupId)).then(result => {
      next(vm => vm.setMeetup(result.error, result.data));
    });
  },
  beforeRouteUpdate(to, from, next) {
    this.meetup = null;
    withProgress(MeetupsAPI.fetchMeetup(to.params.meetupId)).then(result => {
      this.setMeetup(result.error, result.data);
      next();
    });
  },

  methods: {
    setMeetup(err, meetup) {
      if (err) {
        this.$toaster.error(err.message);
      } else {
        this.meetup = meetup;
        this.$toaster.success("Meetup loaded");
      }
    }
  }
};
</script>

<style scoped></style>
