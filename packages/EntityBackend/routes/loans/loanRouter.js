// import modules
const express = require("express");
const { company } = require("faker");
const router = express.Router();
const { ObjectId } = require("mongodb");
const GenerateData = require("./loanMockData/GenerateData")

// db setup
const DbConnection = require("../../db");
const { generatePath } = require("react-router-dom");

// /**************************************************************************************************************************************************** */

//Loan fake
router.get("/yo", async (req, res) => {
  const companyId = req.params.companyId;
  try {
    GenerateData()
    res.json({ messagee: "Yes" });
  } catch (e) {
    res.json({
      Error: e.message + "Error in grabbing data from an external source",
    });
  }
});
// GET ALL loans that exist in our loan database
router.get("/:companyId", async (req, res) => {
  const companyId = req.params.companyId;
  try {
    const dbCollection = await DbConnection.getCollection("Loans");
    const loans = await dbCollection
      .find({
        companyId: ObjectId(companyId),
      })
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

// GET ALL loans that exist in our loan dashboard
router.get("/:companyId/loandashboard", async (req, res) => {
  const companyId = req.params.companyId;
  try {
    const dbCollection = await DbConnection.getCollection("Loans");
    const loans = await dbCollection
      .find({
        $and: [{ companyId: ObjectId(companyId) }, { onDashboard: true }],
      })
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
        if (err) throw new Error(err);
        res.json(result);
      });
  } catch (e) {
    res.json({
      Error: e.message + "Error in grabbing data from an external source",
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
        error: "Loan with given id doesn't exist",
      });
    }

    res.json(loan);
  } catch (e) {
    res.json({
      ErrorStatus: e.status,
      ErrorMessage: e.message,
    });
  }
});

// POST (create) a new loan in the databse (Not in the dashboard)
router.post("/:companyId", async (req, res) => {
  try {
    const companyId = req.params.companyId;
    const {
      commitmentAmount,
      createdAt,
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

    let exist = await dbCollection.findOne({
      $and: [
        { companyId: ObjectId(companyId) },
        { loanId: loanId },
        { associatedEntityId: associatedEntityId },
      ],
    });

    if (!exist) {
      let response = await dbCollection.insertOne({
        commitmentAmount,
        createdAt,
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

// PATCH used to update an existing loan (primarily for transferring loan in database to the loan dashboard)
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
          loanId,
        },
        { $set: { onDashboard: onDashboard } }
      );

      if (response)
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
        message: "loan successfully deleted",
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
