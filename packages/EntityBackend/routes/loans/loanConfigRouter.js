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
    const loanConfig = await DbConnection.getCollection(
      "LoanAPIconfiguration"
    );

    const loanConfigurations = await loanConfig
    .find({
      companyId: ObjectId(companyId),
    })
    .toArray((err, result) => {
      if (err) throw new Error(err);
      res.json(result);
    });
}  catch (e) {
    res.json({
      Error: e.message + "Error in grabbing configuration settings",
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
      $and: [{ companyId: ObjectId(companyId) }, { loanID: loanId }],
    });
    if (!loanConfig){
      await LoanAPIconfiguration.insertOne({
        loanID:loanId,
        companyId:ObjectId(companyId),
        loanConfiguration: [],
      })
      res.json([])
    } else { 
      let loanConfiguration = loanConfig.loanConfiguration;

      //Using loan configurations to look up custom apis that exist in our db
      const customApiCollection = await DbConnection.getCollection(
        "CustomApiRequests"
      );

      let customApis = [];

      if (!loanConfiguration) {
        res.json({ Error: "Loan configuration does not exist" });
      } else {
        for (let i = 0; i < loanConfiguration.length; i++) {
          let customApiId = loanConfiguration[i];

          let singleCustomApi = await customApiCollection.findOne({
            $and: [
              { company_id: ObjectId(companyId) },
              { _id: ObjectId(customApiId) },
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
      Error: e.message + "Error in grabbing configuration settings",
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
      $and: [{ companyId: ObjectId(companyId) }, { loanID: loanId }],
    });
    console.log(req.body)
    /** Each loan should have one configuration setting for loan dashboard.
    So we are resetting and adding a new updated configuration setting.**/

    if (existingloanConfiguration) {
      console.log("are we really here")
      await dbCollection.deleteOne({
        loanID: loanId
      });
      console.log("did it delete")
    }

    let final = await dbCollection.insertOne({
      loanConfiguration,
      loanID: loanId,
      companyId: ObjectId(companyId),
      createdAt: dateTimeHelper.getTimeStamp(),
    });
    console.log('final', final)

    res.json({ message: "Loan Configuration Added" });
  } catch (error) {
    res.json({ Error: error.message });
  }
});

module.exports = router;
