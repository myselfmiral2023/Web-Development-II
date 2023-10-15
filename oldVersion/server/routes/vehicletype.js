import express from "express";
import { create, findAll, findOne, update, remove } from "../controllers/vehicletype.controller.js";
import { uploadFile, getFile, deleteFile, getFileNames } from '../controllers/vehicletype-blob.controller.js';
import multer from "multer";

const router = express.Router();

router.get("/", findAll);
router.get("/type/:typename([a-z]+)", findAll);
router.get("/year/:year([0-9]+)", findAll);
router.get("/:id([0-9]+)", findOne);
router.post("/", create);
router.put("/:id([0-9]+)", update);
router.delete("/:id([0-9]+)", remove);

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB file size limit
});


//Image upload routes ==== after /api/vehicletype
router.get('/filenames', getFileNames); //For testing to get all names
router.get("/files/:fileName", getFile);
router.post("/upload", upload.single("file"), uploadFile); 
router.delete("/files/:fileName", deleteFile);

export default router;
