<template>
  <button :disabled="disabled" @click="handleClick" ref="btn">
    <div ref="rippleEffect" v-if="rippleEffectActive" class="btn__ripple-effect"></div>
    <slot>
      Button
    </slot>
  </button>
</template>

<script setup>
import { nextTick, ref, useTemplateRef } from 'vue';

const emit = defineEmits(['click']);
const rippleElement = useTemplateRef('rippleEffect');

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  disabled: { type: Boolean, default: false },
});

let rippleEffectActive = ref(false);

const handleClick = async function () {
  rippleEffectActive.value = false;
  emit('click');

  await nextTick();

  rippleEffectActive.value = true;

  await nextTick();

  if (rippleElement.value) {
    rippleElement.value.addEventListener('animationend', () => {
      rippleEffectActive.value = false;
    }, { once: true });
  }
}
</script>

<style lang="scss" scoped src="./VButton.scss" />
