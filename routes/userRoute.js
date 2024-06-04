import express from "express"
import { requestResetPassword, resetPassword } from "../controllers/UserController.js"
import tokenVerification from "../middlewares/tokenVerification.js"

const userRoute = express.Router()

userRoute.post('/requestResetPassword', requestResetPassword).post('/resetPassword', tokenVerification, resetPassword)

export default userRoute;