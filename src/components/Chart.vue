<script setup>
import VChart from "vue-echarts";
import { computed } from "vue";
import { defaultHeight } from "@/stores/echarts.js";

const { height, option, theme } = defineProps({ height: Number, option: Object, theme: String });
const cssHeight = computed(() => (height != null ? `${height}vh` : `${defaultHeight}vh`));
</script>

<template>
  <VChart class="chart" :option="option" :theme="theme" autoresize />
</template>

<style scoped>
.chart {
  height: v-bind(cssHeight);
}
</style>
