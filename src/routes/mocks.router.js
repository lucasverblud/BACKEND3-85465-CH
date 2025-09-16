import { Router } from "express";
import { generateMockingUsers, generateMockingPets } from "../utils/mocking.js";
import UserModel from "../dao/models/user.model.js";
import PetModel from "../dao/models/pet.model.js";

const router = Router();

// Endpoint GET /mockingpets (migrado desde el primer desafío)
router.get("/mockingpets", (req, res) => {
  const pets = generateMockingPets(20); // por ejemplo 20
  res.json({ status: "success", payload: pets });
});

// Endpoint GET /mockingusers
router.get("/mockingusers", async (req, res) => {
  try {
    const users = await generateMockingUsers(50); // genera 50 usuarios
    res.json({ status: "success", payload: users });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
});

// Endpoint POST /generateData
router.post("/generateData", async (req, res) => {
  try {
    const { users = 10, pets = 5 } = req.body; // valores por defecto

    // Generar datos usando tu módulo de mocks
    const newUsers = await generateMockingUsers(users); // 🔹 async
    const newPets = generateMockingPets(pets);

    // Insertar en la base de datos
    const insertedPets = await PetModel.insertMany(newPets);
    const insertedUsers = await UserModel.insertMany(newUsers);

    res.json({
      status: "success",
      message: "Datos generados e insertados correctamente",
      users: insertedUsers.length,
      pets: insertedPets.length,
    });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
});

export default router;
