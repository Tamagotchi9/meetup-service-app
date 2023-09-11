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
      // NEW
      try {
        this.loading = true;
        await withProgress(
          this.$firebase.post("meetups", meetup.id, {
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
        this.$router.push({ name: "meetups" });
        this.$toaster.success("Подія створена");
      } catch (err) {
        this.$toaster.error(err.message);
      } finally {
        this.loading = false;
      }

      // OLD
      // if (this.$route.name === "edit") {
      //   try {
      //     await withProgress(MeetupsAPI.updateMeetup(meetup.id, meetup));
      //     this.$toaster.success("Подію оновлено");
      //   } catch (err) {
      //     this.$toaster.error(err.response.data.message);
      //   }
      // } else {
      //   try {
      //     console.log(meetup);
      //     await withProgress(MeetupsAPI.createMeetup(meetup));
      //     this.$toaster.success("Подія створена");
      //     this.$router.push({ name: "meetups" });
      //   } catch (err) {
      //     this.$toaster.error(err.response.data.message);
      //   }
      // }
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
