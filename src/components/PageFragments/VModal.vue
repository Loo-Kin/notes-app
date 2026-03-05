<template>
  <dialog class="modal" ref="dialog">
    <slot :close-modal="closeModal"></slot>
    <v-button v-if="showCloseButton" class="btn btn_close" @click="closeModal">
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

<style lang="scss" scoped>
.modal {
  padding: 60px 40px;
  border: none;
  border-radius: 16px;

  &::backdrop {
    background: rgba(0, 0, 0, 0.40);
  }

  &_medium {
    width: 954px;
  }
}
</style>
