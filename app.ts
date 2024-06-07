import express,{Request,Response,NextFunction,} from "express"
import dotenv from "dotenv"
import {weeklyNewsLetter}from "./src/middlewares/newsletter"
dotenv.config()

const app=express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import authRoute from "./src/routes/authRoute";
import userRoute from "./src/routes/userRoute";
import songRouter from "./src/routes/songRouter";
import adminRoute from "./src/routes/adminRoute";



app.use('/api', authRoute)
app.use('/api', userRoute)
app.use('/api', songRouter)
app.use('/api', adminRoute)


app.use((err:any, req:Request, res:Response, next:NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

app.all('*', (req, res, next) => {
    res.status(400).json({success: false, msg: 'wrong url path'})
    console.log(`${req.originalUrl} doesnt exist`)
    next()
})

const port=process.env.APP_PORT || 8000
app.listen(port,()=>{
 console.log(`Server is running on PORT ${port}....`)
})