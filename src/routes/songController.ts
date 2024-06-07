import express from "express";
const findrouter = express.Router();
import tokenVerification from "../middlewares/tokenVerification.js"
import { findmusic,listOfArtist,musicByAtrist } from "../controllers/songController.js";

findrouter.post("/findesong",tokenVerification,findmusic)
.post("/artists",tokenVerification,listOfArtist)
.post("/musicByartist",tokenVerification,musicByAtrist)

export default findrouter;