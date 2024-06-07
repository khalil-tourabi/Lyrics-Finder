import express, { Router } from "express"
import { register, login } from "../controllers/authController"
import {subscribletter} from "../middlewares/newsletter"

const authRoute:Router = express.Router();

authRoute.post('/register',subscribletter, register).post('/login', login);
export default authRoute;