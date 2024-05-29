import express from "express";
import postRoutes from "./routes/posts.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import { sequelize } from "./db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import multer from "multer";
import {FRONTEND_URL} from './config.js'
const port = process.env.PORT || 4000;
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: FRONTEND_URL,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);
//! almacenamiento de imagenes\\
const UPLOAD_BLOG = path.join(__dirname, '../cliente/public/upload');
// Servir archivos estáticos
app.use('/upload', express.static(UPLOAD_BLOG));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_BLOG);
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
const UPLOAD_DIR = path.join(__dirname, '../cliente/public/uploadUserImg');
// Servir archivos estáticos
app.use('/uploadUserImg', express.static(UPLOAD_DIR));
 
const userStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_DIR);
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
    app.listen(port, () => {
      console.log(`Conected!! app listening on port ${port}`)
    })
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}
main();
