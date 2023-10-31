<script setup>
import { ref } from "vue";
import { defaultHeight, exampleOption } from "@/stores/echarts.js";
import Chart from "@/components/Chart.vue";
import { themes } from "@/themes/index.js";

const height = ref(defaultHeight);
const option = ref(exampleOption);
const theme = ref("default");
</script>

<template>
  <Story auto-props-disabled>
    <Chart :height="height" :option="option" :theme="theme" />

    <template #controls>
      <HstNumber title="Height" v-model="height" />
      <HstJson title="Options" v-model="option" />
      <HstSelect title="Theme" v-model="theme" :options="themes" />
    </template>
  </Story>
</template>

<style scoped></style>
