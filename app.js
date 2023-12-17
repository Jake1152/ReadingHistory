const express = require("express");
const dotenv = require("dotenv");
const search = require("./routes/search");

dotenv.config();
const app = express();
app.use(express.static("src"));

const defaultPort = 3000;
const port = process.env.PORT ? process.env.PORT : defaultPort;

app.get("/", async (req, res) => {
  res.status(200).sendFile(__dirname + "/src/index.html");
});

app.use("/search", search);

app.listen(port, () => {
  console.log("Reading History web listening on port ", port);
});
