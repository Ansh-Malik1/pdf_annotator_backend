import express from 'express';
import { verifyToken } from '../middlewares/authMiddleware.js';
import upload from '../middlewares/upload.js';

import { upload_pdf,get_pdfs ,renamePdf,deletePdf} from '../controllers/pdfController.js';
const router = express.Router();



router.post('/upload', verifyToken, upload.single('pdf'),upload_pdf);

router.get('/my-pdfs', verifyToken,get_pdfs);
router.put("/:uuid/rename", verifyToken, renamePdf);
router.delete("/:uuid", verifyToken, deletePdf);

export default router
