const express = require("express");
const cors = require("cors");

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use(require("./routes/record"));

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});