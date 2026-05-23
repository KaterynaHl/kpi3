const express = require("express");

const authRoutes = require("./presentation/routes/authRoutes");
const postRoutes = require("./presentation/routes/postRoutes");
const errorMiddleware = require("./presentation/middleware/errorMiddleware");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Microblog API with layered architecture",
  });
});

app.use("/auth", authRoutes);
app.use("/posts", postRoutes);

app.use(errorMiddleware);

module.exports = app;