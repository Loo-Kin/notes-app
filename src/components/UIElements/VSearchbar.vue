<template>
  <label for="searchbar" class="searchbar">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11 2C15.9706 2 20 6.02944 20 11C20 13.125 19.2619 15.0766 18.0303 16.6162L21.7031 20.2891C22.0936 20.6796 22.0936 21.3126 21.7031 21.7031C21.3126 22.0936 20.6796 22.0936 20.2891 21.7031L16.6162 18.0303C15.0766 19.2619 13.125 20 11 20C6.02944 20 2 15.9706 2 11C2 6.02944 6.02944 2 11 2ZM11 4C7.13401 4 4 7.13401 4 11C4 14.866 7.13401 18 11 18C14.866 18 18 14.866 18 11C18 7.13401 14.866 4 11 4Z"/>
    </svg>
    <input type="text" name="searchbar" id="searchbar" placeholder="Поиск">
  </label>
</template>

<script setup>
</script>

<style lang="scss" scoped>
  .searchbar {
    height: 44px;
    padding: 10px 8px;
    display: flex;
    align-items: center;
    gap: 8px;
    background-color: #E1D9E8;
    border-radius: 50px;
    box-shadow: var(--shadow-card);

    & > svg {
      path {
        fill: var(--black);
      }
    }

    & > input {
      flex-grow: 1;
      padding: 0;
      border: none;
      background-color: transparent;
      font-size: var(--fs-b4);
      line-height: var(--lh-b4);
      color: var(--black);
      outline: none;

      &::placeholder {
        color: var(--black);
      }
    }

    @media screen and (width <= 375px) {
      background-color: transparent;
      border: solid 1px var(--brand-add);
      padding: 11px 15px;
      box-shadow: none;
      flex-direction: row-reverse;
      gap: 8px;

      & > svg {
        path {
          fill: rgba(27, 27, 27, 0.5);
        }
      }

      & > input,
      & > input::placeholder {
        color: var(--black-70);
      }
    }
  }
</style>
