import { Router } from "express";
import UserDataController from "../controllers/UserDataController.js";
import UserLoginController from "../controllers/UserLoginController.js";
import UserRegisterController from "../controllers/UserRegisterController.js";

const router = Router();

router.get("/", (req, res) => {
  res.sendFile("E:/Heli Projects/nodewithfirebase/View/test.html");
});

router.post("/add/user", UserDataController.addUser);
router.get("/get/allUsers", UserDataController.getUsers);
router.get("/get/userby", UserDataController.getUserByID);
router.put("/user/:id", UserDataController.updateUser);
router.delete("/user/:id", UserDataController.deleteUser);
router.post(
  "/user/register",
  UserRegisterController.userRegisterWithEmailPassword
);
router.post("/user/login", UserLoginController.userLogin);
// router.get("/user/login/google", UserLoginController.userLoginWithGoogle);

export default router;
