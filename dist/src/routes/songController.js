"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const findrouter = express_1.default.Router();
const tokenVerification_js_1 = __importDefault(require("../middlewares/tokenVerification.js"));
const songController_js_1 = require("../controllers/songController.js");
findrouter.post("/findesong", tokenVerification_js_1.default, songController_js_1.findmusic)
    .post("/artists", tokenVerification_js_1.default, songController_js_1.listOfArtist)
    .post("/musicByartist", tokenVerification_js_1.default, songController_js_1.musicByAtrist);
exports.default = findrouter;
