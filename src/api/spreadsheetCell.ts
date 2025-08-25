import type { LocalFileMedia } from "../pages/CellEditPage/hooks";
import type { Cell, FileType } from "../types";
import { base64ToBlob } from "../utils/fileTypeConversion";
import apiClient, { API_URL } from "./client";
import type { UpdateCellVariantResponse } from "./types";

export const updateCellVariant = async (
  cellId: number,
  variant: Cell["type"],
): Promise<UpdateCellVariantResponse> => {
  const res = await apiClient.post<UpdateCellVariantResponse>(
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

export const addCellDocument = async (
  media: LocalFileMedia,
  cellId: number,
): Promise<{
  file: { id: number; url: string; sequence?: number };
} | null> => {
  console.log(`output->'media'`, media);
  const formData = new FormData();
  const blobFile = base64ToBlob(media.url);

  formData.append("file", blobFile, media.title);
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

export const addCellImage = async (
  media: LocalFileMedia,
  cellId: number,
): Promise<any> => {
  console.log(`output->'media'`, media);
  const formData = new FormData();
  const blobFile = base64ToBlob(media.url);

  formData.append("image", blobFile, media.title);
  try {
    const response = await fetch(`${API_URL}/cell/add-image?cellId=${cellId}`, {
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
    return result.image;
  } catch (error) {
    console.error("Error posting spreadsheet cell:", error);
    return null;
  }
};

export const deleteCellDocument = async (
  fileId: number,
): Promise<DeleteResponse> => {
  const res = await apiClient.delete<DeleteResponse>(`/cell/files`, {
    params: { fileId },
  });
  return res.data;
};

export const deleteCellImage = async (
  imageId: number,
): Promise<DeleteResponse> => {
  const res = await apiClient.delete<DeleteResponse>(`/cell/images`, {
    params: { imageId },
  });
  return res.data;
};
