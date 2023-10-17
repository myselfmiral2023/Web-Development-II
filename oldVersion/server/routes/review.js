import express from "express";
import { create, findAll, findOne, update, remove, findAllWithName } from "../controllers/review.controller.js";

const router = express.Router();

router.get("/", findAll);
router.get("/user/:userid([0-9]+)", findAll);
router.get("/booking/:bookingid([0-9]+)", findAll);
router.get("/:id([0-9]+)", findOne);
router.post("/", create);
router.put("/:id([0-9]+)", update);
router.delete("/:id([0-9]+)", remove);
router.get("/alluser", findAllWithName);

export default router;
