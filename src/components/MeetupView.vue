<template>
  <div>
    <meetup-cover :link="upgradedMeetup.cover" :title="upgradedMeetup.title" />
    <div class="container">
      <div class="meetup">
        <div class="meetup__content">
          <content-tabs :tabs="tabs">
            <router-view
              :description="upgradedMeetup.description"
              :agenda="upgradedMeetup.agenda"
            />
          </content-tabs>
        </div>
        <div class="meetup__aside">
          <!-- meetup info -->
          <meetup-info
            :organizer="upgradedMeetup.organizer.name"
            :place="upgradedMeetup.place"
            :date="upgradedMeetup.date"
          />
          <div class="button-list">
            <primary-button v-if="canAttend" @click="handleAttendance"
              >Брати участь</primary-button
            >
            <secondary-button v-if="canLeave" @click="cancelParticipation"
              >Відмінити участь</secondary-button
            >
            <router-link
              v-if="canEdit"
              :to="{
                name: 'edit',
                params: {
                  editedMeetup: meetupForEdit
                }
              }"
            >
              <primary-button> Редагувати </primary-button>
            </router-link>
            <danger-button v-if="canEdit" @click="deleteMeetup(meetup.id)"
              >Видалити</danger-button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MeetupCover from "@/components/MeetupCover";
import MeetupInfo from "@/components/MeetupInfo";
import ContentTabs from "@/components/ContentTabs";
import PrimaryButton from "./PrimaryButton.vue";
import DangerButton from "./DangerButton.vue";
import SecondaryButton from "./SecondaryButton.vue";
import { withProgress } from "@/helpers/requests-wrapper";
import { authService } from "@/services/AuthService";
import { updateMeetup, deleteMeetup } from "@/api/MeetupsAPI";

export default {
  name: "MeetupView",

  components: {
    MeetupCover,
    MeetupInfo,
    PrimaryButton,
    DangerButton,
    SecondaryButton,
    ContentTabs
  },

  data() {
    return {
      tabs: [
        { to: { name: "meetup-description" }, text: "Опис" },
        { to: { name: "meetup-agenda" }, text: "Програма" }
      ]
    };
  },

  props: {
    meetup: {
      type: Object,
      required: true
    }
  },

  computed: {
    upgradedMeetup() {
      return {
        ...this.meetup,
        cover: this.meetup.imageId,
        date: new Date(this.meetup.date)
      };
    },
    meetupForEdit() {
      return {
        ...this.upgradedMeetup,
        date: this.meetup.date
      };
    },
    user() {
      return authService.user;
    },
    isOrganizer() {
      if (!this.user) {
        return;
      }
      return this.meetup.organizer.id === this.user.uid;
    },
    canAttend() {
      if (!this.user) {
        return true;
      }
      return (
        !this.meetup.participants.find(
          participantId => participantId === this.user.uid
        ) && !this.isOrganizer
      );
    },
    canLeave() {
      if (!this.user) {
        return;
      }
      return (
        this.meetup.participants.find(
          participantId => participantId === this.user.uid
        ) && !this.isOrganizer
      );
    },
    canEdit() {
      if (!this.user) {
        return;
      }
      return this.meetup.organizer.id === this.user.uid;
    }
  },

  methods: {
    async participate() {
      try {
        await withProgress(
          updateMeetup({
            ...this.meetup,
            participants: [...this.meetup.participants, this.user.uid]
          })
        );
        this.$toaster.success("Ви будете брати участь!");
      } catch (err) {
        this.$toaster.error(err.message);
      }
    },
    handleAttendance() {
      if (this.user) {
        this.participate();
      } else {
        this.$router.push({ name: "login" });
      }
    },
    async cancelParticipation() {
      try {
        await withProgress(
          updateMeetup({
            ...this.meetup,
            participants: this.meetup.participants.filter(
              participantId => participantId !== this.user.uid
            )
          })
        );
        this.$toaster.success("Ви відмінили участь!");
      } catch (err) {
        this.$toaster.error(err.message);
      }
    },
    async deleteMeetup(meetupId) {
      // TODO: add confirm modal in future
      // let isDeleted = confirm("Ви впевнені? Цю дію не можна буде скасувати");
      try {
        await withProgress(deleteMeetup(meetupId));
        this.$toaster.success("Подію видалено");
        this.$router.push({ name: "meetups" });
      } catch (err) {
        this.$toaster.error(err.message);
      }
    }
  }
};
</script>

<style scoped>
.button-list {
  margin: 25px 0;
}

.button-list button:not(:last-child) {
  margin-bottom: 15px;
}

.button-list a button {
  margin-bottom: 15px;
}
</style>
