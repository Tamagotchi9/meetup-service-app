import { upload, download } from "@/plugins/firebase";

export const fetchImage = async (fileName, folderName) => {
  try {
    return await download(fileName, folderName);
  } catch (e) {
    throw new Error(e);
  }
};

export const uploadImage = async (file, folderName) => {
  try {
    await upload(file, folderName);
  } catch (e) {
    throw new Error(e);
  }
};
