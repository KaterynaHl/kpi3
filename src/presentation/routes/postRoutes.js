const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");

const {
  createPost,
  getPosts,
  addComment,
  likePost,
} = require("../controllers/PostController");

const router = express.Router();

router.get("/", getPosts);
router.post("/", authMiddleware, createPost);
router.post("/:id/comments", authMiddleware, addComment);
router.post("/:id/like", authMiddleware, likePost);

module.exports = router;