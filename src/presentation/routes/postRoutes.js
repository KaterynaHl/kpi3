const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");

const {
  createPost,
  getPosts,
  getPostById,
  addComment,
  likePost,
} = require("../controllers/PostController");

const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getPostById);
router.post("/", authMiddleware, createPost);
router.post("/:id/comments", authMiddleware, addComment);
router.post("/:id/like", authMiddleware, likePost);

module.exports = router;