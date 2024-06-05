import mongoose from "mongoose";
import Artist from "../models/Artiste.js"
import Song from "../models/Song.js"
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
import Artiste from "../models/Artiste.js";
dotenv.config();


connectDB();

const listOfArtist = async(req,res)=>{
    try {
        const {ArtistName} = req.body;
        const artist = await Artist.find();
        return res
        .status(StatusCodes.OK)
        .json({message:"her is the lest of the artists",
            theArtests:listOfArtist
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
}

const musicByAtrist= async(req,res)=>{
    try {
        const {ArtistName} = req.body;
        const musiclyrecs= await Song.find({})
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
}