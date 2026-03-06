<template>
  <div class="note-controls" ref="el">
    <div class="note-controls__expander">
      <input type="checkbox" v-model="isExpanded" :id="`note-controls-expander-${id}`">
      <label :for="`note-controls-expander-${id}`">
        <img v-if="!isExpanded" src="@/assets/img/icon/ellipsis-vertical.svg" alt="">
        <img v-else src="@/assets/img/icon/cross.svg" alt="">
      </label>
    </div>
    <div :class="['note-controls__buttons', {'note-controls__buttons_expanded': isExpanded}]">
      <v-button class="note-controls__button note-controls__button_fill-mobile">
        <img src="@/assets/img/icon/note-edit.svg" alt="">
      </v-button>
      <v-button class="note-controls__button">
        <img src="@/assets/img/icon/note-delete.svg" alt="">
      </v-button>
    </div>
  </div>
</template>

<script setup>
import VButton from '@/components/UIElements/Button/VButton.vue';
import { onBeforeUnmount, onMounted, ref, useId, useTemplateRef } from 'vue';

const isExpanded = ref(false);
const id = useId();
const el = useTemplateRef("el");

const onClickOutside = (clickEvt) => {
  // console.log(clickEvt.target, el.value);
  let isInside = false;

  let elem = clickEvt.target;

  while (elem !== document.documentElement) {
    if (elem === el.value) {
      isInside = true;
      break;
    }
    elem = elem.parentNode;
  }

  if (!isInside) {
    isExpanded.value = false;
  }
}

onMounted(() => {
  document.addEventListener("click", onClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", onClickOutside);
});
</script>

<style lang="scss" src="./VNoteControls.scss" scoped />
