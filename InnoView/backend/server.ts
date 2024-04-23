import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { connectToDatabase } from "./database";
import { loginRouter } from "./routes/login";


import bodyParser from 'body-parser';
import path from 'path';

import mongodb from 'mongodb';
//import Grid from 'gridfs-stream';

import multer from 'multer';
import {GridFsStorage} from 'multer-gridfs-storage';
import methodOverride from 'method-override';


import {docRouter} from "./routes/document";

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, './.env') });
const ATLAS_URI = process.env["ATLAS_URI"];

if (!ATLAS_URI) {
  console.error(
    "No ATLAS_URI environment variable has been defined in .env file"
  );
  process.exit(1);
}

const db = await connectToDatabase(ATLAS_URI);

const app = express();
app.use(cors());

app.use("/login", loginRouter);

app.use(express.static(path.join(__dirname, '../dist/inno-view/browser')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/inno-view/browser/index.html'));
});

const storage = new GridFsStorage(
{
  url: ATLAS_URI,
  file: (req: any, file: any) =>
  {
    return new Promise((resolve, reject)=>
    {
      const filename = file.name;
      const fileInfo = {
        filename: filename,
        bucketName: 'uploads'
      };
      resolve(fileInfo);
    })
  }
});

const upload = multer({ storage });

db.collection("documents.files").findOne({});
app.use("/document", docRouter(upload, ATLAS_URI, db))

// start the Express server
app.listen(5200, () => {
  console.log(`Server running at http://localhost:5200...`);
});