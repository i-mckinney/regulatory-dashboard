// import modules
const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");
const dateTimeHelper = require("../utils/dateTimeHelper");
const customApiRequestTest = require("../helpers/customApiRequestTest");

// db setup
const DbConnection = require("../db");

// GET all the custom API requests for a company in a specific group

router.get("/companies/:id/customapi/:group", async (req, res) => {
  try {
    const companyId = req.params.id;
    const requestGroup = req.params.group;

    const dbCollection = await DbConnection.getCollection("CustomApiRequests");
    const customAPIs = await dbCollection
      .find( {$and: [
        { company_id: ObjectId(companyId) },
        { requestGroup },
      ]})
      .toArray((err, result) => {
        if (err) throw err;
        res.json(result);
      });
  } catch (err) {
    throw new Error("Db Call error: " + err.message);
  }
});


// GET all the custom API requests for a company
router.get("/companies/:id/customapi", async (req, res) => {
  try {
    const companyId = req.params.id;
    const dbCollection = await DbConnection.getCollection("CustomApiRequests");
    const customAPIs = await dbCollection
      .find({ company_id: ObjectId(companyId) })
      .toArray((err, result) => {
        if (err) throw err;
        res.json(result);
      });
  } catch (err) {
    throw new Error("Db Call error: " + err.message);
  }
});


// GET one specific custom api request from a company
router.get("/companies/:id/customapi/:customApiId", async (req, res) => {
  try {
    const companyId = req.params.id;
    const customApiId = req.params.customApiId;
    const dbCollection = await DbConnection.getCollection("CustomApiRequests");
    const customAPI = await dbCollection.findOne({
      $and: [
        { company_id: ObjectId(companyId) },
        { _id: ObjectId(customApiId) },
      ],
    });

    if (!customAPI) {
      res.json({
        error: "Custom Api request with given id doesn't exist",
      });
    }

    res.json(customAPI);
  } catch (e) {
    res.json({
      ErrorStatus: e.status,
      ErrorMessage: e.message,
    });
  }
});

// POST (create) a custom API request
router.post("/companies/:id/customapi", async (req, res) => {
  try {
    const companyId = req.params.id;
    const newCustomApi = req.body;

    if (newCustomApi["_id"] || newCustomApi["company_id"])
      throw Error(
        "Not allowed to manually give _id to new custom api or company_id"
      );

    const dbCollection = await DbConnection.getCollection("CustomApiRequests");
    let customApiRequests = await dbCollection.find().toArray();

    await dbCollection.insertOne({
      ...newCustomApi,
      company_id: ObjectId(companyId),
      createdAt: dateTimeHelper.getTimeStamp(),
    });

    // return added custom api
    customApiRequests = await dbCollection
      .find({ company_id: ObjectId(companyId) })
      .toArray();
    const apiRequestJustAdded = customApiRequests[customApiRequests.length - 1];
    res.json(apiRequestJustAdded);
  } catch (error) {
    res.json({ Error: error.message });
  }
});

// PUT (update) a custom API request
router.put("/companies/:id/customapi/:customApiId", async (req, res) => {
  try {
    const companyId = req.params.id;
    const customApiId = req.params.customApiId;
    const updatedCustomApi = req.body;

    if (updatedCustomApi["_id"] || updatedCustomApi["company_id"])
      throw Error(
        "Not allowed to manually update _id of a company or a custom api request"
      );

    const dbCollection = await DbConnection.getCollection("CustomApiRequests");
    const customAPI = await dbCollection.findOne({
      $and: [
        { company_id: ObjectId(companyId) },
        { _id: ObjectId(customApiId) },
      ],
    });

    if (!customAPI) {
      res.json({
        error: "Custom Api request with given id doesn't exist",
      });
    }

    await dbCollection.updateOne(
      {
        $and: [
          { company_id: ObjectId(companyId) },
          { _id: ObjectId(customApiId) },
        ],
      },
      { $set: updatedCustomApi }
    );

    // return updated custom api request
    const customApi = await dbCollection.findOne({
      $and: [
        { company_id: ObjectId(companyId) },
        { _id: ObjectId(customApiId) },
      ],
    });
    res.json(customApi);
  } catch (error) {
    res.json({ Error: error.message });
  }
});

// DELETE a single custom api request
router.delete("/companies/:id/customapi/:customApiId", async (req, res) => {
  const companyId = req.params.id;
  const customApiId = req.params.customApiId;

  console.log("Delete customApiId with id: ", customApiId);

  try {
    const dbCollection = await DbConnection.getCollection("CustomApiRequests");
    const customApi = await dbCollection.findOne({
      $and: [
        { company_id: ObjectId(companyId) },
        { _id: ObjectId(customApiId) },
      ],
    });

    //When we remove a custom api, we need to make sure to delete custom api that is selected in entity configruation
    const entityConfigCollection = await DbConnection.getCollection(
      "Entities_Configuration"
    );
    const entityConfigurationData = await entityConfigCollection.findOne({
      company_id: ObjectId(companyId),
    });
    console.log(entityConfigurationData, "entityconfig data");
    let entityConfiguration = entityConfigurationData.entityConfiguration;

    if (!customApi) {
      res.json({
        error: "Custom API with given id doesn't exist",
      });
    } else {
      await dbCollection.deleteOne({
        $and: [
          { company_id: ObjectId(companyId) },
          { _id: ObjectId(customApiId) },
        ],
      });

      if (entityConfiguration) {
        for (let i = 0; i < entityConfiguration.length; i++) {
          if (customApiId === entityConfiguration[i]) {
            //remove that custom api and update entity configs
            entityConfiguration.splice(i, 1);

            await entityConfigCollection.updateOne(
              { company_id: ObjectId(companyId) },
              { $set: {"entityConfiguration":entityConfiguration} } 
            );
          }
        }
      }

      // return success message
      res.json({
        Success: "Custom API successfully deleted",
      });
    }
  } catch (error) {
    res.json({
      Error: error.message,
    });
  }
});

//Testing Custom API call (This route is specifically meant for Test Request button in custom apis table )
router.get(
  "/companies/:id/customapi/:customApiId/test/:borrowerId",
  async (req, res) => {
    try {
      const companyId = req.params.id;
      const customApiId = req.params.customApiId;
      const borrowerId = req.params.borrowerId;

      const dbCollection = await DbConnection.getCollection(
        "CustomApiRequests"
      );
      const customApi = await dbCollection.findOne({
        $and: [
          { company_id: ObjectId(companyId) },
          { _id: ObjectId(customApiId) },
        ],
      });

      if (!customApi) {
        res.json({
          error: "Custom Api request with given id doesn't exist",
        });
      }

      if (customApi) {
        const result = await customApiRequestTest(customApi, borrowerId);
        res.json(result);
      }
    } catch (e) {
      res.json({
        ErrorStatus: e.status,
        ErrorMessage: e.message,
      });
    }
  }
);

module.exports = router;
