"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeSong = exports.modifyArtist = exports.deleteArtist = exports.demoteToUser = exports.promoteToAdmin = exports.modifySong = exports.addArtist = exports.addSong = void 0;
const http_status_codes_1 = require("http-status-codes");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const index_js_1 = require("../errors/index.js");
const User_1 = require("../models/User");
const Artiste_1 = require("../models/Artiste");
const Song_1 = require("../models/Song");
const db_1 = __importDefault(require("../models/db"));
(0, db_1.default)();
const addSong = async (req, res) => {
    try {
        const { genre, title, recorded_date, lyrics, artiste } = req.body;
        const song = await Song_1.Song.create({
            genre,
            title,
            recorded_date,
            lyrics,
            artiste
        });
        res.status(http_status_codes_1.StatusCodes.CREATED).json({ song });
    }
    catch (error) {
        console.log(error.message);
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};
exports.addSong = addSong;
const addArtist = async (req, res) => {
    try {
        const { firstname, lastname, nickname, picture_url, genre, born_date, born_city, died_date } = req.body;
        const Artist = await Artiste_1.Artiste.create({
            firstname,
            lastname,
            nickname,
            picture_url,
            genre,
            born_date,
            born_city,
            died_date,
        });
        res.status(http_status_codes_1.StatusCodes.CREATED).json({ Artist });
    }
    catch (error) {
        console.log(error.message);
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};
exports.addArtist = addArtist;
const modifySong = async (req, res) => {
    try {
        const { title } = req.body;
        await Song_1.Song.updateOne({ title }, { $set: { lyrics: req.body } });
        res.status(http_status_codes_1.StatusCodes.OK).json({ message: "song updated successfully" });
    }
    catch (error) {
        console.log(error.message);
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};
exports.modifySong = modifySong;
const promoteToAdmin = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                error: new index_js_1.BadRequestError("Email is required").message,
            });
        }
        const user = await User_1.User.findOne({ email });
        if (!user) {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                error: new index_js_1.NotFoundError("User not found").message,
            });
        }
        user.isAdmin = true;
        await user.save();
        return res.status(http_status_codes_1.StatusCodes.OK).json({ message: "User promoted to admin" });
    }
    catch (error) {
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};
exports.promoteToAdmin = promoteToAdmin;
// Demote an admin to user
const demoteToUser = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                error: new index_js_1.BadRequestError("Email is required").message,
            });
        }
        const user = await User_1.User.findOne({ email });
        if (!user) {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                error: new index_js_1.NotFoundError("User not found").message,
            });
        }
        user.isAdmin = false;
        await user.save();
        return res.status(http_status_codes_1.StatusCodes.OK).json({ message: "Admin demoted to user" });
    }
    catch (error) {
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};
exports.demoteToUser = demoteToUser;
//delete artiste
const deleteArtist = async (req, res) => {
    try {
        const { nickname } = req.body;
        const artist = await Artiste_1.Artiste.findOne({ nickname });
        if (!artist) {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                error: new index_js_1.NotFoundError("Artist not found").message,
            });
        }
        await artist.deleteOne();
        return res.status(http_status_codes_1.StatusCodes.OK).json({ message: "Artist deleted" });
    }
    catch (error) {
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};
exports.deleteArtist = deleteArtist;
// Modify artist information
const modifyArtist = async (req, res) => {
    try {
        const { nickname, newFirstname, newLastname, newPictureUrl, newGenre, newBornDate, newBornCity, newDiedDate } = req.body;
        const artist = await Artiste_1.Artiste.findOne({ nickname });
        if (!artist) {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                error: new index_js_1.NotFoundError("Artist not found").message,
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
        return res.status(http_status_codes_1.StatusCodes.OK).json({ message: "Artist information modified" });
    }
    catch (error) {
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};
exports.modifyArtist = modifyArtist;
// remove song
const removeSong = async (req, res) => {
    try {
        const { title } = req.body;
        const song = await Song_1.Song.findOne({ title });
        if (!song) {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                error: new index_js_1.NotFoundError("Song not found").message,
            });
        }
        await song.deleteOne();
        return res.status(http_status_codes_1.StatusCodes.OK).json({ message: "Song removed" });
    }
    catch (error) {
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};
exports.removeSong = removeSong;
