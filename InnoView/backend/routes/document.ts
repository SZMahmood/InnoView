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

    //const uploadStream = fsBucket.openUploadStream("documents",{"metadata": {"test" : 1}});
    //const localUploadStream = fs.createReadStream("C:\\Users\\wliu4\\Downloads\\1811.10787.pdf");


    let sFile = docFilesCollection.findOne({metadata: {test:1}})
    sFile.then((doc: any)=>
    {
        if(doc)
        {
            const downloadStream = fsBucket.openDownloadStream(doc._id)
            const localDownloadStream = fs.createWriteStream("C:\\Users\\wliu4\\Downloads\\new.pdf")
            downloadStream.pipe(localDownloadStream);
        }
    }
    , ()=>{});
    
    

    return documentRouter;
}
