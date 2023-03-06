import { Router } from "express";
import FileUploadController from "../controllers/FileUploadController.js";
import UserDataController from "../controllers/UserDataController.js";
import UserLoginController from "../controllers/UserLoginController.js";
import UserRegisterController from "../controllers/UserRegisterController.js";
import Check from "../middleware/Check.js";
import UserAuth from "../middleware/UserAuth.js";

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
router.post(
  "/user/login",
  Check.isAlreadySignedIn,
  UserLoginController.userLogin
);

router.post("/profile/photo", FileUploadController.fileUpload);

router.post(
  "/user/location",
  UserAuth.athenticateUserBySessionToken,
  UserRegisterController.getAllUserFromLocation
);

router.get("/user/auth", UserAuth.athenticateUserBySessionToken);

router.get("/user/logout", Check.isSignedIn, UserLoginController.userLogout);
export default router;
