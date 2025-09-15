import PDF from '../models/PDF.js';
export const upload_pdf= async (req,res)=>{
    try {
    const file = req.file;
    if (!file) return res.status(400).json({ message: 'No file uploaded' });

    const pdfRecord = new PDF({
      user: req.user.id,
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
    const pdfs = await PDF.find({ user: req.user.id });
    res.json(pdfs);
    } 
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}