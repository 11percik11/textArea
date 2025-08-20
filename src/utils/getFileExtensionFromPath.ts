export const getFileExtensionFromPath = (src: string) => {
  if (src[0] === "/") src = src.slice(1);
  return src?.split("/")[1].split(".")[1];
};
