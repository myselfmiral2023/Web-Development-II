import express from "express";
import { register, login, logout, findAll, findOne, remove } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

router.get("/", findAll);
router.get("/:id", findOne)

router.delete("/:id([0-9]+)", remove)

export default router;
