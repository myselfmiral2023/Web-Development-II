import express from "express";
import { create, findAll, findOne, update, remove, findAllWithName, findAllExpanded } from "../controllers/review.controller.js";

const router = express.Router();

router.get("/", findAllExpanded); // need for admin table
router.get("/user/:userid([0-9]+)", findAll); // get all reviews written by a user, but review content only, no booking or vehicle details
router.get("/booking/:bookingid([0-9]+)", findAll); // // get all reviews for a booking, but review content only, no user or vehicle details
router.get("/userexp/:userid([0-9]+)", findAllExpanded); // get all reviews written by a single user, with booking and vehicle details
router.get("/bookingexp/:bookingid([0-9]+)", findAllExpanded); // // get all reviews for a booking with booking details, with author name and vehicle details
router.get("/vehicleexp/:vehicleid([0-9]+)", findAllExpanded); // // get all reviews for a specific vehicle with vehicle details, with author name, booking details
router.get("/:id([0-9]+)", findOne);
router.post("/", create);
router.patch("/:id([0-9]+)", update);
router.delete("/:id([0-9]+)", remove);
router.get("/alluser", findAllWithName);

export default router;
