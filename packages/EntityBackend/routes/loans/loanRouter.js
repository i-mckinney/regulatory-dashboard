// import modules
const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");
const dateTimeHelper = require("../../utils/dateTimeHelper");

// db setup
const DbConnection = require("../../db");

// /**************************************************************************************************************************************************** */

// GET all loans in a loan dashboard
router.get("/:companyId", async (req, res) => {
  const companyId = req.params.companyId;
  try {
    const dbCollection = await DbConnection.getCollection("Loans");
    const loans = await dbCollection
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

// GET one specific loan
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

// POST (create) a new loan
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
        { company_id: ObjectId(companyId) },
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
        loanApiConfigurations: [],
      });
      if(response) res.json({ status: 200, message: "Loan Added to a loan dashboard" });
    } else {
      res.json({ status: 400, message: "Error in adding a new loan" });
    }
  } catch (error) {
    res.json({ Error: error.message });
  }
});

// DELETE a loan
router.delete("/:companyId/:loanId", async (req, res) => {
  const companyId = req.params.id;
  const loanId = req.params.loanId;

  console.log("Delete a loan with id: ", loanId);

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
