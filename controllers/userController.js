import { StatusCodes } from "http-status-codes";
import hashPassword from "../utils/hashPassword.js";
import generateToken from "../utils/jwt.js";
import {
    BadRequestError,
    UnAuthenticatedError,
    NotFoundError,
} from "../errors/index.js";
import { User } from "../models/User.js";
import connectDB from "../models/db.js";
import { sendEmail } from "../utils/sendEmail.js";

connectDB();

export const requestResetPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email)
            return res.status(StatusCodes.BAD_REQUEST).json({
                error: new BadRequestError("Email is required").message,
            });

        const user = await User.findOne({ email });
        if (!user)
            return res.status(StatusCodes.NOT_FOUND).json({
                error: new NotFoundError("User does not exist").message,
            });

        const resetToken = generateToken({ id: user._id },process.env.ACCESS_TOKEN_SECRET,{ expiresIn: "1h" });
        user.resetPasswordToken = resetToken;
        await user.save();

        const resetUrl = `${req.protocol}://${req.get("host")}/api/resetPassword`;

        const message = `You are receiving this email because you (or someone else) have requested the reset of a password. Please make a request to: \n\n ${resetUrl} \n\n your reset token is: ${resetToken}`;

        await sendEmail({
            email: user.email,
            subject: "Password reset token",
            message,
        });

        return res.status(StatusCodes.OK).json({ message: "Email sent" , resetToken});
    } catch (error) {
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ error: error.message });
    }
};

export const resetPassword = async (req, res) => {
    try {
        const { newPassword } = req.body;
        const { id } = req.user;

        if (!newPassword)
            return res.status(StatusCodes.BAD_REQUEST).json({
                error: new BadRequestError("password is required").message,
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

        const user = await User.findById( id );

        if (!user)
            return res.status(StatusCodes.NOT_FOUND).json({
                error: new NotFoundError("User not found").message,
            });

        user.password = await hashPassword(newPassword);
        user.resetPasswordToken = undefined;
        await user.save();

        return res
            .status(StatusCodes.OK)
            .json({ message: "Password has been reset" });
    } catch (error) {
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ error: error.message });
    }
};
