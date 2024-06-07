import mongoose from "mongoose";

const artisteSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  nickname:{type:String, required:true, unique:true},
  picture_url: { type: String },
  genre: { type: String },
  born_date: { type: Date },
  born_city: { type: String },
  died_date: { type: Date },
});

export const Artiste = mongoose.model('Artiste', artisteSchema)



/* this line was comented becouse it was making an error
export default Artiste
*/