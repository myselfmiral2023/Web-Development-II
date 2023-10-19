import express from "express";
import { register, login, logout, findAll, findOne,  remove, update  } from "../controllers/user.controller.js";
import { uploadUserProfileImage, getUserProfileImage, deleteUserProfileImage, getUserProfileImageNames } from "../controllers/usericon-blob.controller.js";
import multer from "multer";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

router.get("/", findAll);
router.get("/:id([0-9]+)", findOne)

router.patch("/:id([0-9]+)", update)

router.delete("/:id([0-9]+)", remove)

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB file size limit
  });


//Image upload routes ==== after /api/user
router.get('/filenames', getUserProfileImageNames); //For testing to get all names
router.get("/files/:fileName", getUserProfileImage);
router.post("/upload", upload.single("file"), uploadUserProfileImage); 
router.delete("/files/:fileName", deleteUserProfileImage);


export default router;
