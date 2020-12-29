// import modules
const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");
const dateTimeHelper = require("../../utils/dateTimeHelper");

// db setup
const DbConnection = require("../../db");

// GET all loan configurations connected a company
router.get("/:companyId", async (req, res) => {
  const companyId = req.params.companyId;

  try {
    //Setting up loan API configurations
    const loanConfig = await DbConnection.getCollection("LoanAPIconfiguration");

    const loanConfigurations = await loanConfig
      .find({
        companyId: ObjectId(companyId),
      })
      .toArray((err, result) => {
        if (err) throw new Error({ status: err.status, message: err.message });
        res.json(result);
      });
  } catch (e) {
    res.json({
      status: e.status,
      message: e.message + "Error in grabbing loan configuration settings",
    });
  }
});

// GET API configuration for a single loan
router.get("/:companyId/:loanId", async (req, res) => {
  const companyId = req.params.companyId;
  const loanId = req.params.loanId;

  try {
    //Setting up loan configurations
    const LoanAPIconfiguration = await DbConnection.getCollection(
      "LoanAPIconfiguration"
    );
    const loanConfig = await LoanAPIconfiguration.findOne({
      $and: [{ companyId: ObjectId(companyId) }, { loanId: loanId }],
    });

    if (!loanConfig) {
      await LoanAPIconfiguration.insertOne({
        loanId: loanId,
        companyId: ObjectId(companyId),
        loanConfiguration: [],
        createdAt: dateTimeHelper.getTimeStamp(),
      });

      res.json([]);
    } else {
      let loanConfiguration = loanConfig.loanConfiguration;

      //Using loan configurations to look up custom apis that exist in our db
      const customApiCollection = await DbConnection.getCollection(
        "CustomApiRequests"
      );

      let customApis = [];

      if (!loanConfiguration) {
        res.json({ status: 400, message: "Loan configuration does not exist" });
      } else {
        for (let i = 0; i < loanConfiguration.length; i++) {
          let customAPIid = loanConfiguration[i];

          let singleCustomApi = await customApiCollection.findOne({
            $and: [
              { company_id: ObjectId(companyId) },
              { _id: ObjectId(customAPIid) },
            ],
          });

          if (singleCustomApi) {
            customApis.push(singleCustomApi);
          } else {
            customApis.push(null);
          }
        }
      }

      res.json(customApis);
    }
  } catch (e) {
    res.json({
      status: e.status,
      message: e.message + "Error in grabbing configuration settings",
    });
  }
});

// POST (create) a new Loan configuration
router.post("/:companyId/:loanId", async (req, res) => {
  try {
    const companyId = req.params.companyId;

    const { loanId, loanConfiguration } = req.body;

    const dbCollection = await DbConnection.getCollection(
      "LoanAPIconfiguration"
    );

    let existingloanConfiguration = await dbCollection.findOne({
      $and: [{ companyId: ObjectId(companyId) }, { loanId: loanId }],
    });

    /** Each loan should have one configuration setting.
    So we are resetting and adding a new updated configuration setting.**/

    if (existingloanConfiguration) {
      await dbCollection.deleteOne({
        $and: [{ companyId: ObjectId(companyId) }, { loanId: loanId }],
      });
    }

    let newLoanConfiguration = await dbCollection.insertOne({
      loanConfiguration,
      loanId: loanId,
      companyId: ObjectId(companyId),
      createdAt: dateTimeHelper.getTimeStamp(),
    });

    res.json({ status: 200, message: "Loan Configuration successfully added" });
  } catch (error) {
    res.json({ Error: error.message });
  }
});

module.exports = router;
