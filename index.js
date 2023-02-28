import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./routes/UserRoute.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.API_PORT;

app.use(cors());

app.use(bodyParser.json());

app.use(router);

app.listen(port, () => {
  console.log(`Your application run in this port ${port}`);
});
