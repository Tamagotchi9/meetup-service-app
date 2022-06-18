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
export default {
  name: "FormPage",

  components: { FormLayout, MeetupForm },

  props: {
    meetup: {
      type: Object,
      default: () => ({}),
    },
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
        agenda: [],
      },
    };
  },

  computed: {
    isEmptyMeetupFromEdit() {
      return !!Object.keys(this.meetup).length;
    },
  },

  methods: {
    handleSubmit(meetup) {
      this.meetup = meetup;
    },

    handleCancel() {
      alert("Cancel");
    },
  },
};
</script>

<style scoped></style>
