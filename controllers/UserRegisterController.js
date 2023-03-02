import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../db_config/config.js";
import FileUploadController from "./FileUploadController.js";

const auth = getAuth();
const usersRef = collection(db, "usersData");

const userRegisterWithEmailPassword = async (req, res) => {
  try {
    const userCreds = await createUserWithEmailAndPassword(
      auth,
      req.body.email,
      req.body.password
    );
    const user = userCreds.user;
    let imgPath;
    if (req.files.profile) {
      const uploadedFile = await FileUploadController.fileUpload(
        req.files.profile.data,
        req.files.profile.name
      );
      imgPath = uploadedFile.metadata.fullPath;
    }
    const newDocRef = await addDoc(usersRef, {
      name: req.body.name,
      location: req.body.location,
      useid: user.uid,
      profile_path: imgPath !== undefined ? imgPath : "",
    });
    res.send(newDocRef);
  } catch (error) {
    res.send(error);
  }
};

const UserRegisterController = {
  userRegisterWithEmailPassword,
};

export default UserRegisterController;
