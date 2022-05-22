<template>
  <div class="meetup-agenda__item">
    <div class="meetup-agenda__item-col">
      <img
        class="icon"
        alt="icon"
        :src="require(`@/assets/icons/icon-${finalAgendaItem.icon}.svg`)"
      />
    </div>
    <div class="meetup-agenda__item-col">
      {{ finalAgendaItem.startsAt }} - {{ finalAgendaItem.endsAt }}
    </div>
    <div class="meetup-agenda__item-col">
      <h5 class="meetup-agenda__title">{{ finalAgendaItem.title }}</h5>
      <p>
        <span>{{ finalAgendaItem.speaker }}</span>
        <span
          class="meetup-agenda__dot"
          v-if="finalAgendaItem.speaker && finalAgendaItem.language"
        ></span>
        <span class="meetup-agenda__lang">{{ finalAgendaItem.language }}</span>
      </p>
      <p>{{ finalAgendaItem.description }}</p>
    </div>
  </div>
</template>

<script>
import { agendaItemTitles, agendaItemIcons } from "@/api/meetups";
export default {
  name: "MeetupAgendaItem",
  // props
  props: {
    agendaItem: {
      type: Object,
      required: true,
    },
  },
  agendaItemTitles,
  agendaItemIcons,
  computed: {
    finalAgendaItem() {
      return {
        ...this.agendaItem,
        icon: agendaItemIcons[`${this.agendaItem.type}`],
        title: this.agendaItem.title
          ? this.agendaItem.title
          : agendaItemTitles[`${this.agendaItem.type}`],
      };
    },
  },
};
</script>

<style scoped>
</style>
