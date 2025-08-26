import type { Spreadsheet } from "../types";
import apiClient from "./client";
import type { UpdateContentResponse } from "./types";

export const postSpreadsheet = async (cellId: number) => {
  try {
    const response = await apiClient.post(`/spreadsheets?cell=${cellId}`, {});
    return response.data as Spreadsheet;
  } catch (error) {
    console.error("Error posting spreadsheet cell:", error);
    return null;
    throw error;
  }
};

export const getSpreadsheets = async () => {
  try {
    const res = await apiClient.get(`/spreadsheets`, {
      cancelKey: "getSpreadsheets",
    });
    return res.data as Spreadsheet[];
  } catch (error) {}
};

export const getOneSpreadsheet = async (spreadsheetId: number) => {
  try {
    const res = await apiClient.get(`/spreadsheets`, {
      params: {
        spreadsheetId,
      },
    });
    return res.data as Spreadsheet;
  } catch (error) {}
};

export const getSpreadsheetsNavigation = async (spreadsheetId: number) => {
  try {
    const res = await apiClient.get(`/spreadsheets/navigate`, {
      params: {
        spreadsheetId,
      },
    });
    return res.data as Spreadsheet;
  } catch (error) {}
};

interface MoveSpreadsheetContentPositionsParams {
  spreadsheetId: number;
  isRow: boolean; // true → move rows, false → move columns
  first: number; // sequence of first element
  second: number; // sequence of second element
}

export const moveSpreadsheetContentPositions = async ({
  spreadsheetId,
  isRow,
  first,
  second,
}: MoveSpreadsheetContentPositionsParams): Promise<UpdateContentResponse> => {
  try {
    const res = await apiClient.get<UpdateContentResponse>(
      `/spreadsheets/move`,
      {
        params: {
          spreadsheetId,
          isRow,
          first,
          second,
        },
      },
    );
    return res.data;
  } catch (error) {
    console.error("Failed to move spreadsheet content positions:", error);
    throw error;
  }
};

export const removeSpreadsheetContent = async (
  spreadsheetId: number,
  isRow: boolean,
  sequence: number,
): Promise<UpdateContentResponse> => {
  const res = await apiClient.get<UpdateContentResponse>(
    `/spreadsheets/content`,
    {
      params: {
        spreadsheetId,
        isRow,
        sequence,
      },
    },
  );

  return res.data;
};

export const addSpreadsheetContent = async (
  spreadsheetId: number,
  isRow: boolean,
): Promise<UpdateContentResponse> => {
  const res = await apiClient.post<UpdateContentResponse>(
    `/spreadsheets/add-content`,
    {},
    {
      params: {
        spreadsheetId,
        isRow,
      },
    },
  );

  return res.data;
};

export const addSpreadsheetTimeline = async (
  spreadsheetId: number,
): Promise<UpdateContentResponse> => {
  const res = await apiClient.post<UpdateContentResponse>(
    `/spreadsheets/add-timeline`,
    {},
    {
      params: {
        spreadsheetId,
      },
    },
  );

  return res.data;
};
