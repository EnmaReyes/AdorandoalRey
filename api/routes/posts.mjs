import express from "express";
import {
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
} from "../controllers/post.mjs";

const router = express.Router();

router.get("/", getPosts);
router.get("/search", getPostByTitle);
router.get("/:id", getPostByID);
router.post("/", addPost);
router.delete("/:id", deletePost);
router.put("/:id", updatePost);

//? comentarios \\
router.post("/:id", addComments);
router.delete("/:id/:id", deleteComments);
router.post("/:id/response", addResponseComment)
router.delete("/:id/response/:id", deleteResponse)

//? likes \\
router.post("/:id/:hearts", addHeart);
router.delete("/:id/:hearts/:id", deleteHeart);

export default router;
