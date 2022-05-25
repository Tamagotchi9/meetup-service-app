<template>
  <AppInput
    v-bind="$attrs"
    v-on="$listeners"
    :value="inputValue"
    :type="type"
    @input.native="handleUpdate"
  >
    <template v-for="slot of Object.keys($slots)" v-slot:[slot]>
      <slot :name="slot" />
    </template>
  </AppInput>
</template>

<script>
import AppInput from './AppInput';

export default {
  name: 'DateInput',

  components: { AppInput },

  props: {
    type: {
      type: String,
      default: 'date',
      validator: (type) => ['date', 'datetime-local', 'time'].includes(type),
    },
    value: {},
    valueAsDate: {
      type: Date,
    },
    valueAsNumber: {
      type: Number,
    },
  },

  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: undefined,
        change: undefined,
      };
    },

    date() {
      return (
        (this.valueAsNumber ? new Date(this.valueAsNumber) : null) ||
        this.valueAsDate
      );
    },

    dateValue() {
      return this.date.toISOString().substring(0, 10);
    },

    timeValue() {
      return this.date.toISOString().substring(11, 16);
    },

    timeWithSecondsValue() {
      return this.date.toISOString().substring(11, 19);
    },

    inputValue() {
      if (!this.date) {
        return this.value;
      }
      if (this.type === 'date') {
        return this.dateValue;
      } else if (this.type === 'time') {
        return (this.$attrs['step'] && this.$attrs['step'] % 60 !== 0) ? this.timeWithSecondsValue : this.timeValue;
      } else if (this.type === 'datetime-local') {
        return `${this.dateValue}T${this.timeValue}`;
      }
      return null;
    },
  },

  methods: {
    handleUpdate($event) {
      this.$emit('update:valueAsNumber', $event.target.valueAsNumber);
      this.$emit(
        'update:valueAsDate',
        this.type !== 'datetime-local'
          ? $event.target.valueAsDate
          : new Date($event.target.valueAsNumber),
      );
    },
  },
};
</script>

<style scoped></style>
