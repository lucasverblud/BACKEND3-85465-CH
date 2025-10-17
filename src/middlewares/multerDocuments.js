// src/middlewares/multerDocuments.js
import multer from "multer";
import path from "path";

// Configuración de almacenamiento
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/documents"); // carpeta donde se guardarán los archivos
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const name = file.originalname.replace(ext, "").replace(/\s/g, "_");
    cb(null, `${name}-${Date.now()}${ext}`);
  },
});

export const uploadDocuments = multer({ storage });
