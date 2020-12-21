// import modules
const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");
const dateTimeHelper = require("../../utils/dateTimeHelper");
const ULID = require("ulid");

// db setup
const DbConnection = require("../../db");

/**************************************************************************************************************************************************** */

// STEP 1
// POST (create) a new report (Creates a report object when the user clicks on a report template in the report template dashboard)
router.post("/new", async (req, res) => {
  try {
    // const reportTemplateId = req.params.reportTemplateId
    // for now
    const reportTemplateId = "temporaryReportTempId";

    //Time stamped id -> used for sorting in the future
    const reportId = ULID.ulid();

    const dbCollection = await DbConnection.getCollection("Reports");

    await dbCollection.insertOne({
      reportId,
      reportTemplateId,
      reportCreatedAt: dateTimeHelper.getTimeStamp(),
    });

    // return added report
    let singleReport = await dbCollection.findOne({ reportId });

    res.json(singleReport);
  } catch (error) {
    res.json({ Error: error.message });
  }
});

// STEP 2
// PATCH (update) a basic information for the report
router.patch("/:reportId/basicinfo", async (req, res) => {
  try {
    const reportId = req.params.reportId;
    const { reportTitle, reportDescription, selectedApprover } = req.body;

    const dbCollection = await DbConnection.getCollection("Reports");

    let foundReport = await dbCollection.findOne({
      reportId,
    });

    if (!foundReport) {
      res.json({
        status: 404,
        message: "Report Not Found : Not a valid report id",
      });
    }

    let updatedReport = await dbCollection.updateOne(
      {
        reportId,
      },
      { $set: { reportTitle, reportDescription, selectedApprover } }
    );

    console.log(updatedReport);
    res.json(updatedReport);
  } catch (error) {
    res.json({ status: error.status, message: error.message });
  }
});

// STEP 3
// PATCH (update) a basic information for the report
router.patch("/:reportId/selection", async (req, res) => {
  try {
    const reportId = req.params.reportId;
    const { selectedEntityId, selectedBorrowerId, selectionType } = req.body;

    const dbCollection = await DbConnection.getCollection("Reports");

    let foundReport = await dbCollection.findOne({
      reportId,
    });

    if (!foundReport) {
      res.json({
        status: 404,
        message: "Report Not Found : Not a valid report id",
      });
    }

    let updatedReport = await dbCollection.updateOne(
      {
        reportId,
      },
      { $set: { selectedEntityId, selectedBorrowerId } }
    );

    res.json({status:200, message:`${selectionType} selection for the report generation completed`});
  } catch (error) {
    res.json({ status: error.status, message: error.message });
  }
});
module.exports = router;
