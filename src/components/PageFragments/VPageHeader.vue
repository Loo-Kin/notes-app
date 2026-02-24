<template>
  <header class="header">
    <img class="header__logo" src="@/assets/img/logo.svg" alt="">

    <v-searchbar class="header__searchbar"></v-searchbar>
    <v-button class="btn btn_archive">
      <img src="@/assets/img/icon/box-open.svg" alt="">
      <span>Архив</span>
    </v-button>
  </header>
</template>

<script setup>
  import VSearchbar from '../UIElements/VSearchbar.vue';
  import VButton from '../UIElements/VButton.vue';
</script>

<style lang="scss" scoped>
  .header {
    border-bottom: solid 1px var(--stroke-dark);
    padding-bottom: 40px;
    display: grid;
    grid-template-columns: 170px 1fr 240px;
    justify-content: space-between;
    align-items: center;

    &__logo {
      width: 100%;
    }

    &__searchbar {
      margin: 0 20px 0 196px;
      flex-grow: 1;
    }

    @media screen and (width <= 375px) {
      grid-template-columns: 80px 100px;
      padding-bottom: 16px;
      border-bottom: none;

      &__searchbar {
        grid-column: 1 / 3;
        grid-row: 1;
        margin: 0 0 16px;
      }
    }
  }

  .btn {
    &_archive {
      white-space: nowrap;

      & > * {
        vertical-align: middle;
      }

      & > img {
        display: none;
        width: 24px;
        height: 24px;
      };

      @media screen and (width <= 375px) {
        background-color: var(--stroke-light);
        color: var(--black);
        box-shadow: none;

        & > img {
          display: inline-block;
          margin-right: 6px;
        }
      }
    }
  }
</style>
