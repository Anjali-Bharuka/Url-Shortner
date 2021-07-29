import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import morgan from "morgan";

var compression = require("compression");

import authRoutes from "./routes/authRoutes";
import urlRoutes from "./routes/urlRoutes";
import env from "./config";

const app = express();

const mongoConnectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  keepAlive: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

app.use(cors());
app.use(morgan("dev"));
app.use(compression());
app.use(express.json());
app.use("", [authRoutes ,urlRoutes]);

mongoose
  .connect(env.DB_URL, mongoConnectOptions)
  .then(() => {
    console.log("Successfully connect to MongoDB.");
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
});

app.listen(env.PORT, () => {
  console.log(`Server is running at http://127.0.0.1:${env.PORT}`);
});
