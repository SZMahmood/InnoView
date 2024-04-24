import express from 'express';
import { Multer } from 'multer';
const documentRouter = express.Router();
import { collections } from '../database';
import mongodb from 'mongodb';
import GridFsStorage from 'multer-gridfs-storage';
import fs from 'fs'

//const Documents = collections.documents;

export function docRouter(upload:Multer, url:string, db:mongodb.Db)
{
    documentRouter.use(express.json());

    const fsBucket = new mongodb.GridFSBucket(db, {bucketName: "documents"})

    const docFilesCollection = db.collection("documents.files");

    let readDocFromMongodb = function()
    {
        let sFile = docFilesCollection.findOne({metadata: {test:2}})
        sFile.then((doc: any)=>
        {
            if(doc)
            {
                const downloadStream = fsBucket.openDownloadStream(doc._id)
                const localDownloadStream = fs.createWriteStream("C:\\Users\\wliu4\\OneDrive\\Documents\\ClassWork\\DocTest\\DocRecieve.txt")
                downloadStream.pipe(localDownloadStream);
            }
        }
        , ()=>{});
    }

    const uploadStream = fsBucket.openUploadStream("documents",{"metadata": {"test" : 2}})
    const localUploadStream = fs.createReadStream("C:\\Users\\wliu4\\OneDrive\\Documents\\ClassWork\\DocTest\\DocSend.txt");
    localUploadStream.pipe(uploadStream)
    uploadStream.on("finish", readDocFromMongodb)


    
    

    return documentRouter;
}
