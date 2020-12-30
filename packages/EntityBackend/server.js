// server.js
const config = require("./config");
const loanRouter = require("./routes/loans/loanRouter");
const entityRouter = require("./routes/entity/entityRouter");
const entitySummaryRouter = require("./routes/entity/entitySummaryRouter");
const entityConfigurationRouter = require("./routes/entity/entityConfigurationRouter");
const loanConfigRouter = require("./routes/loans/loanConfigRouter.js");
const loanDiscrepanciesRouter = require("./routes/loans/loanDiscrepanciesRouter.js");
const loanSummaryRouter = require("./routes/loans/loanSummaryRouter.js");
const externalSourceRouter = require("./routes/externalSourceRouter");
const discrepanciesRouter = require("./routes/discrepanciesRouter");
const reportRouter = require("./routes/report/reportRouter");
const reportTemplateRouter = require("./routes/reportTemplate/reportTemplateRouter");

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
server.use("/external", externalSourceRouter);

///Entity Routes
server.use("/", entityRouter);
server.use("/discrepancies", discrepanciesRouter);
server.use("/entityConfig", entityConfigurationRouter);
server.use("/entitysummary", entitySummaryRouter);

//Loan Routes
server.use("/loans", loanRouter);
server.use("/loandiscrepancies", loanDiscrepanciesRouter);
server.use("/loanConfig", loanConfigRouter);
server.use("/loansummary", loanSummaryRouter);

//Report Routes
server.use("/report", reportRouter);

//Report Template Routes
server.use("/reporttemplate", reportTemplateRouter);

server.listen(port, () => {
  console.log(`Server listening at ${port}`);
});
