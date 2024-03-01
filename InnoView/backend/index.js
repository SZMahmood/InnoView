const Express = require("express");
//const Mongoclient = require("mongodb").MongoClient;
const cors = require("cors");
const fs = require("fs");
//const multer = require("multer");
const path = require("path")

const PORT = 4200





var DATABASENAME = "Data";
var database;

/*app.listen(5038, () => { 
    Mongoclient.connect(CONNECTION_STRING, (error,client) => {
        database = client.db(DATABASENAME);
        console.log("Mongo DB connection successful");
    }); 
})*/
var app = Express();
//app.use(cors());

var Angular_Static_Files_Path = path.join(__dirname, '../dist/inno-view/browser')
console.log(Angular_Static_Files_Path)
app.use(Express.static(Angular_Static_Files_Path));

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname))
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


var CONNECTION_STRING = "mongodb+srv://symahmood:Project_Database%23123@data.n8qolos.mongodb.net/?retryWrites=true&w=majority";


//TODO:

/*Currently, the connection to the database shows on the account side but the console does not log the connection.
    Need to create the methods to add and remove things from database.
*/