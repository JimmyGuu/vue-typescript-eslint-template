<script setup lang="ts">
import { useDemoStore } from "@/stores/demo";
import { computed } from "vue";
import Demo from "@/components/Demo.vue";

const store = useDemoStore();

const count = computed(() => store.count);
const doubleCount = computed(() => store.doubleCount);
</script>

<template>
  <div>App</div>
  <div>count:<Demo :msg="count" /></div>
  <div>doubleCount:{{ doubleCount }}</div>
  <button type="button" @click="store.increment">increment</button>

  <div class="content">
    <router-view />
  </div>
</template>

<style lang="scss" scoped></style>
