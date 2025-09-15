import mongoose from "mongoose";

const pdfSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  uuid: { type: String, required: true, unique: true },
  originalName: { type: String, required: true },
  storedName: { type: String, required: true }, 
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('PDF', pdfSchema);
