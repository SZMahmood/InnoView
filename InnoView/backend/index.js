const express = require("express");
const cors = require("cors");
const path = require('path');

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use(require("./routes/record"));

app.use(express.static(path.join(__dirname, '../dist/inno-view/browser')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/inno-view/browser/index.html'));
});



app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});