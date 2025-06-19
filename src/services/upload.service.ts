import path from "path";
import multer from "multer";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const allowedTypes = [
  "image/jpeg",
  "image/png",
  "image/jpg",
  "video/mp4",
  "audio/mpeg",
  "audio/mp3",
  "audio/wav",
];

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, "uploads/");
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = `${Date.now()}-${file.fieldname}${ext}`;
    cb(null, name);
  },
});

const fileFilter = (_req: any, file: Express.Multer.File, cb: any) => {
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type"), false);
  }
};

export const upload = multer({
  storage,
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter,
});