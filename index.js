import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./routes/UserDataRoute.js";
import fileUpload from "express-fileupload";
import dotenv from "dotenv";
import session from "express-session";
dotenv.config();

const app = express();
const port = process.env.API_PORT;

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN,
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET_KEY,
    name: process.env.SESSION_COOKIE_NAME,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24, httpOnly: true },
    resave: false,
  })
);

//for samesite and proxy urls
app.set("trust proxy", 1);

app.use(bodyParser.json());

app.use(fileUpload());

app.use(router);

app.listen(port, () => {
  console.log(
    `Your application is running on ${process.env.API_URL}:${process.env.API_PORT}`
  );
});
