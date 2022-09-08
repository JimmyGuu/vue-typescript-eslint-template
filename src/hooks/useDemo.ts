import { onMounted, onUnmounted, ref } from "vue";

export function useDemo() {
  const x = ref(0);
  const y = ref(0);

  const onMouse = (e: MouseEvent) => {
    x.value = e.offsetX;
    y.value = e.offsetY;
  };

  onMounted(() => {
    document.addEventListener("mousemove", onMouse);
  });

  onUnmounted(() => {
    document.removeEventListener("mousemove", onMouse);
  });

  return [x, y];
}
