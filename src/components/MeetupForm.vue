<template>
  <form @submit.prevent="handleSubmit" class="form meetup-form">
    <div class="meetup-form__content">
      <fieldset class="form-section" v-if="isCopiedMeetup">
        <form-group label="Назва">
          <app-input v-model="meetup_.title" />
        </form-group>
        <form-group label="Дата">
          <date-input type="date" :valueAsNumber.sync="meetup_.date" />
        </form-group>
        <form-group label="Місце">
          <app-input v-model="meetup_.place" />
        </form-group>
        <form-group label="Опис">
          <app-input v-model="meetup_.description" multiline />
        </form-group>
        <form-group label="Зображення">
          <image-uploader v-model="meetup_.imageId" />
        </form-group>
      </fieldset>

      <h3 class="form__section-title">Програма</h3>
      <meetup-agenda-item-form
        v-for="(agendaItem, index) in meetup_.agenda"
        :key="agendaItem.id"
        :agenda-item="agendaItem"
        @update:agendaItem="updateAgendaItem(index, $event)"
        @remove="removeAgendaItem(index)"
        class="mb-3"
      />

      <div class="form-section_append">
        <button type="button" @click="addAgendaItem" data-test="addAgendaItem">
          + Додати подію програми
        </button>
      </div>
    </div>

    <div class="meetup-form__aside">
      <div class="meetup-form__aside_stick">
        <button
          class="button button_secondary button_block"
          type="button"
          @click="$emit('cancel')"
          data-test="cancel"
        >
          Отмена
        </button>
        <button
          class="button button_primary button_block"
          type="submit"
          data-test="submit"
        >
          {{ submitText }}
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import MeetupAgendaItemForm from "./MeetupAgendaItemForm";
import ImageUploader from "./ImageUploader";
import FormGroup from "./FormGroup";
import AppInput from "./AppInput";
import DateInput from "./DateInput";
import { cloneDeep } from "lodash";
import { nanoid } from "nanoid";

function buildAgendaItem() {
  return {
    id: nanoid(),
    startsAt: "00:00",
    endsAt: "00:00",
    type: "other",
    title: null,
    description: null,
    speaker: null,
    language: null,
  };
}

export default {
  name: "MeetupForm",

  components: {
    ImageUploader,
    MeetupAgendaItemForm,
    FormGroup,
    AppInput,
    DateInput,
  },

  props: {
    meetup: {
      type: Object,
      required: true,
    },
    submitText: {
      type: String,
      default: "",
    },
  },

  data() {
    return {
      meetup_: cloneDeep(this.meetup),
    };
  },

  computed: {
    isCopiedMeetup() {
      return !!Object.keys(this.meetup_).length;
    },
  },

  methods: {
    addAgendaItem() {
      const newItem = buildAgendaItem();
      if (this.meetup_.agenda.length) {
        newItem.startsAt =
          this.meetup_.agenda[this.meetup_.agenda.length - 1].endsAt;
      }
      this.meetup_.agenda.push(newItem);
    },

    updateAgendaItem(index, newItem) {
      this.meetup_.agenda.splice(index, 1, newItem);
    },

    removeAgendaItem(index) {
      this.meetup_.agenda.splice(index, 1);
    },

    handleSubmit() {
      this.$emit("submit", cloneDeep(this.meetup_));
    },
  },
};
</script>

<style scoped>
.meetup-form__aside {
  margin: 48px 0;
}

.meetup-form__aside_stick > .button {
  margin: 0 0 12px 0;
}

@media all and (min-width: 992px) {
  .meetup-form {
    display: flex;
    flex-direction: row;
  }

  .meetup-form__content {
    flex: 1 0 calc(100% - 320px);
  }

  .meetup-form__aside {
    flex: 1 0 320px;
    max-width: 320px;
    width: 100%;
    padding-left: 137px;
    margin: 0;
  }

  .meetup-form__aside_stick {
    position: sticky;
    top: 32px;
  }
}
</style>
