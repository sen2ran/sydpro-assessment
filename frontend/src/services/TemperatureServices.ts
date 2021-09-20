import axios from "axios";
import { useAsyncAwait } from "../utils/asyncAwaitHook";

const baseURL = "http://localhost:3001/api/";

const instance = axios.create({
  baseURL: baseURL,
});

export const GetAllTemperatureDeatils = async () =>
  useAsyncAwait(instance.get(`/temperature`));

export const GetChartByTimeIntervel = async (timeIntervel: string) =>
  useAsyncAwait(instance.get(`/temperature/chart/${timeIntervel}`));

export const AddHexMessage = async (hexPayload: string) =>
  useAsyncAwait(instance.post(`/temperature`, { hexPayload: hexPayload }));
