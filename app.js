import express from "express"
import dotenv from "dotenv"
import {weeklyNewsLetter}from "./middlewares/newsletter.js"
dotenv.config()

const app=express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";
import findrouter from "./routes/songController.js";


weeklyNewsLetter()

app.use('/api', authRoute)
app.use('/api', userRoute)
app.use('/api', findrouter)

app.use((err, req, res, next) => {
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