import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/database.js";
import authRoutes from "./routes/authRoutes.js";
import pdfRoutes from "./routes/pdf.js"
import highlightRoutes from "./routes/highlightRoutes.js"
dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Backend is working ");
});
app.use("/api/auth", authRoutes);
app.use("/api/dashboard",pdfRoutes);
app.use("/api/highlights", highlightRoutes);
export default app;
