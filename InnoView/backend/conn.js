const { MongoClient, ServerApiVersion } = require("mongodb");

//TODO: Encode uri in environment file
const uri = "mongodb+srv://symahmood:Project_Database%23123@data.n8qolos.mongodb.net/?retryWrites=true&w=majority";;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

try {
  // Connect the client to the server
  client.connect();
  // Send a ping to confirm a successful connection
  client.db("admin").command({ ping: 1 });
  console.log(
   "Successfully connected to MongoDB."
  );
} catch(err) {
  console.error(err);
}

let db = client.db("InnoViewDB");

module.exports = db;