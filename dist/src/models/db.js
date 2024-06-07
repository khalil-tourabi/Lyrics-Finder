"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = async () => {
    try {
        await mongoose_1.default.connect("mongodb+srv://elhoubiyoussef:faghjklq@cluster0.pgmp2gi.mongodb.net/", {
        //   useNewUrlParser: true,
        //   useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB");
    }
    catch (error) {
        console.error("Could not connect to MongoDB", error);
    }
};
exports.default = connectDB;
