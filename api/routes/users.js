import express from "express";
import {updateUser, userById } from "../controllers/user.js";

const router = express.Router()

router.get("/edit", userById)
router.put("/edit", updateUser)

export default router;