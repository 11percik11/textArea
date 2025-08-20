import type { LocalFileMedia } from "../pages/CellEditPage/hooks";
import type { Cell, FileType } from "../types";
import { base64ToBlob } from "../utils/fileTypeConversion";
import apiClient, { API_URL } from "./client";

export const updateCellVariant = async (
  cellId: number,
  variant: Cell["type"],
): Promise<any> => {
  const res = await apiClient.post<any>(
    `/cell/edit-type`,
    {
      type: variant,
    },
    {
      params: {
        cellId,
      },
    },
  );

  return res.data;
};

export const updateCellContent = async (
  cellId: number,
  payload: {
    title: string;
    description: string;
  },
): Promise<any> => {
  const res = await apiClient.post<any>(`/cell/edit-content`, payload, {
    params: {
      cellId,
    },
  });

  return res.data;
};

export const addCellFile = async (
  media: LocalFileMedia,
  cellId: number,
): Promise<any> => {
  console.log(`output->'media'`, media);
  const formData = new FormData();
  const blobFile = base64ToBlob(media.image);

  formData.append("image", blobFile, media.title);
  try {
    const response = await fetch(`${API_URL}/cell/add-file?cellId=${cellId}`, {
      method: "POST",
      body: formData,
      headers: {
        accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error posting spreadsheet cell:", error);
    return null;
  }
};
