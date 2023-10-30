<script setup>
import VChart from "vue-echarts";
import { computed } from "vue";
import { defaultHeight } from "@/stores/echarts.js";
const { height, option } = defineProps({ height: Number, option: Object });
const cssHeight = computed(() => (height != null ? `${height}vh` : `${defaultHeight}vh`));
</script>

<template>
  <VChart class="chart" :option="option" autoresize />
</template>

<style scoped>
.chart {
  height: v-bind(cssHeight);
}
</style>
