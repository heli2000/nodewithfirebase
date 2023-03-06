import admin from "../db_config/AdminConfig.js";

const isAlreadySignedIn = (req, res, next) => {
  if (req.session.token !== undefined) {
    admin
      .auth()
      .verifyIdToken(req.session.token)
      .then(() =>
        res.send({ message: "this url can be access by annonymous user only" })
      )
      .catch(() => next());
  } else {
    next();
  }
};

const isSignedIn = (req, res, next) => {
  if (req.session.token === undefined) {
    res.send({ message: "session already expired" });
  } else {
    next();
  }
};

const Check = {
  isAlreadySignedIn,
  isSignedIn,
};

export default Check;
