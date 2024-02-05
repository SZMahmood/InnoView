var Express = require("express");
var Mongoclient = require("mongodb").MongoClient;
var cors = require("cors");
const multer = require("multer");

var app = Express();
app.use(cors());
var CONNECTION_STRING = "mongodb+srv://symahmood:Project_Database%23123@data.n8qolos.mongodb.net/?retryWrites=true&w=majority";






var DATABASENAME = "Data";
var database;

app.listen(5038, () => { 
    Mongoclient.connect(CONNECTION_STRING, (error,client) => {
        database = client.db(DATABASENAME);
        console.log("Mongo DB connection successful");
    }); 
})

//TODO:

/*Currently, the connection to the database shows on the account side but the console does not log the connection.
    Need to create the methods to add and remove things from database.
*/