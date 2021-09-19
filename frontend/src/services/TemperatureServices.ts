import axios from "axios";
import { useAsyncAwait } from "../utils/asyncAwaitHook";

const baseURL = "http://localhost:8081/api/";

const instance = axios.create({
  baseURL: baseURL,
});

export const GetAllTemperatureDeatils = async () =>
  useAsyncAwait(instance.get(`/temperature`));

export const GetChartByTimeIntervel = async (timeIntervel: number) =>
  useAsyncAwait(instance.get(`/temperature/chart/${timeIntervel}`));
