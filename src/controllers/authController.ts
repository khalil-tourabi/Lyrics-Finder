import { StatusCodes } from "http-status-codes";
import hashPassword from "../utils/hashPassword";
import comparePasswords from "../utils/comparePasswords";
import { Request,Response } from "express";
import generateToken from "../utils/jwt";
import dotenv from "dotenv"
dotenv.config();
import {
  BadRequestError,
  UnAuthenticatedError,
  NotFoundError,
} from "../errors/index.js";
import { User } from "../models/User";
import connectDB from "../models/db";

connectDB();

export const register = async (req:Request , res:Response) => {
  try {
    const { firstname, lastname, email, password, isAdmin } = req.body;

    if (!firstname || !lastname || !email || !password)
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: new BadRequestError(
          "You forgot to enter either first name, lastname, email or password, please check again"
        ).message,
      });

    const userExists = await User.findOne({ email });
    if (userExists)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: new BadRequestError("User already exists").message });

    const hashedPassword = await hashPassword(password);

    const newUser = new User({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      isAdmin: isAdmin || false,
    });
    const result = await newUser.save();

    const token = generateToken({ user: newUser },process.env.ACCESS_TOKEN_SECRET);

    return res.status(StatusCodes.CREATED).json({ token });
  } catch (error:any) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

export const login = async (req:Request , res:Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      res.status(StatusCodes.BAD_REQUEST).json({
        error: new BadRequestError("Email and Password are obligatory!").message
      });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(StatusCodes.NOT_FOUND).json({
        error: new NotFoundError("User does not Exist! please Register").message
      });

    const correctPassword = await comparePasswords(password, user.password);
    if (!correctPassword)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: new UnAuthenticatedError("Wrong Email or Password!").message });

    const token = generateToken({ user }, process.env.ACCESS_TOKEN_SECRET);
    return res.status(StatusCodes.OK).json({ token });
  } catch (error:any) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};
