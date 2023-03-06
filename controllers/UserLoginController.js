import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../db_config/ClientConfig.js";
import dotenv from "dotenv";
dotenv.config();

const userLogin = async (req, res) => {
  try {
    const userCred = await signInWithEmailAndPassword(
      auth,
      req.body.email,
      req.body.password
    );
    req.session.token = userCred.user.stsTokenManager.accessToken;
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

const userLogout = (req, res) => {
  auth
    .signOut()
    .then(() => {
      req.session.destroy((e) => {
        if (e) {
          res.send(e);
        } else {
          res.clearCookie(process.env.SESSION_COOKIE_NAME);
          return res.status(200).send({ message: "Signed out successfully" });
        }
      });
    })
    .catch((e) => res.send(e));
};

const UserLoginController = {
  userLogin,
  userLogout,
};
export default UserLoginController;
