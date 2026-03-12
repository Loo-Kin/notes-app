<template>
  <div class="notes-viewer">
    <div class="notes-viewer__toolbar">
      <v-switch-buttons :variants="switchButtonVariants" v-model="displayMode"></v-switch-buttons>
    </div>
    <div :class="['notes-viewer__main', `notes-viewer__main_${displayMode}`]" ref="scrollable">
      <template v-if="notes?.notes && notes.notes.length > 0">
        <transition-group name="list">
          <v-note-card v-for="(note) in notes.notes" :key="note.id"
            :note="note"
            :layout="displayMode"
            @edit-note="emit('edit-note', $event)">
          </v-note-card>
        </transition-group>
      </template>
      <div v-else-if="!isLoading">
        <p class="text text-b1">Заметки отсутствуют</p>
      </div>
      <div v-show="!isAllNotesDisplayed || isLoading" class="notes-viewer__preloader" ref="preloader">
        <transition name="spinner">
          <v-loading-spinner v-if="isLoading" key="spinner"></v-loading-spinner>
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject, onMounted, ref, useTemplateRef } from 'vue';

import VSwitchButtons from '@/components/UIElements/SwitchButtons/VSwitchButtons.vue';
import VNoteCard from '../NoteCard/VNoteCard.vue';
import VLoadingSpinner from '@/components/UIElements/LoadingSpinner/VLoadingSpinner.vue';

import iconSquare from '@/assets/img/icon/view-icon-square.svg?url';
import iconList from '@/assets/img/icon/view-icon-list.svg?url';

const switchButtonVariants = [
  { name: 'square', icon: iconSquare },
  { name: 'list', icon: iconList },
];

const props = defineProps({
  notes: { type: Object },
  isLoading: { type: Boolean }
});

const emit = defineEmits(["reach-bottom", "edit-note"]);

const scrollable = useTemplateRef("scrollable");
const preloader = useTemplateRef("preloader");

const displayMode = ref("square");
const isAllNotesDisplayed = inject("isAllNotesDisplayed");

onMounted(() => {
  initScrollable();
});

const initScrollable = () => {
  const options = {
    root: scrollable.value,
    rootMargin: "0px",
    scrollMargin: "0px",
    threshold: 0.0,

  };

  const observer = new IntersectionObserver(onReachEnd, options);

  observer.observe(preloader.value);
}

const onReachEnd = (entries) => {
  if (props.isLoading) {
    return
  }

  entries.forEach(entry => {
    if (entry.isIntersecting) {
      emit("reach-bottom")
    }
  });
}
</script>

<style lang="scss" src="./VNotesViewer.scss" scoped />
