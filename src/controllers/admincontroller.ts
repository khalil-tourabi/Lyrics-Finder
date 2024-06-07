import { StatusCodes } from "http-status-codes";
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
import { Artiste } from "../models/Artiste";
import { Song } from "../models/Song";
import connectDB from "../models/db";

connectDB();

export const addSong = async(req:Request,res:Response)=>{
    try {
        const {genre,title,recorded_date,lyrics,artiste}=req.body;
        const song = await Song.create({
            genre,
            title,
            recorded_date,
            lyrics,
            artiste
        })
        res.status(StatusCodes.CREATED).json({song})
    } catch (error:any) {
        console.log(error.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
}

export const addArtist = async(req:Request,res:Response)=>{
    try {
        const {firstname,lastname,nickname,picture_url,genre,born_date,born_city,died_date}=req.body;
        const Artist = await Artiste.create({
            firstname,
            lastname,
            nickname,
            picture_url,
            genre,
            born_date,
            born_city,
            died_date,
        })
        res.status(StatusCodes.CREATED).json({Artist})
    } catch (error:any) {
        console.log(error.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
}
export const modifySong=async(req:Request,res:Response)=>{
    try {
        const {title}= req.body
        await Song.updateOne({title},{$set:{lyrics:req.body}});
        res.status(StatusCodes.OK).json({message:"song updated successfully"})
    } catch (error:any) {
        console.log(error.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};

export const promoteToAdmin = async (req: Request, res: Response) => {
    try {
      const { email } = req.body;
  
      if (!email) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          error: new BadRequestError("Email is required").message,
        });
      }
  
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({
          error: new NotFoundError("User not found").message,
        });
      }
  
      user.isAdmin = true;
      await user.save();
  
      return res.status(StatusCodes.OK).json({ message: "User promoted to admin" });
    } catch (error: any) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
  };
  
  // Demote an admin to user
  export const demoteToUser = async (req: Request, res: Response) => {
    try {
      const { email } = req.body;
  
      if (!email) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          error: new BadRequestError("Email is required").message,
        });
      }
  
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({
          error: new NotFoundError("User not found").message,
        });
      }
  
      user.isAdmin = false;
      await user.save();
  
      return res.status(StatusCodes.OK).json({ message: "Admin demoted to user" });
    } catch (error: any) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
  };
//delete artiste
export const deleteArtist = async (req: Request, res: Response) => {
    try {
      const { nickname } = req.body;
  
      const artist = await Artiste.findOne({ nickname });
  
      if (!artist) {
        return res.status(StatusCodes.NOT_FOUND).json({
          error: new NotFoundError("Artist not found").message,
        });
      }
  
      await artist.deleteOne();
  
      return res.status(StatusCodes.OK).json({ message: "Artist deleted" });
    } catch (error: any) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
  };
  
  // Modify artist information
  export const modifyArtist = async (req: Request, res: Response) => {
    try {
      const { nickname, newFirstname, newLastname, newPictureUrl, newGenre, newBornDate, newBornCity, newDiedDate } = req.body;
  
      const artist = await Artiste.findOne({ nickname });
  
      if (!artist) {
        return res.status(StatusCodes.NOT_FOUND).json({
          error: new NotFoundError("Artist not found").message,
        });
      }
  
      artist.firstname = newFirstname || artist.firstname;
      artist.lastname = newLastname || artist.lastname;
      artist.picture_url = newPictureUrl || artist.picture_url;
      artist.genre = newGenre || artist.genre;
      artist.born_date = newBornDate || artist.born_date;
      artist.born_city = newBornCity || artist.born_city;
      artist.died_date = newDiedDate || artist.died_date;
  
      await artist.save();
  
      return res.status(StatusCodes.OK).json({ message: "Artist information modified" });
    } catch (error: any) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
  };
  
  
  // remove song
  export const removeSong = async (req: Request, res: Response) => {
    try {
      const { title } = req.body;
  
      const song = await Song.findOne({ title });
  
      if (!song) {
        return res.status(StatusCodes.NOT_FOUND).json({
          error: new NotFoundError("Song not found").message,
        });
      }
  
      await song.deleteOne();
  
      return res.status(StatusCodes.OK).json({ message: "Song removed" });
    } catch (error: any) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
  };