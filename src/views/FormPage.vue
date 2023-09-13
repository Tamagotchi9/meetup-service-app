<template>
  <form-layout
    :title="
      $route.name === 'edit' ? 'Редагувати конференцію' : 'Створити конференцію'
    "
  >
    <meetup-form
      :meetup="isMeetupEdit ? editedMeetup : meetup"
      :submit-text="$route.name === 'edit' ? 'Редагувати' : 'Створити'"
      @submit="handleSubmit"
      @cancel="handleCancel"
    />
  </form-layout>
</template>

<script>
import FormLayout from "@/layout/FormLayout";
import MeetupForm from "@/components/MeetupForm";
import { withProgress } from "@/helpers/requests-wrapper";
import { nanoid } from "nanoid";
import { authService } from "@/services/AuthService";
import { createMeetup, updateMeetup } from "@/api/MeetupsAPI";

export default {
  name: "FormPage",

  components: { FormLayout, MeetupForm },

  props: {
    editedMeetup: {
      type: Object,
      default: () => ({})
    }
  },

  data() {
    return {
      meetup: {
        id: nanoid(),
        title: "",
        description: "",
        imageId: null,
        date: Date.parse(new Date()),
        place: "",
        agenda: [],
        participants: []
      },
      loading: false
    };
  },

  computed: {
    isMeetupEdit() {
      return !!Object.keys(this.editedMeetup).length;
    },
    user() {
      return authService.user;
    }
  },

  methods: {
    async handleSubmit(meetup) {
      try {
        this.loading = true;
        if (this.$route.name === "edit") {
          await withProgress(
            updateMeetup({
              ...meetup,
              organizer: {
                id: this.user.uid,
                name: this.user.displayName,
                email: this.user.email,
                phone: this.user.phoneNumber,
                photo: this.user.photoURL
              }
            })
          );
          this.$toaster.success("Подія оновлена");
        } else {
          await withProgress(
            createMeetup({
              ...meetup,
              organizer: {
                id: this.user.uid,
                name: this.user.displayName,
                email: this.user.email,
                phone: this.user.phoneNumber,
                photo: this.user.photoURL
              }
            })
          );
          this.$toaster.success("Подія створена");
        }

        this.$router.push({ name: "meetups" });
      } catch (err) {
        this.$toaster.error(err.message);
      } finally {
        this.loading = false;
      }
    },

    handleCancel() {
      if (this.$route.name === "edit") {
        this.$router.push({
          name: "meetup",
          params: { meetupId: this.$route.params.meetupId }
        });
      } else {
        this.$router.push({ name: "meetups" });
      }
    }
  }
};
</script>

<style scoped></style>
