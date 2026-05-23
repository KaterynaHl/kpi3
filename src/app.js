const express = require("express");
const { register } = require("./auth/auth.controller");
const authMiddleware = require("./auth/auth.middleware");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Microblog API running",
  });
});

const {
    register,
    login,
  } = require("./auth/auth.controller");
  
  app.post("/auth/register", register);
  app.post("/auth/login", login);

module.exports = app;

const {
    createPost,
    getPosts,
    getPostById,
    deletePost,
  } = require("./posts/posts.controller");
  
  app.post("/posts", authMiddleware, createPost);
  app.get("/posts", getPosts);
  app.get("/posts/:id", getPostById);
  app.delete("/posts/:id", authMiddleware, deletePost);

  const {
    createComment,
  } = require("./comments/comments.controller");
  
  app.post(
    "/posts/:id/comments",
    authMiddleware,
    createComment
  );