import express from "express";
import {updateUser, userById } from "../controllers/user.mjs";

const router = express.Router()

router.get("/edit", userById)
router.put("/edit", updateUser)

export default router;