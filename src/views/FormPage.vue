<template>
  <form-layout title="Створити конференцію">
    <meetup-form
      :meetup="meetup"
      submit-text="Сабмит"
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

  data() {
    return {
      meetup: {
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
