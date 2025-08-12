import { FILE_API_URL } from "../api/client";

export const getServerMediaUrl = (url: string) => {
  return FILE_API_URL + url;
};
