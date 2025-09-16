import { Router } from "express";
import PetModel from "../dao/models/pet.model.js";

const router = Router();

// GET todas las mascotas
router.get("/", async (req, res) => {
  try {
    const pets = await PetModel.find();
    res.json({ status: "success", payload: pets });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
});

// GET mascota por ID
router.get("/:id", async (req, res) => {
  try {
    const pet = await PetModel.findById(req.params.id);
    if (!pet) return res.status(404).json({ status: "error", message: "Pet not found" });
    res.json({ status: "success", payload: pet });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
});

// POST crear mascota
router.post("/", async (req, res) => {
  try {
    const newPet = await PetModel.create(req.body);
    res.json({ status: "success", payload: newPet });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
});

export default router;
