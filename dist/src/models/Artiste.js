"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Artiste = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const artisteSchema = new mongoose_1.default.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    nickname: { type: String, required: true, unique: true },
    picture_url: { type: String },
    genre: { type: String },
    born_date: { type: Date },
    born_city: { type: String },
    died_date: { type: Date },
});
exports.Artiste = mongoose_1.default.model('Artiste', artisteSchema);
/* this line was comented becouse it was making an error
export default Artiste
*/ 
