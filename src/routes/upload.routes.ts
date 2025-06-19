import express, { Request, Response } from "express";
import { upload } from "../services/upload.service";
import { authenticate } from "../middleware/auth.middleware";
import path from "path";
import multer from "multer";

const router = express.Router();

// Serve static files from /uploads
router.use("/files", express.static(path.join(__dirname, "../../uploads")));

// Upload endpoint
router.post("/media", authenticate, (req, res, next) => {
  upload.single("file")(req, res, (err) => {
    if (err) {
      if (err instanceof multer.MulterError && err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({ error: "File too large. Max 5MB." });
      }
      return res.status(400).json({ error: err.message });
    }

    const file = req.file;
    if (!file) return res.status(400).json({ error: "No file uploaded." });

    const url = `${req.protocol}://${req.get("host")}/upload/files/${file.filename}`;
    res.json({ url });
  });
});

export default router;