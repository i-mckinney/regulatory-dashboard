// import modules
const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");
const dateTimeHelper = require("../utils/dateTimeHelper");

// db setup
const DbConnection = require("../db");
const { company } = require("faker");

// GET configuration with custom api innformation connected to a company
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

module.exports = router;
