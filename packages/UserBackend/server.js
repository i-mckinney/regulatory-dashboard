// server.js
const config = require('./config');
const usersRouter = require('./routes/userRouter');
const express = require("express");
const server = express();

const body_parser = require("body-parser");

// parse JSON (application/json content-type)
server.use(body_parser.json());

const port = config.port || 4000;

server.use("/", usersRouter);

server.listen(port, () => {
    console.log(`Server listening at ${port}`);
});