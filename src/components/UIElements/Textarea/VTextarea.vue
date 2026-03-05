<template>
  <textarea class="textarea" :id="`textarea-${id}`" v-model="model"></textarea>
</template>

<script setup>
  import { useId } from 'vue';

  const id = useId();
  const model = defineModel();
</script>

<style lang="scss" scoped src="./VTextarea.scss" />
