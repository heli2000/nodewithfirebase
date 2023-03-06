import { booleanPointInPolygon } from "@turf/turf";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { auth, db } from "../db_config/ClientConfig.js";
import FileUploadController from "./FileUploadController.js";

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
    let locationId;

    await addDoc(usersRef, {
      name: req.body.name,
      uid: user.uid,
      profile_path: imgPath !== undefined ? imgPath : "",
    });

    if (req.body.location) {
      locationId = await spatialJSONDataStore(req.body.location, user.uid);
    }

    res.send({ message: "user added successfully" });
  } catch (error) {
    res.send(error);
  }
};

const spatialJSONDataStore = async (data, id) => {
  try {
    const feature = JSON.parse(data);
    if (feature) {
      let featureData = {
        uid: id,
        spatial: { ...feature },
      };
      const polyref = collection(db, "userLocation");
      const newData = await addDoc(polyref, featureData);
      return newData;
    }
  } catch (error) {
    return error;
  }
};

const getAllUserFromLocation = async (req, res) => {
  try {
    const polyref = collection(db, "userLocation");
    const users = await getDocs(polyref);

    const wkt = JSON.parse(req.body.wkt);
    const intersectUser = [];

    users.forEach((e) => {
      const intersect = booleanPointInPolygon(
        e.data().spatial.features[0].geometry,
        wkt.features[0].geometry
      );
      if (intersect) intersectUser.push(e.data().uid);
    });

    res.send(intersectUser);
  } catch (error) {
    res.send(error);
  }
};

const UserRegisterController = {
  userRegisterWithEmailPassword,
  getAllUserFromLocation,
};

export default UserRegisterController;
