import { ref } from "vue";

export function useDebounceFn() {
  const lastCall = ref(null);
  const lastCallTimer = ref(null);

  function debounce(callee, timeoutMs = 250) {
    return function perform(...args) {
      let previousCall = lastCall.value;

      lastCall.value = Date.now();

      if (previousCall && lastCall.value - previousCall <= timeoutMs) {
        clearTimeout(lastCallTimer.value);
      }

      lastCallTimer.value = setTimeout(() => callee(...args), timeoutMs)
    }
  }

  return { debounce }
}
