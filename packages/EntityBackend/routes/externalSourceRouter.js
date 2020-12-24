// import modules
const express = require("express");
const router = express.Router();

// db setup
const DbConnection = require("../db");

// GET all entities existing in external Source (For developmnet purposes)
router.get("/:externalSourceName", async (req, res) => {
  const externalSourceName = req.params.externalSourceName;
  try {
    const dbCollection = await DbConnection.getCollection(externalSourceName);
    const companies = await dbCollection.find().toArray((err, result) => {
      if (err) throw new Error(err);
      res.json(result);
    });
  } catch (e) {
    res.json({
      Error: e.message + "Error in grabbing data from an external source",
    });
  }
});

// GET one entity identified by BorrowerId from an external source
router.get("/:externalSourceName/:borrowerId", async (req, res) => {
  try {
    console.log("sos");
    const BorrowerId = req.params.borrowerId;
    const externalSourceName = req.params.externalSourceName;
    const dbCollection = await DbConnection.getCollection(externalSourceName);
    const singleEntity = await dbCollection.findOne({ BorrowerId: BorrowerId });
    res.json(singleEntity);
  } catch (err) {
    res.json({ Error: "Db Call error: " + err.message });
  }
});

/************************************************************************************************************************** */
router.get("/:externalSourceName/loan/all", async (req, res) => {
  try {
    const PrimaryBorrowerTIN = req.params.primaryborrowertin;
    const externalSourceName = req.params.externalSourceName;

    const dbCollection = await DbConnection.getCollection(externalSourceName);
    const singleLoan = await dbCollection
      .find({ DataType: "loan" })
      .toArray((err, result) => {
        if (err) throw new Error(err);
        res.json(result);
      });
  } catch (err) {
    res.json({ Error: "Db Call error: " + err.message });
  }
});

// GET one loan identified by primary borrower tin from an external source

router.get(
  "/:externalSourceName/loan/:primaryborrowertin",
  async (req, res) => {
    try {
      const PrimaryBorrowerTIN = req.params.primaryborrowertin;
      const externalSourceName = req.params.externalSourceName;

      const dbCollection = await DbConnection.getCollection(externalSourceName);
      const singleLoan = await dbCollection.findOne({
        $and: [{ DataType: "loan" }, { PrimaryBorrowerTIN }],
      });

      res.json(singleLoan);
    } catch (err) {
      res.json({ Error: "Db Call error: " + err.message });
    }
  }
);



module.exports = router;
