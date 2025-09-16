import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

import usersRouter from "./routes/users.router.js";
import petsRouter from "./routes/pets.router.js";
import mocksRouter from "./routes/mocks.router.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middlewares
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB conectado 🚀"))
  .catch(err => console.error("Error al conectar a MongoDB:", err));

// Rutas
app.use("/api/users", usersRouter);
app.use("/api/pets", petsRouter);
app.use("/api/mocks", mocksRouter);

// Levantar servidor
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
