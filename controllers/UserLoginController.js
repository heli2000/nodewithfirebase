import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../db_config/config.js";

const auth = getAuth(app);

const userLogin = async (req, res) => {
  try {
    const userCred = await signInWithEmailAndPassword(
      auth,
      req.body.email,
      req.body.password
    );
    res.send(userCred.user);
  } catch (error) {
    res.send(error);
  }
};

/*const userLoginWithGoogle = async (req, res) => {
  try {
    const provider = new GoogleAuthProvider();
    console.log(auth);
    // provider.addScope("https://www.googleapis.com/auth");
    console.log(provider);
    const userCred = await signInWithPopup(auth, provider);
    const userData = userCred.user;
    res.send(userData);
  } catch (error) {
    res.send(error);
  }
};*/

const UserLoginController = {
  userLogin,
};
export default UserLoginController;
