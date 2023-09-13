<template>
  <div class="image-uploader">
    <label
      class="image-uploader__preview image-uploader__preview-loading"
      :style="imageUploaderBackground"
    >
      <span v-if="imageId !== null">Удалить изображение</span>
      <span v-else-if="loading">Загрузка...</span>
      <span v-else>Завантажити фото</span>
      <input
        type="file"
        accept="image/*"
        class="form-control-file"
        @change="uploadImage($event.target.files[0])"
        @click="deleteImage($event)"
      />
    </label>
  </div>
</template>

<script>
import { fetchImage, uploadImage } from "@/api/ImageAPI";
import { withProgress } from "@/helpers/requests-wrapper";

export default {
  name: "ImageUploader",
  data() {
    return {
      loading: false
    };
  },
  computed: {
    imageUploaderBackground() {
      return this.imageId ? { "--bg-image": `url(${this.imageId})` } : "";
    }
  },
  props: {
    imageId: {
      type: String,
      default: null
    }
  },
  model: {
    prop: "imageId",
    event: "change"
  },
  watch: {
    imageId(val) {
      this.getImageURL(val);
    }
  },
  methods: {
    async uploadImage(file) {
      try {
        this.loading = true;

        await withProgress(uploadImage(file));
        const imgUrl = await this.getImageURL(file.name);
        this.$emit("change", imgUrl);

        this.$toaster.success("Зображення успішно додано!");
        this.loading = false;
      } catch (err) {
        this.$toaster.error(err.message);
      }
    },
    async getImageURL(filename) {
      return await fetchImage(filename);
    },
    deleteImage(e) {
      if (this.imageId !== null) {
        console.log(e);
        e.preventDefault();
        this.$emit("change", null);
        e.target.value = "";
      }
    }
  }
};
</script>

<style scoped>
.image-uploader .form-control-file {
  opacity: 0;
  height: 0;
}

.image-uploader .image-uploader__preview {
  --bg-image: var(--default-cover);
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.4),
      rgba(0, 0, 0, 0.4)
    ),
    var(--bg-image);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  transition: 0.2s border-color;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 512px;
  height: 228px;
}

.image-uploader .image-uploader__preview > span {
  color: var(--white);
  font-family: "Nunito", sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
}

.image-uploader .image-uploader__preview:hover {
  border-color: var(--blue);
}

.image-uploader .image-uploader__preview.image-uploader__preview-loading {
  cursor: no-drop;
}
</style>
