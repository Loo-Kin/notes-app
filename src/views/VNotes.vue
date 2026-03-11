<template>
  <main class="v-notes">
    <v-notes-viewer :notes="notes" :is-loading="isLoading" @reach-bottom="extendLimit"></v-notes-viewer>

    <v-button class="btn btn_addnote" @click="openAddNoteDialog">
      <img src="@/assets/img/icon/plus.svg" alt="">
    </v-button>

    <transition name="modal">
      <v-modal v-if="isEditNoteDialog" class="modal_medium" v-slot="slotProps" :show-close-button="false"
        @close="closeAddNoteDialog">
        <v-edit-note-dialog :modal-props="slotProps" @add-successful="refreshNotes"></v-edit-note-dialog>
      </v-modal>
    </transition>
  </main>
</template>

<script setup>
import { useRequest } from '@/composables/request';
import { useDebounceFn } from '@/composables/debounce';
import { computed, inject, provide, reactive, ref, watch } from 'vue';

import VModal from '@/components/PageFragments/Modal/VModal.vue';
import VNotesViewer from '@/components/Notes/NotesViewer/VNotesViewer.vue';
import VEditNoteDialog from '@/components/Notes/EditNoteDialog/VEditNoteDialog.vue';
import VButton from '@/components/UIElements/Button/VButton.vue';

const isEditNoteDialog = ref(false);
const notes = ref(null);

const searchString = inject("currentSearch");
const limitNotes = ref(6);
const query = reactive({
  page: 1,
  search: searchString,
  limit: limitNotes,
})

const { request, data, isLoading } = useRequest('http://127.0.0.1:5000/notes', null, "GET", query);
const { debounce } = useDebounceFn();

const resetLimitAndRefreshNotes = function () {
  limitNotes.value = 6;
  refreshNotes();
}

watch(searchString, () => {
  const debouncedResetLimit = debounce(resetLimitAndRefreshNotes, 250);
  debouncedResetLimit();
});

const openAddNoteDialog = function () {
  isEditNoteDialog.value = true;
}

const closeAddNoteDialog = function () {
  isEditNoteDialog.value = false;
}

const isAllNotesDisplayed = computed(() => {
  if (!data.value) {
    return false;
  }
  return limitNotes.value >= data.value.total;
});

provide("isAllNotesDisplayed", isAllNotesDisplayed);

const extendLimit = function () {
  if (isAllNotesDisplayed.value) {
    return;
  }
  limitNotes.value += 3;
  refreshNotes();
}

const refreshNotes = function () {
  request().then(() => { notes.value = data.value; });
}

refreshNotes();
</script>

<style lang="scss" src="./VNotes.scss" scoped />
