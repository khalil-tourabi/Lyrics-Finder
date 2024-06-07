"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_js_1 = require("../controllers/userController.js");
const tokenVerification_js_1 = __importDefault(require("../middlewares/tokenVerification.js"));
const userRoute = express_1.default.Router();
userRoute.post('/requestResetPassword', userController_js_1.requestResetPassword).post('/resetPassword', tokenVerification_js_1.default, userController_js_1.resetPassword);
exports.default = userRoute;
