// server.js
const config = require('./config');
const companyRouter = require('./routes/companyRouter');
const express = require("express");
let cors = require("cors");
const server = express();

const body_parser = require("body-parser");

// Allow the frontend to access the endpoints without CORS blocking
server.use(cors())
// parse JSON (application/json content-type)
server.use(body_parser.json());


const port = config.port || 4005;

server.use("/", companyRouter);

server.listen(port, () => {
    console.log(`Server listening at ${port}`);
});