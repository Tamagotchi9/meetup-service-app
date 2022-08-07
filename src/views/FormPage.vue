<template>
  <form-layout
    :title="
      $route.name === 'edit' ? 'Редагувати конференцію' : 'Створити конференцію'
    "
  >
    <meetup-form
      :meetup="isEmptyMeetupFromEdit ? meetup : meetupFromCreate"
      :submit-text="$route.name === 'edit' ? 'Редагувати' : 'Створити'"
      @submit="handleSubmit"
      @cancel="handleCancel"
    />
  </form-layout>
</template>

<script>
import FormLayout from "@/layout/FormLayout";
import MeetupForm from "@/components/MeetupForm";
import { MeetupsAPI } from "@/api/MeetupsAPI";
import { withProgress } from "@/helpers/requests-wrapper";

export default {
  name: "FormPage",

  components: { FormLayout, MeetupForm },

  props: {
    meetup: {
      type: Object,
      default: () => ({})
    }
  },

  data() {
    return {
      meetupFromCreate: {
        id: 0,
        title: "",
        description: "",
        imageId: null,
        date: Date.parse("2021-02-03"),
        place: "",
        agenda: []
      }
    };
  },

  computed: {
    isEmptyMeetupFromEdit() {
      return !!Object.keys(this.meetup).length;
    }
  },

  methods: {
    async handleSubmit(meetup) {
      if (this.$route.name === "edit") {
        try {
          await withProgress(MeetupsAPI.updateMeetup(meetup.id, meetup));
          this.$toaster.success("Подію оновлено");
        } catch (err) {
          this.$toaster.error(err.response.data.message);
        }
      } else {
        try {
          console.log(meetup);
          await withProgress(MeetupsAPI.createMeetup(meetup));
          this.$toaster.success("Подія створена");
          this.$router.push({ name: "meetups" });
        } catch (err) {
          this.$toaster.error(err.response.data.message);
        }
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
