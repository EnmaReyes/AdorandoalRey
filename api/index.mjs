import express from "express";
import postRoutes from "./routes/posts.mjs";
import authRoutes from "./routes/auth.mjs";
import userRoutes from "./routes/users.mjs";
import { sequelize } from "./db.mjs";
import cors from "cors";
import cookieParser from "cookie-parser";
import { FRONTEND_URL } from "./config.mjs";
const port = process.env.PORT || 4000;

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: FRONTEND_URL,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

app.use(cookieParser());
app.use("/api/posts", postRoutes);
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

async function main() {
  try {
    await sequelize.sync({ alter: true });
    app.listen(port, () => {
      console.log(`Conected!! app listening on port ${port}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}
main();
