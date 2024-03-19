import * as express from "express";
import { ObjectId } from "mongodb";
import { collections } from "../database";

export const loginRouter = express.Router();
loginRouter.use(express.json());

//Gets all login info (test, remove for production)
loginRouter.get("/", async (_req, res) => {
    try {
        const loginList = await collections?.logins?.find({}).toArray();
        res.status(200).send(loginList);
    } catch (error) {
        res.status(500).send(error instanceof Error ? error.message : "Unknown error");
    }
});

//Get single login info from MongoDB ID
loginRouter.get("/:id", async (req, res) => {
  try {
      const id = req?.params?.id;
      const query = { _id: new ObjectId(id) };
      const login = await collections?.logins?.findOne(query);

      if (login) {
          res.status(200).send(login);
      } else {
          res.status(404).send(`Failed to find login info associated with ID ${id}`);
      }
  } catch (error) {
      res.status(404).send(`Failed to find login info associated with ID ${req?.params?.id}`);
  }
});

//Add new login
loginRouter.post("/", async (req, res) => {
  try {
      const login = req.body;
      const result = await collections?.logins?.insertOne(login);

      if (result?.acknowledged) {
          res.status(201).send(`Created a new login with ID ${result.insertedId}.`);
      } else {
          res.status(500).send("Failed to create a new login.");
      }
  } catch (error) {
      console.error(error);
      res.status(400).send(error instanceof Error ? error.message : "Unknown error");
  }
});

//Update login info associated with ID
loginRouter.put("/:id", async (req, res) => {
  try {
      const id = req?.params?.id;
      const login = req.body;
      const query = { _id: new ObjectId(id) };
      const result = await collections?.logins?.updateOne(query, { $set: login });

      if (result && result.matchedCount) {
          res.status(200).send(`Updated login associated with ID ${id}.`);
      } else if (!result?.matchedCount) {
          res.status(404).send(`Failed to find login associated with ID ${id}`);
      } else {
          res.status(304).send(`Failed to update login associated with ID ${id}`);
      }
  } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      console.error(message);
      res.status(400).send(message);
  }
});

//Delete login associated with particular ID
loginRouter.delete("/:id", async (req, res) => {
  try {
      const id = req?.params?.id;
      const query = { _id: new ObjectId(id) };
      const result = await collections?.logins?.deleteOne(query);

      if (result && result.deletedCount) {
          res.status(202).send(`Removed login associated with ID ${id}`);
      } else if (!result) {
          res.status(400).send(`Failed to remove login associated with ID ${id}`);
      } else if (!result.deletedCount) {
          res.status(404).send(`Failed to find login associated with ID ${id}`);
      }
  } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      console.error(message);
      res.status(400).send(message);
  }
});