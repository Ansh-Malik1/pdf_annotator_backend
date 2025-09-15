import express from 'express';
import { verifyToken } from '../middlewares/authMiddleware.js';
import upload from '../middlewares/upload.js';

import { upload_pdf,get_pdfs } from '../controllers/uploadController.js';
const router = express.Router();



router.post('/upload', verifyToken, upload.single('pdf'),upload_pdf);

router.get('/my-pdfs', verifyToken,get_pdfs);


export default router
