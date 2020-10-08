// import modules
const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");
const TableDataGenerator = require("../Helper/TableDataGenerator");
const dateTimeHelper = require("../utils/dateTimeHelper");
const { TableHeaders } = require("../Helper/constants");

// db setup
const DbConnection = require("../db");

/**************************************************************************************************************************************************** */
// GET all entities connected to a company
router.get("/:companyId/entities", async (req, res) => {
  const companyId = req.params.companyId;

  try {
    const dbCollection = await DbConnection.getCollection("Entities");
    const entities = await dbCollection
      .find({ company_id: ObjectId(companyId) })
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

// POST (create) a new Entity
router.post("/:companyId/entities", async (req, res) => {
  try {
    const companyId = req.params.companyId;
    const newEntity = req.body;

    if (newEntity["_id"] || newEntity["company_id"])
      throw Error(
        "Not allowed to manually give _id to new entity or company_id"
      );

    const dbCollection = await DbConnection.getCollection("Entities");

    await dbCollection.insertOne({
      ...newEntity,
      company_id: ObjectId(companyId),
      createdAt: dateTimeHelper.getTimeStamp(),
    });

    // return added entity
    let entities = await dbCollection
      .find({ company_id: ObjectId(companyId) })
      .toArray();
    const entityJustAdded = entities[entities.length - 1];
    res.json(entityJustAdded);
  } catch (error) {
    res.json({ Error: error.message });
  }
});

// GET one specific entity from a company
router.get("/:companyId/entities/:entityId", async (req, res) => {
  try {
    const companyId = req.params.companyId;
    const entityId = req.params.entityId;
    const dbCollection = await DbConnection.getCollection("Entities");
    const entity = await dbCollection.findOne({
      $and: [{ company_id: ObjectId(companyId) }, { _id: ObjectId(entityId) }],
    });

    if (!entity) {
      res.json({
        error: "Entity with given id doesn't exist",
      });
    }

    res.json(entity);
  } catch (e) {
    res.json({
      ErrorStatus: e.status,
      ErrorMessage: e.message,
    });
  }
});

// PUT (update) a entity
router.put("/:companyId/entities/:entityId", async (req, res) => {
  try {
    const companyId = req.params.companyId;
    const entityId = req.params.entityId;
    const updatedEntity = req.body;

    if (updatedEntity["_id"] || updatedEntity["company_id"])
      throw Error(
        "Not allowed to manually update _id of a company or a entity"
      );

    const dbCollection = await DbConnection.getCollection("Entities");
    const entity = await dbCollection.findOne({
      $and: [{ company_id: ObjectId(companyId) }, { _id: ObjectId(entityId) }],
    });

    if (!entity) {
      res.json({
        error: "Entity with given id doesn't exist",
      });
    }

    await dbCollection.updateOne(
      {
        $and: [
          { company_id: ObjectId(companyId) },
          { _id: ObjectId(entityId) },
        ],
      },
      { $set: updatedEntity }
    );

    // return updated Entity
    const updatedEntityInDb = await dbCollection.findOne({
      $and: [{ company_id: ObjectId(companyId) }, { _id: ObjectId(entityId) }],
    });
    res.json(updatedEntityInDb);
  } catch (error) {
    res.json({ Error: error.message });
  }
});

// DELETE a entity
router.delete("/:companyId/entities/:entityId", async (req, res) => {
  const companyId = req.params.companyId;
  const entityId = req.params.entityId;

  console.log("Delete entity with id: ", entityId);

  try {
    const dbCollection = await DbConnection.getCollection("Entities");
    const entity = await dbCollection.findOne({
      $and: [{ company_id: ObjectId(companyId) }, { _id: ObjectId(entityId) }],
    });

    if (!entity) {
      res.json({
        error: "Ebtuty with given id doesn't exist",
      });
    } else {
      await dbCollection.deleteOne({
        $and: [
          { company_id: ObjectId(companyId) },
          { _id: ObjectId(entityId) },
        ],
      });

      // return success message
      res.json({
        Success: `Entity ${entityId} successfully deleted`,
      });
    }
  } catch (error) {
    res.json({
      Error: error.message,
    });
  }
});

/**************************************************************************************************************************************************** */

// GET confiugration connected to a company
router.get("/:companyId/entitiesconfig", async (req, res) => {
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
      Error: e.message + "Error in grabbing data from an external source",
    });
  }
});

// POST (create) a new Entity configuration
router.post("/:companyId/entitiesconfig", async (req, res) => {
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
    const entityConfiguration = await dbCollection.findOne({
      company_id: ObjectId(companyId),
    });

    //EACH company should have one configuration setting for entity dashboard.
    //SO we are resetting and adding a new updated configuration setting.
    
    if (entityConfiguration) {
      await dbCollection.deleteOne({ company_id: ObjectId(companyId) });
    }
    await dbCollection.insertOne({
      ...newEntityConfiguration,
      company_id: ObjectId(companyId),
      createdAt: dateTimeHelper.getTimeStamp(),
    });

    // return added entity configuration
    let returnEntityConfiguration = await dbCollection
      .find({ company_id: ObjectId(companyId) })
      .toArray();
    const entityJustAdded = returnEntityConfiguration[returnEntityConfiguration.length - 1];
    res.json(entityJustAdded);
  } catch (error) {
    res.json({ Error: error.message });
  }
});

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
