export function base64ToBlob(base64: string): Blob {
  const [meta, data] = base64.split(",");
  const mime = meta.match(/:(.*?);/)?.[1] || "application/octet-stream";
  const binary = atob(data);
  const array = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    array[i] = binary.charCodeAt(i);
  }
  return new Blob([array], { type: mime });
}

// export function base64ToFile(base64: string, filename: string): File {
//   const blob = base64ToBlob(base64);
//   return new File([blob], filename, { type: blob.type });
// }

// export async function fileToBlob(file: File): Promise<Blob> {
//   return new Blob([await file.arrayBuffer()], {
//     type: file.type || "application/octet-stream",
//   });
// }
