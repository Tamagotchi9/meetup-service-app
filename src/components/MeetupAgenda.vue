<template>
  <div class="meetup-agenda">
    <meetup-agenda-item
      v-for="(agendaItem, index) in agenda"
      :agenda-item="agenda[index]"
      :key="index"
    />
  </div>
</template>

<script>
import MeetupAgendaItem from "@/components/MeetupAgendaItem";
export default {
  name: "MeetupAgenda",
  // components
  components: {
    MeetupAgendaItem,
  },
  // props
  props: {
    agenda: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
</style>
