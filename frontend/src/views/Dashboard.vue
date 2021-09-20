<template>
  <n-space vertical>
    <n-radio-group
      v-model:value="value"
      name="left-size"
      style="margin-bottom: 12px"
    >
      <n-radio-button
        :value="singleOption.value"
        v-for="(singleOption, index) in options"
        :key="index"
        >{{ singleOption.label }}</n-radio-button
      >
    </n-radio-group>
  </n-space>
  <Chart :chartData="chartData" :key="reRenderKey" />
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted, watch } from "vue";
import { useMessage } from "naive-ui";

import { GetChartByTimeIntervel } from "../services/TemperatureServices";
import Chart from "../components/Chart/Chart.vue";

/**
 * Adding Interface for type checking
 */
interface IOptions {
  label: string;
  value: number;
}

interface IChart {
  options: Array<IOptions>;
  value: string;
  chartData: any;
  reRenderKey: number;
}

export default defineComponent({
  components: {
    Chart,
  },
  setup() {
    const message = useMessage();

    const data: IChart = reactive({
      options: [],
      value: "12",
      chartData: {},
      reRenderKey: Number(new Date()),
    });

    onMounted(async () => {
      data.options = Array.from(Array(12).keys()).map((x) => {
        return {
          label: `${x + 1} Hours`,
          value: x + 1,
        };
      });

      /**
       *Defult value set as 12hr
       */
      const [chartData, chartErr] = await GetChartByTimeIntervel("12");
      if (chartErr) {
        message.error("Something went wrong");
      }
      data.chartData.value = chartData.data.data.data;
      data.chartData.labels = chartData.data.data.labels;
      data.reRenderKey = Number(new Date());
    });

    /**
     * When Value change get the chart data from backend
     */
    watch(
      () => data.value,
      async (count) => {
        const [chartData, chartErr] = await GetChartByTimeIntervel(count);
        data.chartData.value = chartData.data.data.data;
        data.chartData.labels = chartData.data.data.labels;
        data.reRenderKey = Number(new Date());
      }
    );

    return {
      ...toRefs(data),
    };
  },
});
</script>
