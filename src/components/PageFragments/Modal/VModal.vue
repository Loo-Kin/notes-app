<template>
  <dialog class="modal" ref="dialog">
    <slot :close-modal="closeModal"></slot>
    <v-button v-if="showCloseButton" class="btn btn_close modal__close" @click="closeModal">
      <img src="@/assets/img/icon/cross.svg" alt="">
    </v-button>
  </dialog>
</template>

<script setup>
import { onMounted, useTemplateRef } from 'vue';
import VButton from '@/components/UIElements/Button/VButton.vue';

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  showCloseButton: { type: Boolean, default: true }
});
const emit = defineEmits(['close']);
const dialogElement = useTemplateRef('dialog');

const closeModal = function () {
  emit('close');
}

onMounted(() => {
  dialogElement.value.showModal();
});
</script>

<style lang="scss" scoped src="./VModal.scss" />
