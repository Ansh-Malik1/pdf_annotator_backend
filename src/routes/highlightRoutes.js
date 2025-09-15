import express from "express";
import { verifyToken } from '../middlewares/authMiddleware.js';
import { createHighlight,getHighlights,deleteHighlight } from "../controllers/hightlightController.js";

const router = express.Router();

router.post("/", verifyToken, createHighlight);          
router.get("/:pdfUuid", verifyToken, getHighlights);     
router.delete("/:id", verifyToken, deleteHighlight);     

export default router;
