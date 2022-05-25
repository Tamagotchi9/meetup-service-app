<template>
  <div class="image-uploader">
    <label
      class="image-uploader__preview image-uploader__preview-loading"
      :style="imageId ? { '--bg-image': `url(${getImageURL(imageId)})` } : ''"
    >
      <span v-if="imageId !== null">Удалить изображение</span>
      <span v-else-if="loading">Загрузка...</span>
      <span v-else>Загрузить изображение</span>
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
import { ImageService } from "@/helpers/image-service";

export default {
  name: "ImageUploader",
  data() {
    return {
      loading: false,
    };
  },
  props: {
    imageId: {
      type: Number,
      default: null,
    },
  },
  model: {
    prop: "imageId",
    event: "change",
  },
  methods: {
    async uploadImage(file) {
      if (this.imageId === null) {
        this.loading = true;
      }
      let result = await ImageService.uploadImage(file);
      // this.imageId = result.id;
      this.$emit("change", result.id);
      this.loading = false;
    },
    getImageURL(id) {
      return ImageService.getImageURL(id);
    },
    deleteImage(e) {
      if (this.imageId !== null) {
        e.preventDefault();
        this.$emit("change", null);
        e.target.value = "";
      }
    },
  },
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
