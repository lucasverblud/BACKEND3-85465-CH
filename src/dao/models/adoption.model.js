import mongoose from "mongoose";

const adoptionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  pet: { type: mongoose.Schema.Types.ObjectId, ref: "Pet", required: true },
  date: { type: Date, default: Date.now },
  status: { type: String, enum: ["pending", "completed"], default: "pending" } 
});

export default mongoose.model("Adoption", adoptionSchema);
