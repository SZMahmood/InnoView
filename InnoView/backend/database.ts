import * as mongodb from "mongodb";
import { LoginMongo } from "../src/app/sign-in/sign-in.component";

export const collections: {
  logins?: mongodb.Collection<LoginMongo>;
} = {};

export async function connectToDatabase(uri: string) {
  const client = new mongodb.MongoClient(uri);
  await client.connect();

  const db = client.db("InnoViewDB");
  await applySchemaValidation(db);

  const loginCollection = db.collection<LoginMongo>("login");
  collections.logins = loginCollection;
}

//Update collection with JSON schema validation so documents match the shape of our login model
//For more info: https://www.mongodb.com/blog/post/json-schema-validation--locking-down-your-model-the-smart-way
async function applySchemaValidation(db: mongodb.Db) {
  const jsonSchema = {
      $jsonSchema: {
          bsonType: "object",
          required: ["name", "email", "password"],
          additionalProperties: false,
          properties: {
              _id: {},
              name: {
                  bsonType: "string",
                  description: "'name' is required and is a string",
              },
              email: {
                  bsonType: "string",
                  description: "'position' is required and is a string",
                  //minLength: 5
              },
              password: {
                  bsonType: "string",
                  description: "'password' is required and is a string",
              },
          },
      },
  };

  //Apply schema to the collection, creating collection if it doesn't exist
  await db.command({
    collMod: "login",
    validator: jsonSchema
  }).catch(async (error: mongodb.MongoServerError) => {
    if (error.codeName === "NamespaceNotFound") {
      await db.createCollection("login", {validator: jsonSchema});
    }
  });
}


const uri = "mongodb+srv://symahmood:Project_Database%23123@data.n8qolos.mongodb.net/?retryWrites=true&w=majority";