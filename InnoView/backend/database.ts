import * as mongodb from "mongodb";
import { LoginModel } from "../src/app/sign-in/sign-in.component";

export const collections: {
  logins?: mongodb.Collection<LoginModel>;
  documents?: mongodb.Collection<DocumentModel>;
} = {};

export async function connectToDatabase(uri: string) {
  const client = new mongodb.MongoClient(uri);
  await client.connect();

  const db = client.db("InnoViewDB");
  await applyLoginSchemaValidation(db);

  const loginCollection = db.collection<LoginModel>("login");
  //const docCollection = db.collection<DocumentModel>("documents");

  collections.logins = loginCollection;
  //collections.documents = docCollection;
  return db;
}

//Update collection with JSON schema validation so documents match the shape of our login model
//For more info: https://www.mongodb.com/blog/post/json-schema-validation--locking-down-your-model-the-smart-way
async function applyLoginSchemaValidation(db: mongodb.Db) {
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
                  description: "'email' is required and is a string",
                  //minLength: 5
              },
              password: {
                  bsonType: "string",
                  description: "'password' is required and is a string",
                  minLength: 5
              },
          },
      },
  };

  //Apply schema to the login collection
  await db.command({
    collMod: "login",
    validator: jsonSchema
  }).catch(async (error: mongodb.MongoServerError) => {
    if (error.codeName === "NamespaceNotFound") {
      await db.createCollection("login", {validator: jsonSchema});
    }
  });
}

async function applyDocSchemaValidation(db: mongodb.Db) {
  const jsonSchema = {
      $jsonSchema: {
          bsonType: "object",
          required: ["authorID", "viewerIDs", "editorIDs"],
          additionalProperties: false,
          properties: {
              authorID: {
                  bsonType: "string",
                  description: "'author' is required and is a string",
              },
              viewerIDs: {
                  bsonType: "array",
                  description: "'viewers' is required and is an array, may be empty",
              },
              editorIDs: {
                bsonType: "array",
                description: "'editors' is required and is an array, may be empty",
              }
          },
      },
  };

  //Apply schema to the collection, creating collection if it doesn't exist
  await db.command({
    collMod: "documents",
    validator: jsonSchema
  }).catch(async (error: mongodb.MongoServerError) => {
    if (error.codeName === "NamespaceNotFound") {
      await db.createCollection("documents", {validator: jsonSchema});
    }
  });
}