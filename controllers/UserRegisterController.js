import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../db_config/config.js";

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
    const newDocRef = await addDoc(usersRef, {
      name: "user",
      location: "abad",
      useid: user.uid,
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
