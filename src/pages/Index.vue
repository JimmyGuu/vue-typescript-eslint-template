<script lang="ts" setup>
import { useDemo } from "@/hooks/useDemo";

const [x, y] = useDemo();
</script>

<template>
  <div>index</div>
  <ul>
    <li>x: {{ x }}</li>
    <li>y: {{ y }}</li>
  </ul>
</template>
