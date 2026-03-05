<template>
  <div class="note-card">
    <div v-if="note.image" class="note-card__picture">
      <img :src="note.image" alt="">
      <p class="note-card__picture__caption">
        image1.png
      </p>
    </div>
    <hgroup class="note-card__header">
      <h2 class="note-card__num">#{{ note.id }}</h2>
      <h2 class="note-card__title">{{ note.title }}</h2>
    </hgroup>
    <div class="note-card__buttons">
      <v-button class="note-card__buttons__button card__buttons__button_fill-mobile">
        <img src="@/assets/img/icon/note-edit.svg" alt="">
      </v-button>
      <v-button class="note-card__buttons__button">
        <img src="@/assets/img/icon/note-delete.svg" alt="">
      </v-button>
    </div>
    <div class="note-card__text">
      <p class="text text-b2">
        {{ note.text }}
      </p>
    </div>
    <div class="note-card__date">
      {{ dateFormatted }}
    </div>
  </div>
</template>

<script setup>
import VButton from '@/components/UIElements/Button/VButton.vue';
import { computed } from 'vue';

const props = defineProps({
  note: { type: Object },
});

const dateFormatted = computed(() => {
  const formatter = new Intl.DateTimeFormat("ru");
  const date = new Date(props.note.date);

  return formatter.format(date);
});
</script>

<style lang="scss" src="./VNoteCard.scss" scoped />
