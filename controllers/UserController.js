import { addDoc, collection } from "firebase/firestore";
import { db } from "../db_config/config.js";
import { Users } from "../models/UserModal.js";

export const addUser = async (req,res) => {
    try {
        const data = req.body;
        console.log(data);
        const usersRef = collection(db, 'users');
        const newDocRef = await addDoc(usersRef, data);
        // await db.collection('users').doc().set(data);
        res.send(newDocRef);
    } catch (error) {
        res.send(error);
    }
};
