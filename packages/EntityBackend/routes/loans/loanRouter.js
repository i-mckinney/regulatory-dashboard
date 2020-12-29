// import modules
const express = require("express");
const { company } = require("faker");
const router = express.Router();
const { ObjectId } = require("mongodb");
const dateTimeHelper = require("../../utils/dateTimeHelper");
const GenerateData = require("./loanMockData/GenerateData");

// db setup
const DbConnection = require("../../db");

// /**************************************************************************************************************************************************** */

/**  Base at /loans */

// GET all loans that exist in a company's loan database
router.get("/:companyId", async (req, res) => {
  const companyId = req.params.companyId;
  try {
    const dbCollection = await DbConnection.getCollection("Loans");
    const loans = await dbCollection
      .find({
        companyId: ObjectId(companyId),
      })
      .toArray((err, result) => {
        if (err) throw new Error({ status: err.status, message: err.message });
        res.json(result);
      });
  } catch (error) {
    res.json({
      status: 400,
      message:
        error.message + "Error in grabbing data from a company's loan database",
    });
  }
});

// GET all loans that appears on a user's loan dashboard
router.get("/:companyId/loandashboard", async (req, res) => {
  const companyId = req.params.companyId;
  try {
    const dbCollection = await DbConnection.getCollection("Loans");
    const loans = await dbCollection
      .find({
        $and: [{ companyId: ObjectId(companyId) }, { onDashboard: true }],
      })
      .toArray((err, result) => {
        if (err) throw new Error({ status: err.status, message: err.message });
        res.json(result);
      });
  } catch (error) {
    res.json({
      status: 400,
      message: error.message + "Error in grabbing data from a loan dashboard",
    });
  }
});

/**
 * GET all loans associated with an entity and that does not exist on loan dashboard
 * (This is used in the loan selection page when creating a new loan)
 * -> Exists in Databse
 * -> associated with an entity
 * -> not on the LOAN DASHBOARD
 *  */

router.get("/:companyId/entity/:entityId", async (req, res) => {
  const companyId = req.params.companyId;
  const entityId = req.params.entityId;

  try {
    const dbCollection = await DbConnection.getCollection("Loans");
    const loans = await dbCollection
      .find({
        $and: [
          { companyId: ObjectId(companyId) },
          { associatedEntityId: entityId },
          { onDashboard: false },
        ],
      })
      .toArray((err, result) => {
        if (err) throw new Error({ status: err.status, message: err.message });
        res.json(result);
      });
  } catch (e) {
    res.json({
      status: 400,
      message:
        error.message +
        "Error in grabbing unselected loans in the loan data base",
    });
  }
});

// GET one specific loan in the database
router.get("/:companyId/:loanId", async (req, res) => {
  try {
    const companyId = req.params.companyId;
    const loanId = req.params.loanId;
    const dbCollection = await DbConnection.getCollection("Loans");
    const loan = await dbCollection.findOne({
      $and: [{ companyId: ObjectId(companyId) }, { loanId: loanId }],
    });

    if (!loan) {
      res.json({
        status: 400,
        message: "Loan with given id doesn't exist",
      });
    } else {
      res.json(loan);
    }
  } catch (e) {
    res.json({
      status: e.status,
      message: e.message,
    });
  }
});

// POST (create) a new loan in the databse (Not in the dashboard)
router.post("/:companyId", async (req, res) => {
  try {
    const companyId = req.params.companyId;
    const {
      commitmentAmount,
      guarantorBID,
      guarantorName,
      loanId,
      loanName,
      maturityDate,
      primaryBorrowerName,
      primaryBorrowerTIN,
      associatedEntityId,
    } = req.body;

    const dbCollection = await DbConnection.getCollection("Loans");

    let doesLoanExist = await dbCollection.findOne({
      $and: [
        { companyId: ObjectId(companyId) },
        { loanId: loanId },
        { associatedEntityId: associatedEntityId },
      ],
    });

    if (!doesLoanExist) {
      let response = await dbCollection.insertOne({
        commitmentAmount,
        createdAt: dateTimeHelper.getTimeStamp(),
        guarantorBID,
        guarantorName,
        loanId,
        loanName,
        maturityDate,
        primaryBorrowerName,
        primaryBorrowerTIN,
        associatedEntityId,
        companyId: ObjectId(companyId),
        onDashboard: false,
      });
      if (response)
        res.json({ status: 200, message: "Loan Added to a loan database" });
    } else {
      res.json({ status: 400, message: "Error in adding a new loan" });
    }
  } catch (error) {
    res.json({ Error: error.message });
  }
});

// PATCH used to update an existing loan (primarily for transferring loan in database to appear in the loan dashboard)
router.patch("/:companyId", async (req, res) => {
  try {
    const companyId = req.params.companyId;
    const { loanId, onDashboard } = req.body;

    const dbCollection = await DbConnection.getCollection("Loans");

    let doesloanExist = await dbCollection.findOne({
      $and: [{ companyId: ObjectId(companyId) }, { loanId: loanId }],
    });
    
    if (doesloanExist) {
      let updatedDashboardLoan = await dbCollection.updateOne(
        {
          loanId: loanId,
        },
        { $set: { onDashboard: onDashboard } }
      );


      if (updatedDashboardLoan)
        res.json({ status: 200, message: "Loan successfully updated" });
    } else {
      res.json({ status: 400, message: "Failed to update the loan" });
    }
  } catch (error) {
    res.json({ Error: error.message });
  }
});

// DELETE a loan
router.delete("/:companyId/:loanId", async (req, res) => {
  const companyId = req.params.companyId;
  const loanId = req.params.loanId;

  try {
    const dbCollection = await DbConnection.getCollection("Loans");

    let result = await dbCollection.deleteOne({
      $and: [{ companyId: ObjectId(companyId) }, { loanId: loanId }],
    });

    if (result) {
      res.json({
        status: 200,
        message: "Loan successfully deleted",
      });
    } else {
      res.json({
        status: 400,
        message: "Error in deleting a loan",
      });
    }
  } catch (error) {
    res.json({ status: error.status, message: error.message });
  }
});

module.exports = router;
