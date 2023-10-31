import { defineStore, storeToRefs } from "pinia";
import { useOmnis } from "@/stores/omnis.js";
import { computed, toValue } from "vue";

export const defaultHeight = 97;
export const exampleOption = {
  title: {
    text: "Traffic Sources",
    left: "center"
  },
  tooltip: {
    trigger: "item",
    formatter: "{a} <br/>{b} : {c} ({d}%)"
  },
  legend: {
    orient: "vertical",
    left: "left",
    data: ["Direct", "Email", "Ad Networks", "Video Ads", "Search Engines"]
  },
  series: [
    {
      name: "Traffic Sources",
      type: "pie",
      radius: "55%",
      center: ["50%", "60%"],
      data: [
        { value: 335, name: "Direct" },
        { value: 310, name: "Email" },
        { value: 234, name: "Ad Networks" },
        { value: 135, name: "Video Ads" },
        { value: 1548, name: "Search Engines" }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)"
        }
      }
    }
  ]
};

export const useEChartsOption = defineStore("EChartsOption", () => {
  const omnis = useOmnis();
  const { data } = storeToRefs(omnis);

  const option = computed(() => {
    const optionData = toValue(data).option;
    if (optionData == null) {
      // DESIGN MODE: Show example
      return exampleOption;
    }

    try {
      return JSON.parse(optionData);
    } catch (e) {
      return [];
    }
  });

  const height = computed(() => {
    const heightData = toValue(data).height;
    if (heightData == null) {
      // DESIGN MODE: Default height
      return defaultHeight;
    }
    return heightData;
  });

  return { height, option };
});
