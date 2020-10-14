// import modules
const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");
const dateTimeHelper = require("../utils/dateTimeHelper");

// db setup
const DbConnection = require("../db");

// GET configuration connected to a company
router.get("/:companyId", async (req, res) => {
  const companyId = req.params.companyId;

  try {
    const dbCollection = await DbConnection.getCollection(
      "Entities_Configuration"
    );
    const entityConfiguration = await dbCollection.findOne({
      company_id: ObjectId(companyId),
    });
    res.json(entityConfiguration);
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
