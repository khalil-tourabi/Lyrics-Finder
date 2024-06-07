"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.musicByAtrist = exports.listOfArtist = exports.findmusic = void 0;
const Song_js_1 = require("../models/Song.js");
const Artiste_js_1 = require("../models/Artiste.js");
const http_status_codes_1 = require("http-status-codes");
const index_1 = require("../errors/index");
const dotenv_1 = __importDefault(require("dotenv"));
const db_js_1 = __importDefault(require("../models/db.js"));
dotenv_1.default.config();
(0, db_js_1.default)();
const findmusic = async (req, res) => {
    try {
        const { songname } = req.body;
        const song = await Song_js_1.Song.findOne({ title: songname });
        if (!song) {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ error: new index_1.NotFoundError("sorry the song that you'r looking for does not exist ").message });
        }
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            music_name: song.title,
            music_lyrics: song.lyrics
        });
    }
    catch (error) {
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};
exports.findmusic = findmusic;
const listOfArtist = async (req, res) => {
    try {
        const artist = await Artiste_js_1.Artiste.find();
        return res
            .status(http_status_codes_1.StatusCodes.OK)
            .json({ message: "here is the list of the artists",
            theArtests: exports.listOfArtist
        });
    }
    catch (error) {
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};
exports.listOfArtist = listOfArtist;
const musicByAtrist = async (req, res) => {
    try {
        const { ArtistName } = req.body;
        const musiclyrecs = await Song_js_1.Song.find({ artiste: ArtistName });
        if (!musiclyrecs) {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ error: new index_1.NotFoundError(`sorry the we don't have any song by this artist ${ArtistName} `).message });
        }
        return res
            .status(http_status_codes_1.StatusCodes.OK)
            .json({ message: `here is the songs that we have by the this artest ${ArtistName}`,
            theArtests: musiclyrecs
        });
    }
    catch (error) {
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};
exports.musicByAtrist = musicByAtrist;
