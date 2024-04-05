import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { connectToDatabase } from "./database";
import { loginRouter } from "./routes/login";

//TODO: Store uri in environment variable
// Load environment variables from the .env file
/*dotenv.config();
const { ATLAS_URI } = process.env;

if (!ATLAS_URI) {
  console.error(
    "No ATLAS_URI environment variable has been defined in config.env"
  );
  process.exit(1);
}*/

const ATLAS_URI = "mongodb+srv://symahmood:Project_Database%23123@data.n8qolos.mongodb.net/?retryWrites=true&w=majority";

connectToDatabase(ATLAS_URI)
  .then(() => {
    const app = express();
    app.use(cors());

    app.use("/login", loginRouter);

    // start the Express server
    app.listen(5200, () => {
      console.log(`Server running at http://localhost:5200...`);
    });
  })
  .catch((error) => console.error(error));

  export{loginRouter, connectToDatabase}