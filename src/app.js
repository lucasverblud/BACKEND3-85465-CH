import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import usersRouter from "./routes/users.router.js";
import petsRouter from "./routes/pets.router.js";
import mocksRouter from "./routes/mocks.router.js";

import { swaggerUi, swaggerSpecs } from "./docs/swagger.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/api/users", usersRouter);
app.use("/api/pets", petsRouter);
app.use("/api/mocks", mocksRouter);

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

const PORT = process.env.PORT || 8080;

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB conectado 🚀"))
  .catch(err => console.error("Error MongoDB:", err));

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => console.log(`Listening on ${PORT}`));
}

export default app;
