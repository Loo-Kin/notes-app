<template>
  <header class="header">
    <img class="header__logo" src="@/assets/img/logo.svg" alt="">

    <v-searchbar class="header__searchbar" v-model="searchString"></v-searchbar>
    <v-button class="btn btn_archive">
      <img src="@/assets/img/icon/box-open.svg" alt="">
      <span>Архив</span>
    </v-button>
  </header>
</template>

<script setup>
import VSearchbar from '@/components/UIElements/Searchbar/VSearchbar.vue';
import VButton from '@/components/UIElements/Button/VButton.vue';
import { ref, watch } from 'vue';

const emit = defineEmits(["search-update"]);

const searchString = ref("");

watch(searchString, (newVal, oldVal) => {
  emit("search-update", newVal, oldVal);
})
</script>

<style lang="scss" scoped src="./VPageHeader.scss" />
