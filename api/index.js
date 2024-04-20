import express from "express";
import postRoutes from "./routes/posts.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import { sequelize } from "./db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import multer from "multer";
const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);
//! almacenamiento de imagenes\\

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../cliente/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});
const upload = multer({ storage });

app.post("/api/upload", upload.single("fileImg"), function (req, res) {
  const file = req.file;
  res.status(200).json(file.filename);
});

  //! user img\\
const userStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../cliente/public/uploadUserImg");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});
const userUpload = multer({ storage: userStorage });

app.post("/api/uploadUserImg", userUpload.single("userImg"), function (req, res) {
  const file = req.file;
  res.status(200).json(file.filename);
});

app.use(cookieParser());
app.use("/api/posts", postRoutes);
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

async function main() {
  try {
    await sequelize.sync({alter: true});
    app.listen(8800);
    console.log("Connected!!");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}
main();
