import apiClient from "./client";

export const updateRowColor = async (
  rowId: number,
  color: string,
): Promise<any> => {
  const res = await apiClient.post<any>(`/cell/edit-color`, null, {
    params: { rowId, color },
  });
  return res.data;
};
