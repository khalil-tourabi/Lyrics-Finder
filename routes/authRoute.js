import express from "express"
import { register, login } from "../controllers/authController.js"
import {subscribletter} from "../middlewares/newsletter.js"

const authRoute = express.Router();

authRoute.post('/register',subscribletter, register).post('/login', login);

export default authRoute;