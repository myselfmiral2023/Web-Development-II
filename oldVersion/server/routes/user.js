import express from "express";
import { register, login, logout, findAll, findOne, remove, update } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

router.get("/", findAll);
router.get("/:id([0-9]+)", findOne)

router.patch("/:id([0-9]+)", update)

router.delete("/:id([0-9]+)", remove)

export default router;
