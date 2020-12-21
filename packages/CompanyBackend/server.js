// server.js
const config = require('./config');
const companyRouter = require('./routes/companyRouter');
const customApiRouter = require('./routes/customApiRouter');
const globalKeyRouter = require('./routes/globalKeyRouter');
const express = require("express");
let cors = require("cors");
const server = express();

const body_parser = require("body-parser");

// Allow the frontend to access the endpoints without CORS blocking
server.use(cors())
// parse JSON (application/json content-type)
server.use(body_parser.json());


const port = config.port || 4005;

server.use(cors())
server.use("/", companyRouter);
server.use("/", customApiRouter);
server.use("/", globalKeyRouter);

server.listen(port, () => {
    console.log(`Server listening at ${port}`);
});