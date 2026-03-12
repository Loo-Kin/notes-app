<template>
  <div class="filepicker">
    <template v-if="model.length === 0">
      <label :for="`file-picker-${id}`">
        <slot></slot>
      </label>
      <input ref="inputElement" type="file" :name="name" :id="`file-picker-${id}`" :accept="accept"
        @change="acceptFiles" @cancel="cancel">
    </template>
    <template v-else>
      <div class="filepicker__files">
        <div v-for="(file, fileIdx) in model" :key="fileIdx" class="filepicker__file">
          <span>{{ file.name }}</span>
          <v-button type="button" class="btn btn_close-small" @click="removeFile(fileIdx)">
            <img src="@/assets/img/icon/cross-circle.svg" alt="">
          </v-button>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { onMounted, useTemplateRef, useId } from 'vue';

import VButton from '@/components/UIElements/Button/VButton.vue'

const id = useId();
const model = defineModel();
const inputElement = useTemplateRef('inputElement');

const props = defineProps({
  name: { type: String },
  accept: { type: String, default: "" },
  maxSize: { type: Number, default: Infinity }
});

const acceptFiles = function () {
  model.value = Array.from(inputElement.value.files);

  model.value.forEach((file, fileIdx) => {
    if (file.size > props.maxSize) {
      console.warn(`Файл ${file.name} превышает допустимый размер и не может быть загружен\n (${file.size} > ${props.maxSize})`);
      alert(`Файл ${file.name} превышает допустимый размер и не может быть загружен\n (${file.size} > ${props.maxSize})`);
      removeFile(fileIdx);
    }
  });
};

const cancel = function () {
  console.log(model.value);
};

const removeFile = function (fileIdx) {
  model.value.splice(fileIdx, 1);
};

onMounted(() => {

});
</script>

<style lang="scss" scoped src="./VButtonFilePicker.scss" />
