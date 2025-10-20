// src/routes/adoption.router.js
import { Router } from "express";
import UserModel from "../dao/models/user.model.js";
import PetModel from "../dao/models/pet.model.js";
import AdoptionModel from "../dao/models/adoption.model.js"; 

const router = Router();

// GET /api/adoptions → todos los adopciones
router.get("/", async (req, res) => {
  try {
    const adoptions = await AdoptionModel.find().populate("user").populate("pet");
    res.status(200).json({ status: "success", payload: adoptions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
});

// POST /api/adoptions/:uid/:pid → adoptar una mascota
router.post("/:uid/:pid", async (req, res) => {
  try {
    const { uid, pid } = req.params;
    const user = await UserModel.findById(uid);
    const pet = await PetModel.findById(pid);

    if (!user || !pet) return res.status(404).json({ status: "error", message: "User or Pet not found" });

    const alreadyAdopted = await AdoptionModel.findOne({ user: uid, pet: pid });
    if (alreadyAdopted) return res.status(400).json({ status: "error", message: "Pet already adopted by this user" });

    const adoption = await AdoptionModel.create({ user: uid, pet: pid, date: new Date() });
    res.status(201).json({ status: "success", payload: adoption });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
});

export default router;
