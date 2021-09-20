<template>
  <n-space vertical>
    <n-select
      v-model:value="value"
      :options="options"
      placeholder="Select Time Intervals"
    />
  </n-space>
  <Chart :chartData="chartData" :key="reRenderKey" />
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted, watch } from "vue";

import { GetChartByTimeIntervel } from "../services/TemperatureServices";
import Chart from "../components/Chart/Chart.vue";

export default defineComponent({
  components: {
    Chart,
  },
  setup() {
    const data: any = reactive({
      options: [],
      value: null,
      chartData: {},
      reRenderKey: Number(new Date()),
    });

    onMounted(async () => {
      data.options = Array.from(Array(11).keys()).map((x) => {
        return {
          label: `${x + 1} Hours`,
          value: x + 1,
        };
      });

      const [chartData, chartErr] = await GetChartByTimeIntervel(1);
      data.chartData.value = chartData.data.data.data;
      data.chartData.labels = chartData.data.data.labels;
      data.reRenderKey = Number(new Date());
    });

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
