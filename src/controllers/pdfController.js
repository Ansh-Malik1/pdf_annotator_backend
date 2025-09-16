import PDF from '../models/PDF.js';
import fs from "fs";
import path from "path";
import mongoose from "mongoose";

export const upload_pdf= async (req,res)=>{
    try {
    const file = req.file;
    if (!file) return res.status(400).json({ message: 'No file uploaded' });

    const pdfRecord = new PDF({
      userId: req.user.id,
      uuid: file.filename.split('.')[0], 
      originalName: file.originalname,
      storedName: file.filename,
    });

    await pdfRecord.save();
    res.status(201).json({ message: 'PDF uploaded successfully', pdf: pdfRecord });
    } 
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

export const get_pdfs= async(req,res)=>{
  try {
    const userIdStr = req.user.id.trim();

    if (!mongoose.Types.ObjectId.isValid(userIdStr)) {
        return res.status(400).json({ error: 'Invalid user ID' });
    }

    const userId = new mongoose.Types.ObjectId(userIdStr);

    console.log('Querying PDFs for user:', userId);

    const pdfs = await PDF.find({ user: userId });

    console.log('PDFs found:', pdfs);

    return res.json(pdfs);
  } 
  catch (err) {
      console.error('Error fetching PDFs:', err); // log full error
      return res.status(500).json({ error: 'Server error fetching PDFs', details: err.message });
  }

}


export const renamePdf = async (req, res) => {
  try {
    const { uuid } = req.params;
    const { newName } = req.body;

    const pdf = await Pdf.findOneAndUpdate(
      { uuid, userId: req.user.id }, // ensure ownership
      { originalName: newName },
      { new: true }
    );

    if (!pdf) {
      return res.status(404).json({ message: "PDF not found or not authorized" });
    }

    res.json({ message: "PDF renamed successfully", pdf });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};




export const deletePdf = async (req, res) => {
  try {
    const { uuid } = req.params;

    const pdf = await Pdf.findOneAndDelete({ uuid, userId: req.user.id });
    if (!pdf) {
      return res.status(404).json({ message: "PDF not found or not authorized" });
    }

    // Remove file from uploads folder
    const filePath = path.join("src", "uploads", pdf.storedName);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    res.json({ message: "PDF deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
