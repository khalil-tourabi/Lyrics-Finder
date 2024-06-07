"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const newsletter_1 = require("../middlewares/newsletter");
const authRoute = express_1.default.Router();
authRoute.post('/register', newsletter_1.subscribletter, authController_1.register).post('/login', authController_1.login);
exports.default = authRoute;
