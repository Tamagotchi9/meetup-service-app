<template>
  <form-layout
    :title="
      $route.name === 'edit' ? 'Редагувати конференцію' : 'Створити конференцію'
    "
  >
    <meetup-form
      :meetup="isEmptyMeetupFromEdit ? meetup : meetupFromCreate"
      submit-text="Створити"
      @submit="handleSubmit"
      @cancel="handleCancel"
    />
  </form-layout>
</template>

<script>
import FormLayout from "@/layout/FormLayout";
import MeetupForm from "@/components/MeetupForm";
import { MeetupsAPI } from "@/api/MeetupsAPI";

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
          this.$progress.start();
          const response = await MeetupsAPI.updateMeetup(meetup.id, meetup);
          this.$toaster.success("Meetup Updated");
          this.$progress.finish();
          return await response.data;
        } catch (err) {
          this.$progress.fail();
          this.$toaster.error(err.response.data.message);
        }
      } else {
        try {
          this.$progress.start();
          const response = await MeetupsAPI.createMeetup(this.meetupFromCreate);
          this.$toaster.success("Meetup Created");
          this.$progress.finish();
          return await response.data;
        } catch (err) {
          this.$progress.fail();
          this.$toaster.error(err.response.data.message);
        }
      }
    },

    handleCancel() {
      alert("Cancel");
    }
  }
};
</script>

<style scoped></style>
