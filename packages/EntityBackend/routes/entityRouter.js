// import modules
const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");
const TableDataGenerator = require("../Helper/TableDataGenerator");
const { TableHeaders } = require("../Helper/constants");

// db setup
const DbConnection = require("../db");

/**************************************************************************************************************************************************** */

// GET all entities existing in external Source
router.get("/entities/:externalSource", async (req, res) => {
  const externalSourceName = req.params.externalSource;
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

// Generate aggregated responses from multiple external sources for a specified user
router.get("/entities/:id/aggregated", async (req, res) => {
  try {
    const userId = req.params.id;
    const companyProfileList = [
      "FIS",
      "Temenos",
      "SalesForce",
      "DataWarehouse",
    ];
    const entityList = [];

    for (let i = 0; i < companyProfileList.length; i++) {
      var dbCollection = await DbConnection.getCollection(
        companyProfileList[i]
      );
      entityList.push(await dbCollection.findOne({ userId: userId }));
    }
    const TableData = TableDataGenerator(entityList);

    res.json({ TableHeaders, TableData });
  } catch (err) {
    res.json({ ErrorStatus: err.status, ErrorMessage: err.message });
  }
});

// GET one entity identified by userId from the specified external source
router.get("/entities/:externalSource/:id/", async (req, res) => {
  try {
    const userId = req.params.id;
    const externalSource = req.params.externalSource;
    const dbCollection = await DbConnection.getCollection(externalSource);
    const singleEntity = await dbCollection.findOne({ userId: userId });
    res.json(singleEntity);
  } catch (err) {
    res.json({ Error: "Db Call error: " + err.message });
  }
});

module.exports = router;
