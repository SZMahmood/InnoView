const express = require("express");
const db = require("../conn");
const { ObjectId } = require("mongodb");
const router = express.Router();

const tokenColl = "jwtTokens";

//Get all records
//TODO: Format response
router.get("/getTokens", async (req, res) => {
  let collection = await db.collection(tokenColl);
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

//TODO: Make way to add entries

module.exports = router;