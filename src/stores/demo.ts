import { defineStore } from "pinia";
import { computed, ref } from "vue";

// ref()s become state properties
// computed()s become getters
// function()s become actions
export const useDemoStore = defineStore("demo", () => {
  const count = ref(0);
  const doubleCount = computed(() => count.value * 2);
  function increment() {
    count.value++;
  }

  return { count, doubleCount, increment };
});
