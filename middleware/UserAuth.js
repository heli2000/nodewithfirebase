import admin from "../db_config/AdminConfig.js";

const athenticateUserBySessionToken = (req, res, next) => {
  if (req.session.token === undefined) {
    res.send({ error: "token is not valid or expired" });
  } else {
    admin
      .auth()
      .verifyIdToken(req.session.token)
      .then(() => next())
      .catch((e) => res.send(e));
  }
};

const UserAuth = {
  athenticateUserBySessionToken,
};

export default UserAuth;
