import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../db_config/config.js";
import { Users } from "../models/UserDataModal.js";

const usersRef = collection(db, "usersData");

const addUser = async (req, res) => {
  try {
    const data = req.body;
    const newDocRef = await addDoc(usersRef, data);
    if (newDocRef) res.send({ success: "data added successfully" });
    else res.send({ error: "Some unexpected error occur" });
  } catch (error) {
    res.send(error);
  }
};

const getUsers = async (req, res) => {
  try {
    const allUsers = await getDocs(usersRef);
    const allUsersary = [];
    if (!allUsers.empty) {
      allUsers.forEach((doc) => {
        const user = new Users(
          doc.id,
          doc.data().name,
          doc.data().dob,
          doc.data().address
        );
        allUsersary.push(user);
      });
      res.send(allUsersary);
    } else {
      res.send({ error: "Some unexpected error occur" });
    }
  } catch (error) {
    res.send(error);
  }
};

const getUserByID = async (req, res) => {
  try {
    let id = req.body.id;
    const userDocRef = doc(db, "usersData", id);
    const user = await getDoc(userDocRef);
    if (!user.empty) {
      const data = new Users(
        user.id,
        user.data().name,
        user.data().dob,
        user.data().address
      );
      res.send(data);
    } else {
      res.send({ error: "Some unexpected error occur" });
    }
  } catch (error) {
    res.send(error);
  }
};

const updateUser = async (req, res) => {
  try {
    let id = req.params.id;
    const userDocRef = doc(db, "usersData", id);
    await updateDoc(userDocRef, req.body);
    res.send({ success: "data updated successfully" });
  } catch (error) {
    res.send(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    let id = req.params.id;
    const userDocRef = doc(db, "usersData", id);
    await deleteDoc(userDocRef);
    res.send({ success: "data deleted successfully" });
  } catch (error) {
    res.send(error);
  }
};

const UserDataController = {
  addUser,
  getUsers,
  getUserByID,
  updateUser,
  deleteUser,
};

export default UserDataController;
