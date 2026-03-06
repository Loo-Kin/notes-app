<template>
  <div class="page-wrapper">
    <v-page-header @search-update="onSearchUpdate"></v-page-header>

    <router-view />

    <v-page-footer></v-page-footer>
  </div>
</template>

<script setup>
import VPageHeader from './components/PageFragments/PageHeader/VPageHeader.vue';
import VPageFooter from './components/PageFragments/PageFooter/VPageFooter.vue';
import { provide, ref } from 'vue';

const currentSearch = ref("");

provide("currentSearch", currentSearch)

const onSearchUpdate = function (newVal) {
  currentSearch.value = newVal;
}
</script>

<style lang="scss" scoped>
.page-wrapper {
  margin: 0 auto;
  padding: 60px 16px;
  max-width: calc(1444px + 16px * 2);
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &>main {
    flex-basis: 100%;
  }

  @media screen and (width <=375px) {
    padding: 16px;
  }
}
</style>
