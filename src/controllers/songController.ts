import mongoose from "mongoose";
import { Song } from "../models/Song.js";
import { Artiste } from "../models/Artiste.js";
import { StatusCodes } from "http-status-codes";
import {
    BadRequestError,
    UnAuthenticatedError,
    NotFoundError,
} from "../errors/index";
import dotenv from "dotenv";
import {Request,Response} from "express"
import connectDB from "../models/db.js";
dotenv.config();


connectDB();

export const findmusic = async (req:Request,res:Response)=>{
    try {
        const {songname} =req.body;

        const song= await Song.findOne({title:songname});

        if(!song){
            return res.status(StatusCodes.NOT_FOUND).json({error: new NotFoundError("sorry the song that you'r looking for does not exist ").message});
        }

        return res.status(StatusCodes.OK).json({
            music_name:song.title,
            music_lyrics:song.lyrics
        })
    } 
    catch (error:any) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
}

export const listOfArtist = async(req:Request,res:Response)=>{
    try {
        const {ArtistName} = req.body;
        const artist = await Artiste.find();
        return res
        .status(StatusCodes.OK)
        .json({message:"here is the list of the artists",
            theArtests:listOfArtist
        })
    } catch (error:any) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
}

export const musicByAtrist= async(req:Request,res:Response)=>{
    try {
        const {ArtistName} = req.body;
        const musiclyrecs= await Song.find({artiste:ArtistName})
        if (!musiclyrecs) {
            return res.status(StatusCodes.NOT_FOUND).json({error: new NotFoundError(`sorry the we don't have any song by this artist ${ArtistName} `).message});
        }
        return res
        .status(StatusCodes.OK)
        .json({message:`here is the songs that we have by the this artest ${ArtistName}`,
            theArtests:musiclyrecs
        })
    } catch (error:any) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
}