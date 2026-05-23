const express = require("express");
const { register } = require("./auth/auth.controller");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Microblog API running",
  });
});

app.post("/auth/register", register);

module.exports = app;