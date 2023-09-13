<template>
  <meetup-view :meetup="meetup" v-if="meetup" />
</template>

<script>
import MeetupView from "@/components/MeetupView";
import { withProgress } from "@/helpers/requests-wrapper";
import { fetchMeetup } from "@/api/MeetupsAPI";

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
    withProgress(fetchMeetup(to.params.meetupId)).then(result => {
      // TODO: check if result is instance of Error
      next(vm => vm.setMeetup(null, result));
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
