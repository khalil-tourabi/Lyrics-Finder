import nodemailer from "nodemailer";
import {User} from "../models/User"
import { Artiste } from "../models/Artiste";
import { Song } from "../models/Song";
import { StatusCodes } from "http-status-codes";
import {
    BadRequestError,
    UnAuthenticatedError,
    NotFoundError,
} from "../errors/index";
import {Request,Response,NextFunction} from "express";
import crone from "node-cron"

export const subscribletter = async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const {email} = req.body
    if (!email )
        res.status(StatusCodes.BAD_REQUEST).json({
            error: new BadRequestError("Email and Password are obligatory!").message
        });
    
    const existingUser = await User.find({email:email})
    if(existingUser){
        res.status(StatusCodes.BAD_REQUEST).json({
                error: new BadRequestError("Email already exists!").message
            });
        }
        const transporter = nodemailer.createTransport({
            host:"smtp.zoho.com",
            port:465,
            secure:true,
            auth:{
                user:"apprenant3@talents4starups.com",
                pass:"c2ddvc-A"
            }
        })
        const mailoption={
            from:"apprenant3@talents4starups.com",
            to:email,
            subject:" thanks letter for subscribing in our news lette",
            text:`Thank you for subscribing to our newsletter! Your support means the world to us. We're excited to keep you informed and engaged with our latest updates and insights. Stay tuned for valuable content delivered straight to your 
            \n
            \n inbox.Best regards,
            \n[YKJ/lyrics finder]`
        }
        transporter.sendMail(mailoption, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
        next()
    } catch (error:any) {
        console.log(error);
        return res.status(error.statusCode).json({ error: error.message });
    }
}

const getWeeklyInfo= async()=>{
    const weeklyLetter= await User.find({newsletter:true});
    const songs = await Song.find();
    const artests = await Artiste.find()
    return {weeklyLetter,songs,artests}
}

export const weeklyNewsLetter = crone.schedule("0 8 * * 5", async()=>{
    const {weeklyLetter,songs,artests}= await getWeeklyInfo();
    const mailoption={
        form:"apprenant3@talents4starups.com",
        to:weeklyLetter.map((user)=>user.email),
        subject:"new week new news letter ",
        text:`thank you for staying on our news letter here is  list  of all of the songs \n
        ${songs.map((song)=>song.title)} 
        \n
        here is a list of the artest\n
        ${artests.map((artiste)=>artiste.nickname)}
        \n 
        best regards
        `
    }
})