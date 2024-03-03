const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");

const app = express();

app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    const suffix =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      "-" +
      file.originalname;
    cb(null, suffix);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(
  multer({
    storage,
    fileFilter,
  }).array("image")
);

// router imports
const authRouter = require("./routers/auth");
const productRouter = require("./routers/product");
const adminRouter = require("./routers/admin");
const publicRouter = require("./routers/public");

app.use(authRouter);
app.use(productRouter);
app.use("/admin", adminRouter);
app.use("/api", publicRouter)

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("connected to mongodb");
    app.listen(4000);
  })
  .catch((err) => {
    console.log(err);
  });
