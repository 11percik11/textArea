import type { Cell, FileType, ImageType, Spreadsheet } from "../types";
import { base64ToBlob } from "../utils/fileTypeConversion";
import apiClient, { API_URL } from "./client";
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

type PostSpreadsheetCellPayload = {
  id: number;
  title?: string;
  description?: string;
  type?: string;
  keep_images: string[];
  keep_files: string[];
  images: string[];
  files: string[];
};

type PostSpreadsheetCellArgs = {
  cell: Cell;
  titleValue: string;
  textBlockValue: string;
  selectedTemplate: string;
  imageFiles: ImageType[];
  documentFiles: FileType[];
  keepImageFiles: number[];
  keepDocumentFiles: number[];
};

// export const postSpreadsheetCell = async (data: PostSpreadsheetCellArgs) => {
//   const formData = new FormData();
//   formData.append("id", data?.cell?.id?.toString() || "");
//   formData.append("title", data.titleValue || "");
//   formData.append("description", data.textBlockValue || "");
//   formData.append("type", data.selectedTemplate);

//   data.imageFiles.forEach((media, index) => {
//     const blobFile = base64ToBlob(media.image);
//     console.log("output file ->", blobFile);
//     const filename = `image-${index + 1}`;
//     formData.append("images", blobFile, filename);
//   });

//   data.documentFiles.forEach((media, index) => {
//     console.log("output  DOCmedia ->", media);
//     const blobFile = base64ToBlob(media.image);
//     const filename = `document-${index + 1}`;
//     formData.append("files", blobFile, filename);
//   });

//   formData.append("keep_images", data.keepImageFiles?.toString());
//   formData.append("keep_files", data.keepDocumentFiles?.toString());
//   formData.append("files", "");

//   console.log(`output->formData`, Object.fromEntries(formData));

//   try {
//     const response = await fetch(`${API_URL}/cells`, {
//       method: "POST",
//       body: formData,
//       headers: {
//         accept: "application/json",
//         // ❌ Do NOT set Content-Type manually for FormData — browser will set it
//       },
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error ${response.status}`);
//     }

//     const result: Spreadsheet = await response.json();
//     return result;
//   } catch (error) {
//     console.error("Error posting spreadsheet cell:", error);
//     return null;
//   }
// };

export const getSpreadsheets = async () => {
  try {
    const res = await apiClient.get(`/spreadsheets`);
    return res.data as Spreadsheet[];
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
