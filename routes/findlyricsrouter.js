import express from "express";
const findrouter = express.Router();
import tokenVerification from "../middlewares/tokenVerification.js"

import { findmusic } from "../controllers/findlyricscontroller.js";

findrouter.post("/findesong",tokenVerification,findmusic);

export default findrouter;