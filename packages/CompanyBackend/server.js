// server.js
const config = require('./config');
const companyRouter = require('./routes/companyRouter');
const express = require("express");
const cors = require('cors')
const server = express();

const body_parser = require("body-parser");

// parse JSON (application/json content-type)
server.use(body_parser.json());

const port = config.port || 5000;

server.use(cors())
server.use("/", companyRouter);

server.listen(port, () => {
    console.log(`Server listening at ${port}`);
});