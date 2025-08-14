export const getFileExtensionFromPath = (src: string) => {
  return src.split("/")[1].split(".")[1];
};
