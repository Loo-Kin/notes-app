<template>
  <div :class="['note-card', getNoteClass]">
    <div v-if="note.image" class="note-card__picture">
      <img :src="note.image" alt="" @click="displayPicture = note.image">
    </div>
    <hgroup class="note-card__header">
      <h2 class="note-card__num">#{{ note.id }}</h2>
      <h2 class="note-card__title">{{ note.title }}</h2>
    </hgroup>
    <v-note-controls :class="getNoteControlsClass" @edit-note-click="openEditNoteDialog"
      @delete-note-click="openDeleteNoteDialog">
    </v-note-controls>
    <div class="note-card__text">
      <p class="text text-b2">
        {{ note.text }}
      </p>
    </div>
    <div class="note-card__date">
      {{ dateFormatted }}
    </div>

    <transition name="modal">
      <v-modal v-if="displayPicture" class="modal_picture" v-slot="slotProps" :show-close-button="true"
        @close="displayPicture = null">
        <v-picture-viewer-dialog :modal-props="slotProps" :picture="displayPicture"></v-picture-viewer-dialog>
      </v-modal>
      <v-modal v-else-if="isEditNoteDialog" class="modal_medium" v-slot="slotProps" :show-close-button="false"
        @close="closeEditNoteDialog">
        <v-edit-note-dialog :modal-props="slotProps" :note="note" @submit-note="emit('edit-note', note)">
        </v-edit-note-dialog>
      </v-modal>
      <v-modal v-else-if="isDeleteNoteDialog" class="modal_prompt" v-slot="slotProps" :show-close-button="false"
        @close="closeDeleteNoteDialog">
        <v-delete-note-dialog :modal-props="slotProps" :note="note" @confirm-delete="emit('delete-note', note)">
        </v-delete-note-dialog>
      </v-modal>
    </transition>
  </div>
</template>

<script setup>
import VNoteControls from '../NoteControls/VNoteControls.vue';
import VModal from '@/components/PageFragments/Modal/VModal.vue';
import VPictureViewerDialog from '../PictureViewerDialog/VPictureViewerDialog.vue';
import VEditNoteDialog from '../EditNoteDialog/VEditNoteDialog.vue';
import VDeleteNoteDialog from '../DeleteNoteDialog/VDeleteNoteDialog.vue';
import { computed, ref } from 'vue';

const props = defineProps({
  note: { type: Object },
  layout: {
    type: String, validator(value) {
      return ['square', 'list'].includes(value)
    }
  }
});

const emit = defineEmits(["edit-note", "delete-note"]);

const getNoteClass = computed(() => ({
  "note-card_square": props.layout === "square",
  "note-card_list": props.layout === "list",
}));

const getNoteControlsClass = computed(() => ({
  "note-controls_vertical": props.layout === "square",
  "note-controls_horizontal": props.layout === "list",
}));

const displayPicture = ref(null);

const dateFormatted = computed(() => {
  const formatter = new Intl.DateTimeFormat("ru");
  const date = new Date(props.note.date);

  return formatter.format(date);
});

const isEditNoteDialog = ref(false);

const openEditNoteDialog = () => {
  isEditNoteDialog.value = true;
}

const closeEditNoteDialog = () => {
  isEditNoteDialog.value = false;
}

const isDeleteNoteDialog = ref(false);

const openDeleteNoteDialog = () => {
  isDeleteNoteDialog.value = true;
}

const closeDeleteNoteDialog = () => {
  isDeleteNoteDialog.value = false;
}
</script>

<style lang="scss" src="./VNoteCard.scss" scoped />
