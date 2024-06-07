"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const http_status_codes_1 = require("http-status-codes");
const hashPassword_1 = __importDefault(require("../utils/hashPassword"));
const comparePasswords_1 = __importDefault(require("../utils/comparePasswords"));
const jwt_1 = __importDefault(require("../utils/jwt"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const index_js_1 = require("../errors/index.js");
const User_1 = require("../models/User");
const db_1 = __importDefault(require("../models/db"));
(0, db_1.default)();
const register = async (req, res) => {
    try {
        const { firstname, lastname, email, password, isAdmin } = req.body;
        if (!firstname || !lastname || !email || !password)
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                error: new index_js_1.BadRequestError("You forgot to enter either first name, lastname, email or password, please check again").message,
            });
        const userExists = await User_1.User.findOne({ email });
        if (userExists)
            return res
                .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                .json({ error: new index_js_1.BadRequestError("User already exists").message });
        const hashedPassword = await (0, hashPassword_1.default)(password);
        const newUser = new User_1.User({
            firstname,
            lastname,
            email,
            password: hashedPassword,
            isAdmin: isAdmin || false,
        });
        const result = await newUser.save();
        const token = (0, jwt_1.default)({ user: newUser }, process.env.ACCESS_TOKEN_SECRET);
        return res.status(http_status_codes_1.StatusCodes.CREATED).json({ token });
    }
    catch (error) {
        return res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ error: error.message });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                error: new index_js_1.BadRequestError("Email and Password are obligatory!").message
            });
        const user = await User_1.User.findOne({ email });
        if (!user)
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                error: new index_js_1.NotFoundError("User does not Exist! please Register").message
            });
        const correctPassword = await (0, comparePasswords_1.default)(password, user.password);
        if (!correctPassword)
            return res
                .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                .json({ error: new index_js_1.UnAuthenticatedError("Wrong Email or Password!").message });
        const token = (0, jwt_1.default)({ user }, process.env.ACCESS_TOKEN_SECRET);
        return res.status(http_status_codes_1.StatusCodes.OK).json({ token });
    }
    catch (error) {
        return res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ error: error.message });
    }
};
exports.login = login;
