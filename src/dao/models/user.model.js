import mongoose from "mongoose";

const userCollection = "users";

// Subdocumento: documents
const documentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  reference: { type: String, required: true },
});

const userSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  pets: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "pets",
    },
  ],
  documents: {
    type: [documentSchema],
    default: [],
  },
  last_connection: { type: Date },
});

const UserModel = mongoose.model(userCollection, userSchema);

export default UserModel;
