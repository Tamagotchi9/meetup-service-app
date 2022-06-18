<template>
  <div class="container">
    <div class="filters-panel">
      <div class="filters-panel__col">
        <form-check
          :options="dateFilterOptions"
          :date.sync="filter.date"
        ></form-check>
      </div>

      <div class="filters-panel__col">
        <div class="form-group form-group_inline">
          <app-input small rounded v-model="filter.search">
            <template #left-icon>
              <app-icon icon="search" />
            </template>
          </app-input>
        </div>
        <div class="form-group form-group_inline">
          <page-tabs :view.sync="filter.view"></page-tabs>
        </div>
      </div>
    </div>

    <fade-transition v-if="filteredMeetups && filteredMeetups.length">
      <meetups-list
        v-if="filter.view === '' || filter.view === 'list'"
        :meetups="filteredMeetups"
        key="list"
      ></meetups-list>
      <meetups-calendar
        v-else-if="filter.view === 'calendar'"
        :meetups="filteredMeetups"
        key="calendar"
      ></meetups-calendar>
    </fade-transition>
    <app-empty v-else>Митапов по заданным условям не найдено...</app-empty>
  </div>
</template>

<script>
import MeetupsList from "@/components/MeetupsList";
import MeetupsCalendar from "@/components/MeetupsCalendar";
import PageTabs from "@/components/PageTabs";
import FormCheck from "@/components/FormCheck";
import AppEmpty from "@/components/AppEmpty";
import { API_URL, fetchMeetups } from "@/api/meetups";
import AppIcon from "@/components/AppIcon";
import AppInput from "@/components/AppInput";
import FadeTransition from "@/components/FadeTransition";

export default {
  name: "MeetupsPage",

  components: {
    MeetupsList,
    MeetupsCalendar,
    PageTabs,
    FormCheck,
    AppEmpty,
    AppInput,
    AppIcon,
    FadeTransition,
  },

  data() {
    return {
      meetups: [],
      filter: {
        date: "",
        participation: "",
        search: "",
        view: "",
      },
      dateFilterOptions: [
        { text: "Всі", value: "" },
        { text: "Минулі", value: "past" },
        { text: "Майбутні", value: "future" },
      ],
    };
  },

  watch: {
    filter: {
      deep: true,
      handler() {
        this.addQuery();
      },
    },
    "$route.query": function (newQueries) {
      this.filter.view = newQueries.view ? newQueries.view : "";
      this.filter.date = newQueries.date ? newQueries.date : "";
      this.filter.participation = newQueries.participation
        ? newQueries.participation
        : "";
      this.filter.search = newQueries.search ? newQueries.search : "";
    },
  },

  async mounted() {
    this.meetups = await this.fetchMeetups();
  },

  computed: {
    processedMeetups() {
      return this.meetups.map((meetup) => ({
        ...meetup,
        cover: meetup.imageId
          ? `${API_URL}/images/${meetup.imageId}`
          : undefined,
        date: new Date(meetup.date),
        localeDate: new Date(meetup.date).toLocaleString(
          navigator.language["ukr"],
          {
            year: "numeric",
            month: "long",
            day: "numeric",
          }
        ),
      }));
    },

    filteredMeetups() {
      let filteredMeetups = this.processedMeetups;

      if (this.filter.date === "past") {
        filteredMeetups = filteredMeetups.filter(
          (meetup) => new Date(meetup.date) <= new Date()
        );
      } else if (this.filter.date === "future") {
        filteredMeetups = filteredMeetups.filter(
          (meetup) => new Date(meetup.date) > new Date()
        );
      }

      if (this.filter.participation === "organizing") {
        filteredMeetups = filteredMeetups.filter((meetup) => meetup.organizing);
      } else if (this.filter.participation === "attending") {
        filteredMeetups = filteredMeetups.filter((meetup) => meetup.attending);
      }

      if (this.filter.search) {
        const concatMeetupText = (meetup) =>
          [meetup.title, meetup.description, meetup.place, meetup.organizer]
            .join(" ")
            .toLowerCase();
        filteredMeetups = filteredMeetups.filter((meetup) =>
          concatMeetupText(meetup).includes(this.filter.search.toLowerCase())
        );
      }

      return filteredMeetups;
    },
  },

  methods: {
    async fetchMeetups() {
      return fetchMeetups();
    },

    addQuery() {
      let queries = {
        view: this.filter.view,
        date: this.filter.date,
        participation: this.filter.participation,
        search: this.filter.search,
      };
      if (queries.view === "list" || queries.view === "") {
        delete queries.view;
      }
      if (queries.date === "all" || queries.date === "") {
        delete queries.date;
      }
      if (queries.participation === "all" || queries.participation === "") {
        delete queries.participation;
      }
      if (!queries.search) {
        delete queries.search;
      }
      return this.$router.push({ query: queries }).catch((err) => {
        if (err.name !== "NavigationDuplicated") {
          throw err;
        }
      });
    },
  },
};
</script>

<style scoped>
.filters-panel {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 40px 0 32px 0;
}

.filters-panel__col {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}

@media all and (max-width: 767px) {
  .filters-panel {
    flex-direction: column;
  }

  .filters-panel__col + .filters-panel__col {
    margin-top: 16px;
  }
}

@media all and (max-width: 480px) {
  #filters-panel__search {
    width: calc(100% - 112px);
  }

  #filters-panel__search >>> .form-control {
    max-width: 100%;
  }
}
</style>
