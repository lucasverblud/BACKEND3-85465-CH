import { Router } from "express";
import UserModel from "../dao/models/user.model.js";
import { uploadDocuments } from "../middlewares/multerDocuments.js";

const router = Router();

// Obtener todos los usuarios
router.get("/", async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json({ status: "success", payload: users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
});

// Obtener un usuario por ID
router.get("/:uid", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.uid);
    if (!user)
      return res.status(404).json({ status: "error", message: "User not found" });
    res.status(200).json({ status: "success", payload: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
});

// Crear un nuevo usuario
router.post("/", async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;
    const user = await UserModel.create({ first_name, last_name, email, password });
    res.status(201).json({ status: "success", payload: user });
  } catch (error) {
    console.error(error);
    if (error.code === 11000) {
      return res.status(409).json({ status: "error", message: "Email already exists" });
    }
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
});

// ✅ Subir documentos de un usuario
router.post("/:uid/documents", uploadDocuments.array("documents"), async (req, res) => {
  try {
    const userId = req.params.uid;
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).json({
        status: "error",
        message: "No se subieron archivos",
      });
    }

    // Estructura esperada en el schema (name + reference)
    const docs = files.map(file => ({
      name: file.originalname,
      reference: file.path,
    }));

    await UserModel.updateOne(
      { _id: userId },
      { $push: { documents: { $each: docs } } }
    );

    res.status(200).json({
      status: "success",
      message: "Documentos subidos correctamente",
      docs,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Error al subir documentos",
    });
  }
});

export default router;
