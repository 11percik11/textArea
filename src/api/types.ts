import type { Spreadsheet } from "../types";

export interface ApiResponse<T> {
  status: "success" | "error";
  message: string;
  data: T;
}

export type UpdateContentResponse = ApiResponse<Spreadsheet>;
