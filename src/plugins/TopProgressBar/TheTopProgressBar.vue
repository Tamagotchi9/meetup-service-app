<template>
  <div
    class="progress"
    :class="{
      show,
      failed
    }"
    :style="{
      width: currentProgress + '%'
    }"
  ></div>
</template>

<script>
// Воспользуемся Tweenjs для плавного изменения состояния
import { Tween, Easing, update } from "./vendor/tween.esm";

// Сохраним константы
const START_DELAY = 100;
const MAX_PROGRESS = 95;
const MAX_DURATION = 30000;
const FINISH_DURATION = 200;

export default {
  name: "TheTopProgressBar",

  data() {
    return {
      // Текущий прогресс
      currentProgress: 0,
      // Отображается ли прогресс в текущий момент
      show: false,
      // Успешный ли прогресс
      failed: false,

      // id для requestAnimationFrame
      requestAnimationFrameId: null,
      // id для задержки запуска
      startDelayTimeoutId: null
    };
  },

  mounted() {
    // Когда компонент смонтирован, запускаем анимацию обновления
    this.requestAnimationFrameId = requestAnimationFrame(this.update);
  },

  methods: {
    // Функция обновления использует update из Tween.js
    update(time = 0) {
      this.requestAnimationFrameId = requestAnimationFrame(this.update);
      update(time);
    },

    start() {
      // Если прогресс уже запущен, игнорируем повторный запуск
      if (this.tweenProgress || this.startDelayTimeoutId !== null) {
        return;
      }

      // Сбрасываемся до начального состояния
      this.currentProgress = 0;
      this.failed = false;
      this.show = true;

      // Добавляем задержку запуска
      this.startDelayTimeoutId = setTimeout(() => {
        this.startDelayTimeoutId = null;

        // Запускаем плавное изменение состояния
        this.tweenProgress = this.createCurrentProgressTween(
          0,
          MAX_PROGRESS,
          MAX_DURATION,
          Easing.Exponential.Out
        )
          .onComplete(() => {
            this.tweenProgress = null;
          })
          .onStop(() => {
            this.tweenProgress = null;
          })
          .start();
      }, START_DELAY);
    },

    // Вспомогательный метод запуска плавного изменения
    createCurrentProgressTween(from, to, duration, easing) {
      return new Tween({ value: from })
        .to({ value: to }, duration)
        .easing(easing)
        .onUpdate(({ value }) => {
          this.currentProgress = value;
        });
    },

    // Вспомогательная функция остановки прогресса
    stop() {
      // Если завершение уже в процессе - игнорируем
      if (this.tweenFinish) {
        return;
      }

      // Останавливаем прогресс загрузки
      if (this.tweenProgress) {
        this.tweenProgress.stop();
      }

      // Запускаем быстрый прогресс завершения
      this.tweenFinish = this.createCurrentProgressTween(
        this.currentProgress,
        100,
        FINISH_DURATION,
        Easing.Linear.None
      )
        .onComplete(() => {
          this.show = 0;
          this.tweenFinish = null;
        })
        .onStop(() => {
          this.show = 0;
          this.tweenFinish = null;
        })
        .start();
    },

    finish() {
      // Если прогресс в задержке перед запуском - отменяем
      if (this.startDelayTimeoutId !== null) {
        clearTimeout(this.startDelayTimeoutId);
        this.startDelayTimeoutId = null;
      }

      // Если в процесс загрузки - останавливаем
      if (this.tweenProgress) {
        this.stop();
      }
    },

    fail() {
      this.failed = true;
      this.stop();
    }
  },

  // Хотя для одноразового компонента, который всегда существует, утечка памяти не опасна,
  // лучше всегда очищать ресурсы при уничтожении
  beforeDestroy() {
    cancelAnimationFrame(this.update);
    if (this.startDelayTimeoutId !== null) {
      clearTimeout(this.startDelayTimeoutId);
    }
  }
};
</script>

<style scoped>
.progress {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  width: 0;
  opacity: 0;
  background-color: var(--blue);
  transition: opacity 0.2s linear 0.2s;
  z-index: 999999;
}

.progress.show {
  opacity: 1;
  transition: none;
}

.progress.failed {
  background-color: #db3851;
}
</style>
