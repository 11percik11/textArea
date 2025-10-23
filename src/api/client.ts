import axios from "axios";
import { requestManager } from "./shared/requestManager";

export const API_URL = "http://table-of-time.test.itlabs.top/api";
export const FILE_API_URL = "http://table-of-time.test.itlabs.top/";

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const controller = new AbortController();
  config.signal = controller.signal;

  const cancelKey = (config as any).cancelKey || "default";
  // console.log(`config->`, config, cancelKey);
  requestManager.add(cancelKey, controller);
  return config;
});



export default apiClient;
