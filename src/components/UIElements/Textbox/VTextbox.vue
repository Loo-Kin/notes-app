<template>
  <input class="textbox" type="text" :id="`textbox-${id}`" v-model="model">
</template>

<script setup>
  import { useId } from 'vue';

  const id = useId();
  const model = defineModel();
</script>

<style lang="scss" scoped src="./VTextbox.scss" />
