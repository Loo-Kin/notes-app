<template>
  <div class="picture-viewer">
    <img :src="picture" alt="" ref="picture">
    <transition name="spinner">
      <div v-if="!isLoaded" class="picture-viewer__loading">
        <v-loading-spinner key="spinner"></v-loading-spinner>
      </div>
    </transition>
  </div>
</template>

<script setup>
import VLoadingSpinner from '@/components/UIElements/LoadingSpinner/VLoadingSpinner.vue';
import { onMounted, ref, useTemplateRef } from 'vue';

defineProps({
  picture: { type: [String, null] }
});

const isLoaded = ref(false);
const pictureElement = useTemplateRef("picture")

onMounted(() => {
  pictureElement.value.addEventListener("load", () => {
    isLoaded.value = true;
  });
})
</script>

<style lang="scss" scoped src="./VPictureViewerDialog.scss" />
