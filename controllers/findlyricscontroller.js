import mongoose from "mongoose";
import { Song } from "../models/Song.js";
import { StatusCodes } from "http-status-codes";
import { ExpressValidator } from "express-validator";
import {
    BadRequestError,
    UnAuthenticatedError,
    NotFoundError,
} from "../errors/index.js";
import dotenv from "dotenv";
import connectDB from "../models/db.js";
import { STATUS_CODES } from "http";
dotenv.config();


connectDB();

export const findmusic = async (req,res)=>{
    try {
        const {songname} =req.body;

        const song= await Song.findOne({title:songname});

        if(!song){
            return res.status(StatusCodes.NOT_FOUND).json({error: new NotFoundError("sorry the song that you'r looking for does not exist ").message});
        }

        return res.status(STATUS_CODES.Ok).json({
            music_name:song.title,
            music_lyrics:song.lyrics
        })
    } 
    catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
}