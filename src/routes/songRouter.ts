import express from "express";
const songRouter = express.Router();
import tokenVerification from "../middlewares/tokenVerification.js"
import { findmusic,listOfArtist,musicByAtrist } from "../controllers/songController.js";

songRouter.post("/findesong",tokenVerification,findmusic)
.get("/artists",tokenVerification,listOfArtist)
.post("/musicByartist",tokenVerification,musicByAtrist)

export default songRouter;