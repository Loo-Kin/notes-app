<template>
  <div class="delete-note">
    <div class="delete-note__header">
      <img src="@/assets/img/icon/trash.svg" alt="">
      <h1>Удалить заметку</h1>
    </div>
    <div class="delete-note__text">
      <p class="text text-b1">
        Удаленная заметка попадет в архив без возможности восстановления
      </p>
    </div>
    <div class="delete-note__buttons">
      <v-button type="button" class="btn btn_large btn_border" :disabled="isLoading" @click="modalProps.closeModal">
        Отменить
      </v-button>
      <v-button type="button" class="btn btn_large" :disabled="isLoading" @click="confirmDelete">
        {{ !isLoading ? "Удалить" : "Удаление..." }}
      </v-button>
    </div>
  </div>
</template>

<script setup>
import VButton from '@/components/UIElements/Button/VButton.vue';
import { useRequest } from '@/composables/request';
import { computed } from 'vue';

const props = defineProps({
  modalProps: { type: Object },
  note: { type: Object },
});

const emit = defineEmits(["confirm-delete"]);

const requestProperties = computed(() => {
  return [`http://127.0.0.1:5000/notes/${props.note.id}`, null, "DELETE", ""];
});

const { request, isLoading } = useRequest(...requestProperties.value);

const confirmDelete = async () => {
  try {
    await request();
    emit("confirm-delete");
    props.modalProps.closeModal();
  } catch (error) {
    console.log('FAILED', error);
  }
};
</script>

<style lang="scss" scoped src="./VDeleteNoteDialog.scss" />
