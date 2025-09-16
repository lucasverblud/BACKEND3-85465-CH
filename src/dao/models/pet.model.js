import mongoose from "mongoose";

const petCollection = "pets";

const petSchema = new mongoose.Schema({
  name: String,
  type: String,
  adopted: { type: Boolean, default: false },
});

const PetModel = mongoose.model(petCollection, petSchema);

export default PetModel;
