<template>
  <ul class="switch-buttons">
    <li>
      <input type="radio" name="switch-1" id="switch-1" checked>
      <label for="switch-1">
        <img src="@/assets/img/icon/view-icon-square.svg" alt="">
      </label>
    </li>
    <li>
      <input type="radio" name="switch-1" id="switch-2">
      <label for="switch-2">
        <img src="@/assets/img/icon/view-icon-list.svg" alt="">
      </label>
    </li>
  </ul>
</template>

<script setup>
</script>

<style lang="scss" scoped>
  .switch-buttons {
    list-style: none;
    margin: 32px 0 24px;
    display: flex;
    justify-content: flex-end;
    gap: 16px;

    & > li {
      input[type="radio"] {
        display: none;

        & + label {
          display: block;
          width: 40px;
          height: 40px;
          display: flex;
          justify-content: center;
          align-items: center;
          border: solid 1px var(--brand-light);
          border-radius: 10px;
          cursor: pointer;
          transition: 0.3s;
        }

        &:checked {
          & + label {
            background-color: var(--brand-light);
          }
        }
      }
    }

    @media screen and (width <= 375px) {
      display: none;
    }
  }
</style>
