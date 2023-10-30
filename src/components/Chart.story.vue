<script setup>
import { defaultHeight, exampleOption } from "@/stores/echarts.js";
import Chart from "@/components/Chart.vue";
import { ref } from "vue";

const height = ref(defaultHeight);
const option = ref(exampleOption);
</script>

<template>
  <Story auto-props-disabled>
    <Chart :height="height" :option="option" />

    <template #controls>
      <HstNumber title="Height" v-model="height" />
      <HstJson title="Options" v-model="option" />
    </template>
  </Story>
</template>

<style scoped></style>
