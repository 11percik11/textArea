import axios from "axios";

export const API_URL = "http://table-of-time.test.itlabs.top/api";

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default apiClient;
