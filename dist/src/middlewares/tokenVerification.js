"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const index_js_1 = require("../errors/index.js");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function tokenVerification(req, res, next) {
    try {
        const { authorization } = req.headers;
        console.log(authorization);
        if (!authorization) {
            throw new index_js_1.UnAuthenticatedError("No token provided");
        }
        const token = authorization.split(" ")[1];
        if (!token) {
            throw new index_js_1.UnAuthenticatedError("No token provided");
        }
        const payload = jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = payload;
        next();
    }
    catch (error) {
        console.log(error);
        return res.status(error.statusCode).json({ error: error.message });
    }
}
exports.default = tokenVerification;
