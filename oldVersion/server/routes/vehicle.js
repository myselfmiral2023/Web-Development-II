import express from "express";
import { create, findAll, findOne, update, remove, findAllAvailable } from "../controllers/vehicle.controller.js";

const router = express.Router();

router.get("/", findAll);
router.get("/available/:startDate/:endDate", findAllAvailable);
router.get("/:id([0-9]+)", findOne);
router.get("/vehicletype/:vehicletype([0-9]+)", findAll);
router.post("/", create);
router.put("/:id([0-9]+)", update);
router.delete("/:id([0-9]+)", remove);


export default router;
