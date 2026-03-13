<template>
  <div class="text-formatted">
    <p v-for="(paragraph, paragraphIdx) in splitParagraphs" :key="paragraphIdx" class="text text-b2">
      <template v-for="(part, index) in splitLinks(paragraph)" :key="index">
        <!-- Если часть текста - ссылка, рендерим как компонент ссылки -->
        <a v-if="part.isLink" :href="part.text" target="_blank" rel="noopener noreferrer" class="text-link">
          {{ part.text }}
        </a>
        <template v-else>
          <template v-for="(tabPart, tabIndex) in splitTabs(part.text)" :key="tabIndex">
            <pre v-if="tabIndex !== 0">&#9;</pre>
            <span v-if="tabPart.length > 0">{{ tabPart }}</span>
          </template>
        </template>
      </template>
    </p>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  text: { type: String }
});

/**
 * Разбить текст на абзацы
 */
const splitParagraphs = computed(() => {
  return props.text.split(/\r\n|\n/g);
});

/**
 * Выделить гиперссылки в абзаце
 * @param entryText Абзац текста
 */
const splitLinks = (entryText) => {
  if (!entryText) return [];

  // Регулярное выражение для поиска URL
  const urlRegex = /https?:\/\/[^\s<>"{}|\\^`[\]]+/gi;

  const parts = [];
  let lastIndex = 0;
  let match;

  // Создаем копию regex для безопасного использования
  const regex = new RegExp(urlRegex);

  while ((match = regex.exec(entryText)) !== null) {
    // Добавляем текст перед ссылкой
    if (match.index > lastIndex) {
      parts.push({
        text: entryText.substring(lastIndex, match.index),
        isLink: false
      });
    }

    // Добавляем ссылку
    let url = match[0];
    // Добавляем протокол, если его нет
    if (!url.match(/^https?:\/\//i)) {
      url = 'http://' + url;
    }

    parts.push({
      text: match[0],
      url: url,
      isLink: true
    });

    lastIndex = match.index + match[0].length;
  }

  // Добавляем оставшийся текст
  if (lastIndex < entryText.length) {
    parts.push({
      text: entryText.substring(lastIndex),
      isLink: false
    });
  }

  return parts;
};

/**
 * Разбить текст символами табуляции
 * @param entryText Абзац текста
 */
const splitTabs = (entryText) => {
  return entryText.split(/\t/g);
}

</script>

<style lang="scss" scoped src="./VTextFormatted.scss" />
