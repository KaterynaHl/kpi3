const express = require("express");

const {
  register,
  login,
} = require("./auth/auth.controller");

const authMiddleware = require("./auth/auth.middleware");

const {
  createPost,
  getPosts,
  getPostById,
  deletePost,
  likePost,
} = require("./posts/posts.controller");

const {
  createComment,
} = require("./comments/comments.controller");

const errorMiddleware = require(
  "./middleware/error.middleware"
);

const app = express();

app.use(express.json());

app.post("/auth/register", register);
app.post("/auth/login", login);

app.post("/posts", authMiddleware, createPost);
app.get("/posts", getPosts);
app.get("/posts/:id", getPostById);
app.delete("/posts/:id", authMiddleware, deletePost);

app.post(
  "/posts/:id/like",
  authMiddleware,
  likePost
);

app.post(
  "/posts/:id/comments",
  authMiddleware,
  createComment
);

app.use(errorMiddleware);

module.exports = app;