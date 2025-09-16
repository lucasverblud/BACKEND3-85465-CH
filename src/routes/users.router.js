import { Router } from "express";
import UserModel from "../dao/models/user.model.js";
import bcrypt from "bcrypt";

const router = Router();

// GET /api/users → listar todos los usuarios
router.get("/", async (req, res) => {
  try {
    const users = await UserModel.find().populate("pets"); // trae los pets referenciados
    res.json({ status: "success", payload: users });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
});

// GET /api/users/:id → obtener usuario por ID
router.get("/:id", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id).populate("pets");
    if (!user) return res.status(404).json({ status: "error", message: "User not found" });
    res.json({ status: "success", payload: user });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
});

// POST /api/users → crear usuario
router.post("/", async (req, res) => {
  try {
    const { first_name, last_name, email, password, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({
      first_name,
      last_name,
      email,
      password: hashedPassword,
      role: role || "user",
      pets: [],
    });

    res.json({ status: "success", payload: newUser });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
});

export default router;
