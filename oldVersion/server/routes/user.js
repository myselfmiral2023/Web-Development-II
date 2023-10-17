import express from "express";
import { register, login, logout, findAll, findOne } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

router.get("/", findAll);
router.get("/:id", findOne)

export default router;
