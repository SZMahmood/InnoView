import path from 'path'
import multer from 'multer'
import GridFsStorage from "multer-gridfs-storage";
import * as express from "express";

export const documentRouter = express.Router();
documentRouter.use(express.json());

documentRouter.route("/")
    

documentRouter.post("/", async (_req, res) => 
{
    
})