import { app } from "../db_config/ClientConfig.js";
import { getStorage, ref, uploadBytes } from "firebase/storage";

const fileUpload = async (file, filename) => {
  try {
    const storage = getStorage(app);
    const storageref = ref(storage, `profile_pic/${filename}`);
    const result = await uploadBytes(storageref, file);
    return result;
  } catch (error) {
    return error;
  }
};

const FileUploadController = { fileUpload };

export default FileUploadController;
