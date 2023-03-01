import { Router } from "express";
import UserDataController from "../controllers/UserDataController.js";

const router = Router();

router.get("/", (req, res) => {
  res.send({ message: "hello from node" });
});

router.post("/add/user", UserDataController.addUser);
router.get("/get/allUsers", UserDataController.getUsers);
router.get("/get/userby", UserDataController.getUserByID);
router.put("/user/:id", UserDataController.updateUser);
router.delete("/user/:id", UserDataController.deleteUser);

export default router;
