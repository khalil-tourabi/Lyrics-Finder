import express, { Router } from "express";
import { promoteToAdmin, demoteToUser, addSong,modifySong,deleteArtist,modifyArtist,removeSong,addArtist} from "../controllers/admincontroller";
import tokenVerification from "../middlewares/tokenVerification";
import isAdmin from "../middlewares/adminevirefication";

const adminRoute: Router = express.Router();

adminRoute.post('/promoteUser', tokenVerification, isAdmin, promoteToAdmin);
adminRoute.post('/demoteUser', tokenVerification, isAdmin, demoteToUser);
adminRoute.post('/addArtist', tokenVerification, isAdmin, addArtist);
adminRoute.post('/addsong', tokenVerification, isAdmin, addSong);
adminRoute.put('/modifysong', tokenVerification, isAdmin, modifySong);
adminRoute.delete('/deleteArtist', tokenVerification, isAdmin, deleteArtist);
adminRoute.delete('/removeSong', tokenVerification, isAdmin, removeSong);
adminRoute.put('/modifyArtist', tokenVerification, isAdmin, modifyArtist);

export default adminRoute;
