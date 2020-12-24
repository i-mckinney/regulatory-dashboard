// import modules
const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");
const dateTimeHelper = require("../utils/dateTimeHelper");

// db setup
const DbConnection = require("../db");

// GET entity configuration with custom api innformation connected to a company
router.get("/:companyId", async (req, res) => {
  const companyId = req.params.companyId;

  try {
    //Setting up entity configurations
    const entityConfigCollection = await DbConnection.getCollection(
      "Entities_Configuration"
    );
    const entityConfigurationData = await entityConfigCollection.findOne({
      company_id: ObjectId(companyId),
    });

    let entityConfiguration = entityConfigurationData.entityConfiguration;

    //Using entity configurations to look up custom apis that exist in our db
    const customApiCollection = await DbConnection.getCollection(
      "CustomApiRequests"
    );

    let customApis = [];

    if (!entityConfiguration) {
      res.json({ Error: "Entity configuration does not exist" });
    } else {
      for (let i = 0; i < entityConfiguration.length; i++) {
        let customApiId = entityConfiguration[i];

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
  } catch (e) {
    res.json({
      Error: e.message + "Error in grabbing configuration settings",
    });
  }
});

// POST (create) a new Entity configuration
router.post("/:companyId", async (req, res) => {
  try {
    const companyId = req.params.companyId;
    const newEntityConfiguration = req.body;

    if (newEntityConfiguration["_id"] || newEntityConfiguration["company_id"])
      throw Error(
        "Not allowed to manually give _id to new entity or company_id"
      );

    const dbCollection = await DbConnection.getCollection(
      "Entities_Configuration"
    );
    let entityConfiguration = await dbCollection.findOne({
      company_id: ObjectId(companyId),
    });

    /** Each company should have one configuration setting for entity dashboard.
    So we are resetting and adding a new updated configuration setting.**/

    if (entityConfiguration) {
      await dbCollection.deleteOne({ company_id: ObjectId(companyId) });
    }
    await dbCollection.insertOne({
      ...newEntityConfiguration,
      company_id: ObjectId(companyId),
      createdAt: dateTimeHelper.getTimeStamp(),
    });

    //Resetting saved changes
    const reportCollection = await DbConnection.getCollection(
      "DiscrepanciesReport"
    );

    await reportCollection.deleteMany({ company_id: ObjectId(companyId) });

    // return added entity configuration
    entityConfiguration = await dbCollection
      .find({ company_id: ObjectId(companyId) })
      .toArray();
    const entityJustAdded = entityConfiguration[entityConfiguration.length - 1];
    res.json(entityJustAdded);
  } catch (error) {
    res.json({ Error: error.message });
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
      $and: [{ company_id: ObjectId(companyId) }, { loanId: loanId }],
    });

    let loanConfiguartion = loanConfig.loanConfiguartion;

    //Using loan configurations to look up custom apis that exist in our db
    const customApiCollection = await DbConnection.getCollection(
      "CustomApiRequests"
    );

    let customApis = [];

    if (!loanConfiguartion) {
      res.json({ Error: "Loan configuration does not exist" });
    } else {
      for (let i = 0; i < loanConfiguartion.length; i++) {
        let customApiId = loanConfiguartion[i];

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

    const { loanId, loanConfiguartion } = req.body;

    const dbCollection = await DbConnection.getCollection(
      "LoanAPIconfiguration"
    );

    let existingloanConfiguartion = await dbCollection.findOne({
      $and: [{ company_id: ObjectId(companyId) }, { loanId: loanId }],
    });

    /** Each loan should have one configuration setting for entity dashboard.
    So we are resetting and adding a new updated configuration setting.**/

    if (existingloanConfiguartion) {
      await dbCollection.deleteOne({
        $and: [{ company_id: ObjectId(companyId) }, { loanId: loanId }],
      });
    }

    await dbCollection.insertOne({
      loanConfiguartion,
      loanId,
      company_id: ObjectId(companyId),
      createdAt: dateTimeHelper.getTimeStamp(),
    });

    res.json({ message: "Loan Configuration Added" });
  } catch (error) {
    res.json({ Error: error.message });
  }
});

module.exports = router;
