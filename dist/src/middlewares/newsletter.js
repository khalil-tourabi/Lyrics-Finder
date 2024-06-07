"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.weeklyNewsLetter = exports.subscribletter = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const User_1 = require("../models/User");
const Artiste_1 = require("../models/Artiste");
const Song_1 = require("../models/Song");
const node_cron_1 = __importDefault(require("node-cron"));
const subscribletter = async (req, res, next) => {
    try {
        const { email } = req.body;
        // if (!email )
        //     res.status(StatusCodes.BAD_REQUEST).json({
        //         error: new BadRequestError("Email and Password are obligatory!").message
        //     });
        // const existingUser = await User.find({email:email})
        // if(existingUser){
        //     res.status(StatusCodes.BAD_REQUEST).json({
        //             error: new BadRequestError("Email already exists!").message
        //         });
        //     }
        const transporter = nodemailer_1.default.createTransport({
            host: "smtp.zoho.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.SMTP_MAIL,
                pass: process.env.SMTP_PASSWORD
            }
        });
        const mailoption = {
            from: "apprenant3@talents4starups.com",
            to: email,
            subject: " thanks letter for subscribing in our news lette",
            text: `Thank you for subscribing to our newsletter! Your support means the world to us. We're excited to keep you informed and engaged with our latest updates and insights. Stay tuned for valuable content delivered straight to your 
            \n
            \n inbox.Best regards,
            \n[YKJ/lyrics finder]`
        };
        transporter.sendMail(mailoption, function (error, info) {
            if (error) {
                console.log(error);
            }
            else {
                console.log('Email sent: ' + info.response);
            }
        });
        next();
    }
    catch (error) {
        console.log(error);
        return res.status(error.statusCode).json({ error: error.message });
    }
};
exports.subscribletter = subscribletter;
const getWeeklyInfo = async () => {
    const weeklyLetter = await User_1.User.find({ newsletter: true });
    const songs = await Song_1.Song.find();
    const artests = await Artiste_1.Artiste.find();
    return { weeklyLetter, songs, artests };
};
exports.weeklyNewsLetter = node_cron_1.default.schedule("0 8 * * 5", async () => {
    const { weeklyLetter, songs, artests } = await getWeeklyInfo();
    const mailoption = {
        form: "apprenant3@talents4starups.com",
        to: weeklyLetter.map((user) => user.email),
        subject: "new week new news letter ",
        text: `thank you for staying on our news letter here is  list  of all of the songs \n
        ${songs.map((song) => song.title)} 
        \n
        here is a list of the artest\n
        ${artests.map((artiste) => artiste.nickname)}
        \n 
        best regards
        `
    };
});
