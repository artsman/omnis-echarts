<script setup>
import { useEChartsOption } from "@/stores/echarts.js";
import { storeToRefs } from "pinia";
import Chart from "@/components/Chart.vue";

const store = useEChartsOption();
const { height, option } = storeToRefs(store);
</script>

<template>
  <Chart :height="height" :option="option" />
</template>
