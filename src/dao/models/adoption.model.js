// src/dao/models/adoption.model.js
import mongoose from "mongoose";

const adoptionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
  pet: { type: mongoose.Schema.Types.ObjectId, ref: "pets", required: true },
  date: { type: Date, default: Date.now },
});

const AdoptionModel = mongoose.model("adoptions", adoptionSchema);

export default AdoptionModel;
