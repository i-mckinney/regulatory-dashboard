// server.js
const config = require("./config");
const entityRouter = require("./routes/entityRouter");
const externalSourceRouter = require("./routes/externalSourceRouter");
const configurationRouter = require("./routes/configurationRouter");
const discrepanciesRouter = require("./routes/discrepanciesRouter");
const entitySummaryRouter = require("./routes/entitySummaryRouter");

const express = require("express");
const cors = require("cors");
const server = express();
const GenerateData = require("./Helper/GenerateData");
const ResetData = require("./Helper/ResetData");

const body_parser = require("body-parser");

/**Helper functions to either generate or reset fake data in external sources (FIS, temenos, etc)
 * ResetData(), GenerateData()
*/
// ResetData()
// GenerateData();

// parse JSON (application/json content-type)
server.use(body_parser.json());

const port = config.port || 4005;

server.use(cors());
server.use("/", entityRouter);
server.use("/external", externalSourceRouter);
server.use("/discrepancies", discrepanciesRouter);
server.use("/config", configurationRouter);
server.use("/entitysummary", entitySummaryRouter);

server.listen(port, () => {
  console.log(`Server listening at ${port}`);
});
