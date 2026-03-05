<template>
  <ul class="switch-buttons">
    <li v-for="(variant, variantIdx) in variants" :key="variantIdx">
      <input type="radio"
        :name="`switch-${id}`"
        :id="`switch-${id}-${variantIdx}`"
        :value="variant.name"
        v-model="model">
      <label :for="`switch-${id}-${variantIdx}`">
        <img :src="variant.icon" alt="">
      </label>
    </li>
  </ul>
</template>

<script setup>
import { useId } from 'vue';

const id = useId();
const model = defineModel();

defineProps({
  variants: { type: Array },
});
</script>

<style lang="scss" scoped src="./VSwitchButtons.scss" />
