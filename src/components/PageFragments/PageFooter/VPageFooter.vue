<template>
  <footer class="footer">
    <div class="footer__total-notes">
      <p v-if="totalNotes !== null" class="text text-b2">
        Всего заметок: {{ totalNotes }}
      </p>
    </div>
    <div class="footer__user-info">
      <img src="@/assets/img/icon/circle-user-round.svg" alt="">
      <p class="text text-b2">
        notes-app@Kondakova D.D.
      </p>
    </div>
  </footer>
</template>

<script setup>
import { useRequest } from '@/composables/request';
import { ref } from 'vue';

const { request, data } = useRequest('http://127.0.0.1:5000/notes');

const totalNotes = ref(null);

request().then(() => {
  totalNotes.value = data.value.total;
});
</script>

<style lang="scss" scoped src="./VPageFooter.scss" />
