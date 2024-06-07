"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Song = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const songSchema = new mongoose_1.default.Schema({
    genre: { type: String },
    title: { type: String, required: true },
    recorded_date: { type: Date },
    lyrics: { type: String },
    artiste: { type: String, required: true }
});
exports.Song = mongoose_1.default.model("Song", songSchema);
