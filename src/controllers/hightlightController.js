import Highlight from "../models/Highlight.js";
import PDF from '../models/PDF.js';


export const createHighlight = async (req, res) => {
  try {
    const { pdfUuid, pageNumber, text, boundingBox } = req.body;
    const pdf = await PDF.findOne({ uuid: pdfUuid, userId: req.user.id });
    if (!pdf) return res.status(403).json({ message: "Not authorized to highlight this PDF" });
    const highlight = new Highlight({
      pdfUuid,
      userId: req.user.id,
      pageNumber,
      text,
      boundingBox,
    });

    await highlight.save();
    res.status(201).json({ message: "Highlight saved", highlight });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const getHighlights = async (req, res) => {
  try {
    const { pdfUuid } = req.params;

    const highlights = await Highlight.find({
      pdfUuid,
      userId: req.user.id,
    });

    res.json(highlights);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const deleteHighlight = async (req, res) => {
  try {
    const { id } = req.params;

    const highlight = await Highlight.findOneAndDelete({
      _id: id,
      userId: req.user.id,
    });

    if (!highlight) return res.status(404).json({ message: "Highlight not found" });

    res.json({ message: "Highlight deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const updateHighlight = async (req, res) => {
  try {
    const { id } = req.params;
    const { text, boundingBox, pageNumber } = req.body;

    const highlight = await Highlight.findOneAndUpdate(
      { _id: id, userId: req.user.id }, // ensure ownership
      { text, boundingBox, pageNumber },
      { new: true }
    );

    if (!highlight) {
      return res.status(404).json({ message: "Highlight not found or not authorized" });
    }

    res.json({ message: "Highlight updated successfully", highlight });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
