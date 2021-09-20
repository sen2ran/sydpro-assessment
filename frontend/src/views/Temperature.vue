<template>
  <n-form inline :label-width="180" size="large" style="padding: 10px">
    <n-form-item
      label="Name"
      :validation-status="formValue.errorMessage ? 'error' : 'success'"
      :feedback="formValue.errorMessage"
    >
      <n-input
        v-model:value="formValue.hexMessage"
        placeholder="Enter hex Message"
        @keypress="
          () => {
            formValue.errorMessage = '';
          }
        "
      />
    </n-form-item>
    <n-form-item style="padding-left: 10px">
      <n-button @click="OnClick">Validate</n-button>
    </n-form-item>
  </n-form>

  <n-data-table :columns="columns" :data="data" :pagination="pagination" />
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted, ref } from "vue";
import { useMessage } from "naive-ui";

import {
  GetAllTemperatureDeatils,
  AddHexMessage,
} from "../services/TemperatureServices";
import { isHexaNumber } from "../utils/isHexaNumber";

interface IColumn {
  title: string;
  key: string;
  sorter?: (rowA: any, rowB: any) => number;
}

interface IDataTable {
  columns: IColumn[];
  data: any;
  pagination: {
    IColumn: number;
  };
}

export default defineComponent({
  setup() {
    const formValue = ref({
      hexMessage: "",
      errorMessage: "",
    });

    const data: IDataTable = reactive({
      columns: [],
      data: [],
      pagination: {
        IColumn: 10,
      },
    });

    const message = useMessage();
    onMounted(() => {
      GetAllTemperatureCol();
    });

    const GetAllTemperatureCol = async () => {
      const [listData, listErr] = await GetAllTemperatureDeatils();

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
      data.data = listData.data.data;
    };

    const OnClick = async (e: any) => {
      e.preventDefault();
      if (!formValue.value.hexMessage) {
        return (formValue.value.errorMessage = "Please enter the value");
      }

      if (
        !isHexaNumber(formValue.value.hexMessage) ||
        formValue.value.hexMessage.length != 10
      ) {
        return (formValue.value.errorMessage = "Invalid Hex Message");
      }

      const [, hexError] = await AddHexMessage(formValue.value.hexMessage);

      if (hexError) {
        message.error("Invalid hex");
      } else {
        formValue.value.hexMessage = "";
        formValue.value.errorMessage = "";
        GetAllTemperatureCol();
        message.success("Hey Added successfully");
      }

      return null;
    };

    return {
      formValue,
      OnClick,
      ...toRefs(data),
    };
  },
});
</script>
