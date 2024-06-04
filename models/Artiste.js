import mongoose from "mongoose";

const artisteSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  picture_url: { type: String },
  genre: { type: String },
  born_date: { type: Date },
  born_city: { type: String },
  died_date: { type: Date },
});

const Artiste = mongoose.model('Artiste', artisteSchema)

export default Artiste