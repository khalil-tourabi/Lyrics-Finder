import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
  genre: { type: String },
  title: { type: String, required: true },
  recorded_date: { type: Date },
  lyrics: { type: String },
  artiste: { type: mongoose.Schema.Types.ObjectId, ref: 'Artiste' }
});

export const Song = mongoose.model("Song", songSchema);