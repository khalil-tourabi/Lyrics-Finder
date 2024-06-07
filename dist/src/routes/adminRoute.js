"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admincontroller_1 = require("../controllers/admincontroller");
const tokenVerification_1 = __importDefault(require("../middlewares/tokenVerification"));
const adminevirefication_1 = __importDefault(require("../middlewares/adminevirefication"));
const adminRoute = express_1.default.Router();
adminRoute.post('/promoteUser', tokenVerification_1.default, adminevirefication_1.default, admincontroller_1.promoteToAdmin);
adminRoute.post('/demoteUser', tokenVerification_1.default, adminevirefication_1.default, admincontroller_1.demoteToUser);
adminRoute.post('/addArtist', tokenVerification_1.default, adminevirefication_1.default, admincontroller_1.addArtist);
adminRoute.post('/addsong', tokenVerification_1.default, adminevirefication_1.default, admincontroller_1.addSong);
adminRoute.put('/modifysong', tokenVerification_1.default, adminevirefication_1.default, admincontroller_1.modifySong);
adminRoute.delete('/deleteArtist', tokenVerification_1.default, adminevirefication_1.default, admincontroller_1.deleteArtist);
adminRoute.delete('/removeSong', tokenVerification_1.default, adminevirefication_1.default, admincontroller_1.removeSong);
adminRoute.put('/modifyArtist', tokenVerification_1.default, adminevirefication_1.default, admincontroller_1.modifyArtist);
exports.default = adminRoute;
