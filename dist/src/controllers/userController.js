"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.requestResetPassword = void 0;
const http_status_codes_1 = require("http-status-codes");
const hashPassword_1 = __importDefault(require("../utils/hashPassword"));
const jwt_1 = __importDefault(require("../utils/jwt"));
const index_js_1 = require("../errors/index.js");
const User_1 = require("../models/User");
const db_1 = __importDefault(require("../models/db"));
const sendEmail_1 = require("../utils/sendEmail");
(0, db_1.default)();
const requestResetPassword = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email)
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                error: new index_js_1.BadRequestError("Email is required").message,
            });
        const user = await User_1.User.findOne({ email });
        if (!user)
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                error: new index_js_1.NotFoundError("User does not exist").message,
            });
        const resetToken = (0, jwt_1.default)({ id: user._id }, process.env.ACCESS_TOKEN_SECRET);
        user.resetPasswordToken = resetToken;
        await user.save();
        const resetUrl = `${req.protocol}://${req.get("host")}/api/resetPassword`;
        const message = `You are receiving this email because you (or someone else) have requested the reset of a password. Please make a request to: \n\n ${resetUrl} \n\n your reset token is: ${resetToken}`;
        await (0, sendEmail_1.sendEmail)({
            email: user.email,
            subject: "Password reset token",
            message,
        });
        return res.status(http_status_codes_1.StatusCodes.OK).json({ message: "Email sent", resetToken });
    }
    catch (error) {
        return res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ error: error.message });
    }
};
exports.requestResetPassword = requestResetPassword;
const resetPassword = async (req, res) => {
    try {
        const { newPassword } = req.body;
        const { id } = req.user;
        if (!newPassword)
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                error: new index_js_1.BadRequestError("password is required").message,
            });
        // let payload;
        // try {
        //     payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        // } catch (error) {
        //     return res.status(StatusCodes.BAD_REQUEST).json({
        //         error: new BadRequestError("Invalid token or token has expired")
        //             .message,
        //     });
        // }
        const user = await User_1.User.findById(id);
        if (!user)
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                error: new index_js_1.NotFoundError("User not found").message,
            });
        user.password = await (0, hashPassword_1.default)(newPassword);
        user.resetPasswordToken = undefined;
        await user.save();
        return res
            .status(http_status_codes_1.StatusCodes.OK)
            .json({ message: "Password has been reset" });
    }
    catch (error) {
        return res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ error: error.message });
    }
};
exports.resetPassword = resetPassword;
