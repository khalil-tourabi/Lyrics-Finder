import jwt from "jsonwebtoken";
import { UnAuthenticatedError } from "../errors/index.js";
import  Express, { Request, Response ,NextFunction } from "express";
import dotenv from 'dotenv';
dotenv.config();


declare global{
  interface userData{
    firstname:string
    lastname:string
    email:string
    password:string
    isAdmin:boolean
  }
  namespace Express{
    interface Request{
      user:userData
    }
  }
}

function tokenVerification(req:Request, res:Response, next:NextFunction) {
  try {
    const { authorization } = req.headers;
    console.log(authorization)
    if (!authorization) {
      throw new UnAuthenticatedError("No token provided");
    }
    const token = authorization.split(" ")[1];
    if (!token) {
      throw new UnAuthenticatedError("No token provided");
    }

    const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string);
    req.user = payload;
    next();
  } catch (error:any) {
    console.log(error);
    return res.status(error.statusCode).json({ error: error.message });
  }
}

export default tokenVerification;