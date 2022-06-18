<template>
  <div>
    <!-- meetup cover -->
    <meetup-cover :link="UpgradedMeetup.cover" :title="UpgradedMeetup.title" />
    <div class="container">
      <div class="meetup">
        <div class="meetup__content">
          <h3>Опис</h3>
          <!-- meetup description -->
          <meetup-description :description="UpgradedMeetup.description" />
          <h3>Програма</h3>
          <!-- meetup agenda -->
          <meetup-agenda :agenda="UpgradedMeetup.agenda" />
        </div>
        <div class="meetup__aside">
          <!-- meetup info -->
          <meetup-info
            :organizer="UpgradedMeetup.organizer"
            :place="UpgradedMeetup.place"
            :date="UpgradedMeetup.date"
          />
          <div class="button-list">
            <primary-button>Брати участь</primary-button>
            <secondary-button>Відмінити участь</secondary-button>
            <router-link
              :to="{
                name: 'edit',
                params: {
                  meetup: MeetupForEdit,
                },
              }"
            >
              <primary-button> Редагувати </primary-button>
            </router-link>
            <danger-button>Видалити</danger-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MeetupCover from "@/components/MeetupCover";
import MeetupDescription from "@/components/MeetupDescription";
import MeetupAgenda from "@/components/MeetupAgenda";
import MeetupInfo from "@/components/MeetupInfo";
import { getMeetupCoverLink } from "@/api/meetups";
import PrimaryButton from "./PrimaryButton.vue";
import DangerButton from "./DangerButton.vue";
import SecondaryButton from "./SecondaryButton.vue";

export default {
  name: "MeetupView",

  // components
  components: {
    MeetupCover,
    MeetupDescription,
    MeetupAgenda,
    MeetupInfo,
    PrimaryButton,
    DangerButton,
    SecondaryButton,
  },

  // props
  props: {
    meetup: {
      type: Object,
      required: true,
    },
  },

  computed: {
    UpgradedMeetup() {
      return {
        ...this.meetup,
        cover: getMeetupCoverLink(this.meetup),
        date: new Date(this.meetup.date),
      };
    },
    MeetupForEdit() {
      return {
        ...this.UpgradedMeetup,
        date: this.meetup.date,
      };
    },
  },
};
</script>

<style scoped>
.button-list {
  margin: 25px 0;
}

.button-list button:not(:last-child) {
  margin-bottom: 15px;
}

.button-list a {
  margin-bottom: 15px;
}
</style>
