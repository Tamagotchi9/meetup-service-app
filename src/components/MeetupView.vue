<template>
  <div>
    <meetup-cover :link="UpgradedMeetup.cover" :title="UpgradedMeetup.title" />
    <div class="container">
      <div class="meetup">
        <div class="meetup__content">
          <content-tabs :tabs="tabs">
            <router-view
              :description="UpgradedMeetup.description"
              :agenda="UpgradedMeetup.agenda"
            />
          </content-tabs>
        </div>
        <div class="meetup__aside">
          <!-- meetup info -->
          <meetup-info
            :organizer="UpgradedMeetup.organizer"
            :place="UpgradedMeetup.place"
            :date="UpgradedMeetup.date"
          />
          <div class="button-list">
            <primary-button
              v-if="!attandance && user && user.fullname !== meetup.organizer"
              @click="allowedToAttend"
              >Брати участь</primary-button
            >
            <secondary-button
              v-if="attandance && user"
              @click="cancelParticipation(meetup.id)"
              >Відмінити участь</secondary-button
            >
            <router-link
              v-if="user && meetup.organizer === user.fullname"
              :to="{
                name: 'edit',
                params: {
                  meetup: MeetupForEdit
                }
              }"
            >
              <primary-button> Редагувати </primary-button>
            </router-link>
            <danger-button
              @click="deleteMeetup(meetup.id)"
              v-if="meetup.organizing && user"
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
import { ImageAPI } from "@/api/ImageAPI";
import { MeetupsAPI } from "@/api/MeetupsAPI";
import PrimaryButton from "./PrimaryButton.vue";
import DangerButton from "./DangerButton.vue";
import SecondaryButton from "./SecondaryButton.vue";
import { withProgress } from "@/helpers/requests-wrapper";
import { authService } from "@/services/AuthService";

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
      attandance: this.meetup.attending,
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
    UpgradedMeetup() {
      return {
        ...this.meetup,
        cover: ImageAPI.fetchImage(this.meetup.imageId),
        date: new Date(this.meetup.date)
      };
    },
    MeetupForEdit() {
      return {
        ...this.UpgradedMeetup,
        date: this.meetup.date
      };
    },
    user() {
      return authService.user;
    }
  },

  methods: {
    async participate(meetupId) {
      try {
        await withProgress(MeetupsAPI.attend(meetupId));
        this.$toaster.success("Збережено");
        this.attandance = true;
      } catch (err) {
        this.$toaster.error(err.response.data.message);
      }
    },
    allowedToAttend() {
      if (this.user) {
        this.participate(this.meetup.id);
      } else {
        this.$router.push({ name: "login" });
      }
    },
    async cancelParticipation(meetupId) {
      try {
        await withProgress(MeetupsAPI.leave(meetupId));
        this.$toaster.success("Збережено");
        this.attandance = false;
      } catch (err) {
        this.$toaster.error(err.response.data.message);
      }
    },
    async deleteMeetup(meetupId) {
      let isDeleted = confirm("Ви впевнені? Цю дію не можна буде скасувати");
      if (isDeleted) {
        try {
          await withProgress(MeetupsAPI.deleteMeetup(meetupId));
          this.$toaster.success("Збережено");
          this.attandance = false;
          this.$router.push({ name: "meetups" });
        } catch (err) {
          this.$toaster.error(err.response.data.message);
        }
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
