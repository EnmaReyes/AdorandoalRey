const express = require("express");
const {
  addComments,
  addHeart,
  addPost,
  addResponseComment,
  deleteComments,
  deleteHeart,
  deletePost,
  deleteResponse,
  getPostByID,
  getPostByTitle,
  getPosts,
  updatePost,
} = require("../controllers/post.js");

const router = express.Router();

router.get("/", getPosts);
router.get("/search", getPostByTitle);
router.get("/:id", getPostByID);
router.post("/", addPost);
router.delete("/:id", deletePost);
router.put("/:id", updatePost);

// Comentarios
router.post("/:id", addComments);
router.delete("/:id/:id", deleteComments);
router.post("/:id/response", addResponseComment);
router.delete("/:id/response/:id", deleteResponse);

// Likes
router.post("/:id/:hearts", addHeart);
router.delete("/:id/:hearts/:id", deleteHeart);

module.exports = router;
