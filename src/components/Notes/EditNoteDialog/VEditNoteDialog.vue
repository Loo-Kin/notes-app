<template>
  <form class="dialog" action="http://127.0.0.1:5000/notes" method="post" enctype="multipart/form-data" id="edit-note">
    <div class="dialog__title">
      <h2>
        {{ note ? note.title : "Новая заметка" }}
      </h2>
      <v-button type="button" class="btn btn_close" :disabled="isLoading" @click="modalProps.closeModal">
        <img src="@/assets/img/icon/cross.svg" alt="">
      </v-button>
    </div>
    <div class="dialog__main">
      <v-textbox v-model="title" name="title" placeholder="Заголовок*" maxlength="10"></v-textbox>
      <v-textarea v-model="text" name="text" placeholder="Текст заметки" maxlength="1000"></v-textarea>
      <v-button-file-picker v-if="!isImageLoading" v-model="image" name="image" accept="image/png, image/jpeg" :max-size="1024 * 1024">
        <img src="@/assets/img/icon/add-img.svg" alt="">
        Прикрепить изображение
      </v-button-file-picker>
    </div>
    <div class="dialog__footer">
      <v-button type="button" class="btn btn_large btn_border" :disabled="isLoading" @click="modalProps.closeModal">
        Отменить
      </v-button>
      <v-button type="button" class="btn btn_large" :disabled="!isFormValid || isLoading" @click="submitNote">
        {{ !isLoading ? "Сохранить" : "Сохранение..." }}
      </v-button>
    </div>
  </form>
</template>

<script setup>
import { computed, ref } from 'vue';

import { useRequest } from '@/composables/request';

import VButton from '@/components/UIElements/Button/VButton.vue';
import VTextbox from '@/components/UIElements/Textbox/VTextbox.vue';
import VTextarea from '@/components/UIElements/Textarea/VTextarea.vue';
import VButtonFilePicker from '@/components/UIElements/ButtonFilePicker/VButtonFilePicker.vue';

function clearFormData(formData) {
  for (let [name] of formData) {
    formData.delete(name);
  }
}

const props = defineProps({
  modalProps: { type: Object },
  note: { type: [Object, null], default: null }
});

const emit = defineEmits(["submit-note"]);

const formData = ref(new FormData());
const title = ref(props.note?.title ?? "");
const text = ref(props.note?.text ?? "");
const image = ref([]);
const isImageLoading = ref(false);

initImage().then(result => {
  image.value = result;
});

const requestProperties = computed(() => {
  if (!props.note) {
    return ["http://127.0.0.1:5000/notes", null, "POST", "", formData.value];
  } else {
    return [`http://127.0.0.1:5000/notes/${props.note.id}`, null, "PATCH", "", formData.value];
  }
});

const { request, isLoading, isLoaded } = useRequest(...requestProperties.value);

const isFormValid = computed(() => title.value.length > 0 && text.value.length > 0 && image.value.length > 0);

async function initImage() {
  const result = [];

  if (!props.note?.image) {
    return result;
  }

  isImageLoading.value = true;

  const pathSplit = props.note.image.split("/");
  const fileName = pathSplit[pathSplit.length - 1];

  const blob = await fetch(props.note.image);
  const file = new File([blob], fileName);

  result.push(file);

  isImageLoading.value = false;

  return result;
}

const submitNote = async function () {
  clearFormData(formData.value);
  formData.value.append("title", title.value);
  formData.value.append("text", text.value);
  formData.value.append("image", image.value[0] ?? null);

  // Список пар ключ/значение
  for(let [name, value] of formData.value) {
    console.log(name, value); // key1=value1, потом key2=value2
  }

  try {
    await request();
  } catch (error) {
    console.log('FAILED', error);
    clearFormData(formData.value)
  }


  if (isLoaded.value) {
    props.modalProps.closeModal();
    emit("submit-note");
  }
}
</script>

<style lang="scss" scoped src="./VEditNoteDialog.scss" />
