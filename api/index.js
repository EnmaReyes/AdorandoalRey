const express = require("express");
const postRoutes = require("./routes/posts.js");
const authRoutes = require("./routes/auth.js");
const userRoutes = require("./routes/users.js");
const emailRoutes = require("./routes/email.js");
const { sequelize } = require("./db.js");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { FRONTEND_URL } = require("./config.js");

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
app.use("/api/email", emailRoutes);

async function main() {
  try {
    await sequelize.sync({ alter: false });
    app.listen(port, () => {
      console.log(`Conected!! app listening on port ${port}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

main();
