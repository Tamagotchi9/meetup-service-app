<template>
  <div class="form-check">
    <div
      v-for="option in options"
      :key="option.value"
      class="form-check__group"
    >
      <input
        class="form-check__input"
        type="radio"
        name="date"
        :value="option.value"
        :checked="option.value === date"
        @input="$emit('update:date', option.value)"
      />
      <label class="form-check__label">{{ option.text }}</label>
    </div>
  </div>
</template>

<script>
export default {
  name: "FormCheck",

  props: {
    options: {
      type: Array,
      required: true,
    },
    date: {
      type: String,
    },
  },

  model: {
    prop: "selected",
    event: "change",
  },
};
</script>

<style scoped>
.form-check {
  display: flex;
  flex-direction: row;
}

.form-check__group {
  position: relative;
  display: inline-flex;
}

.form-check__label {
  margin-right: 16px;
  height: 44px;
  padding: 6px 16px;
  border-radius: 22px;
  border: 2px solid transparent;
  color: var(--blue);
  font-weight: 400;
  font-size: 20px;
  line-height: 28px;
  transition: 0.2s all;
}

.form-check__label:hover,
.form-check__input:checked ~ .form-check__label {
  border-color: var(--blue);
}

.form-check__input {
  opacity: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  cursor: pointer;
}

@media all and (max-width: 767px) {
  .form-check__label {
    margin-right: 8px;
    padding: 6px 8px;
  }
}
</style>
