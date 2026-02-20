<template>
  <button @click="handleClick" ref="btn">
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

let rippleEffectActive = ref(false);

const handleClick = async function () {
  rippleEffectActive.value = false;
  emit('click');

  await nextTick();

  rippleEffectActive.value = true;

  await nextTick();

  rippleElement.value.addEventListener('animationend', () => {
    rippleEffectActive.value = false;
  }, {once: true});
}
</script>

<style lang="scss">
.btn {
  position: relative;
  min-height: 44px;
  border: none;
  padding: 9px 16px;
  font-size: var(--fs-b3);
  line-height: var(--lh-b3);
  color: #FFF;
  font-weight: 500;
  background-color: var(--brand);
  border-radius: 50px;
  box-shadow: var(--shadow-btn);
  overflow: hidden;
  cursor: pointer;
  transition: 0.3s;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background-color: var(--brand-add);
    opacity: 0;
    transition: 0.3s;
    pointer-events: none;
  }

  @media (hover: hover) {
    &:hover {
      box-shadow: var(--shadow-btn), var(--shadow-btn);
      &::before {
        opacity: 0.25;
      }
    }
  }

  &__ripple-effect {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    aspect-ratio: 1 / 1;
    background-color: var(--brand-light);
    border-radius: 50%;
    animation: ripple 0.3s forwards;
    pointer-events: none;
  }

  @media screen and (width <= 375px) {
    padding: 6px 12px;
    min-width: 0;
  }

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

@keyframes ripple {
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0);
  }

  30% {
    opacity: 0.5;
  }

  100% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(1);
  }
}
</style>
