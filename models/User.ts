import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstname: { type: String },
  lastname: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  newsletter: { type: Boolean, default: true }
});

export const User = mongoose.model("User", userSchema);
