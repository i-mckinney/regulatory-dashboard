// server.js
const config = require("./config");
const entityRouter = require("./routes/entityRouter");
const express = require("express");
const cors = require("cors");
const server = express();
const GenerateData = require("./Helper/GenerateData");

const body_parser = require("body-parser");

GenerateData();
// parse JSON (application/json content-type)
server.use(body_parser.json());

const port = config.port || 4005;

server.use(cors());
server.use("/", entityRouter);

server.listen(port, () => {
  console.log(`Server listening at ${port}`);
});
