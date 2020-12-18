// import modules
const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");
const dateTimeHelper = require("../../utils/dateTimeHelper");

// db setup
const DbConnection = require("../../db");

/**************************************************************************************************************************************************** */

// GET all report templates for a company
router.get("/:companyId", async (req, res) => {
  const companyId = req.params.companyId;

  try {
    const dbCollection = await DbConnection.getCollection("ReportTemplates");
    const reportTemplates = await dbCollection
      .find({ companyId: ObjectId(companyId) })
      .toArray((err, result) => {
        if (err) throw new Error(err);
        res.json(result);
      });
  } catch (e) {
    res.json({
      Error: e.message + "Error in grabbing data from an external source",
    });
  }
});

// GET single report template for a company
router.get("/:companyId/:reportTemplateId", async (req, res) => {
  try {
    const companyId = req.params.companyId;
    const reportTemplateId = req.params.reportTemplateId;
    const dbCollection = await DbConnection.getCollection("ReportTemplates");
    const reportTemplate = await dbCollection.findOne({
      $and: [{ companyId: ObjectId(companyId) }, { _id: ObjectId(reportTemplateId) }],
    });

    if (!reportTemplate) {
      res.json({
        error: "ReportTemplate with given id doesn't exist",
      });
    }

    res.json(reportTemplate);
  } catch (e) {
    res.json({
      ErrorStatus: e.status,
      ErrorMessage: e.message,
    });
  }
});

// POST (create) a new report template
router.post("/new", async (req, res) => {
  try {

    const {
      companyId,
      reportTemplateName,
      selectedReportColumn,
      reportTemplateFields,
      columnOrder,
      doesReportExist,
      enableEntities,
      enableLoans,
      selectedEntitiyApiRequests,
      selectedLoanApiRequests,
      responseMappedEntiity,
      responseMappedLoans,
    } = req.body;


    const dbCollection = await DbConnection.getCollection("ReportTemplates");

    let result = await dbCollection.insertOne({
      reportTemplateCreatedAt: dateTimeHelper.getTimeStamp(),
      companyId: ObjectId(companyId),
      reportTemplateName,
      selectedReportColumn,
      reportTemplateFields,
      columnOrder,
      doesReportExist,
      enableEntities,
      enableLoans,
      selectedEntitiyApiRequests,
      selectedLoanApiRequests,
      responseMappedEntiity,
      responseMappedLoans,
    });

    // return added report template
    if (result) {

      res.json({status:200, message:"Report template Successfully Created"});
    } else {
      res.json({status:400, message:"Failed to create a report template"});

    }

  } catch (error) {
    res.json({ Error: error.message });
  }
});

// DELETE a report template
router.delete("/:companyId/:reportTemplateId", async (req, res) => {
  const companyId = req.params.companyId;
  const reportTemplateId = req.params.reportTemplateId;

  console.log("Delete entity with id: ", reportTemplateId);

  try {
    const dbCollection = await DbConnection.getCollection("ReportTemplates");
    const reportTemplate = await dbCollection.findOne({
      $and: [
        { companyId: ObjectId(companyId) },
        { _id: ObjectId(reportTemplateId) },
      ],
    });

    if (!reportTemplate) {
      res.json({
        error: "Report Template with given id doesn't exist",
      });
    } else {
      await dbCollection.deleteOne({
        $and: [
          { companyId: ObjectId(companyId) },
          { _id: ObjectId(reportTemplateId) },
        ],
      });

      // return success message
      res.json({
        Success: `Report Template ${entityId} successfully deleted`,
      });
    }
  } catch (error) {
    res.json({
      Error: error.message,
    });
  }
});

module.exports = router;
