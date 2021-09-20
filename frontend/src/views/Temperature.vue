<template>
  <n-data-table :columns="columns" :data="data" :pagination="pagination" />
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from "vue";

import { GetAllTemperatureDeatils } from "../services/TemperatureServices";

export default defineComponent({
  setup() {
    const data: any = reactive({
      columns: [],
      data: [],
      pagination: {
        pageSize: 10,
      },
    });

    onMounted(() => {
      GetAllTemperatureCol();
    });

    const GetAllTemperatureCol = async () => {
      const [
        {
          data: { data: listData },
        },
        listErr,
      ] = await GetAllTemperatureDeatils();

      if (listErr) {
        return listErr;
      }

      data.columns = [
        {
          title: "Date",
          key: "date",
          sorter(rowA: any, rowB: any) {
            return +new Date(rowA.time) - +new Date(rowB.time);
          },
        },
        {
          title: "Temperature",
          key: "temperature",
          sorter(rowA: any, rowB: any) {
            return rowA.temperature - rowB.temperature;
          },
        },
        {
          title: "Big Endian Message",
          key: "bigEndianMessage",
        },
      ];
      data.data = listData;
    };

    return {
      ...toRefs(data),
    };
  },
});
</script>
