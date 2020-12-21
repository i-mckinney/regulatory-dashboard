// import modules
const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");
const dateTimeHelper = require("../utils/dateTimeHelper");

// db setup
const DbConnection = require("../db");

// GET all the global field key collections
router.get("/companies/:id/globalkeys", async (req, res) => {
  try {
    const companyId = req.params.id;
    const dbCollection = await DbConnection.getCollection("GlobalFieldKeys");
    const globalFieldCollections = await dbCollection
      .find({ companyId: ObjectId(companyId) })
      .toArray((err, result) => {
        if (err) throw err;
        res.json(result);
      });
  } catch (err) {
    throw new Error("Db Call error: " + err.message);
  }
});

// GET a single global key collection
router.get(
  "/companies/:id/globalkeys/:globalKeyCollectionId",
  async (req, res) => {
    try {
      const companyId = req.params.id;
      const globalKeyCollectionId = req.params.globalKeyCollectionId;

      const dbCollection = await DbConnection.getCollection("GlobalFieldKeys");
      const globalFieldCollection = await dbCollection.findOne({
        $and: [
          { companyId: ObjectId(companyId) },
          { _id: ObjectId(globalKeyCollectionId) },
        ],
      });

      if (!globalFieldCollection) {
        res.json({
          error: "Global key collection with given id doesn't exist",
        });
      }

      res.json(globalFieldCollection);
    } catch (e) {
      res.json({
        ErrorStatus: e.status,
        ErrorMessage: e.message,
      });
    }
  }
);

// POST (create) a new global key collection
router.post("/companies/:id/globalkeys", async (req, res) => {
  try {
    const companyId = req.params.id;
    const { keyCollectionName } = req.body;

    const dbCollection = await DbConnection.getCollection("GlobalFieldKeys");

    let result = await dbCollection.insertOne({
      keyCollectionName,
      companyId: ObjectId(companyId),
      globalKeys: [],
      createdAt: dateTimeHelper.getTimeStamp(),
    });

    if (result) {
      res.json({
        status: 200,
        message: "Global key collection successfully created",
      });
    } else {
      res.json({
        status: 400,
        message: "Error in creating a new global key collection",
      });
    }
  } catch (error) {
    res.json({ status: error.status, message: error.message });
  }
});

// Patch (update) an existing global key collection
router.patch(
  "/companies/:id/globalkeys/:globalKeyCollectionId",
  async (req, res) => {
    try {
      const companyId = req.params.id;
      const globalKeyCollectionId = req.params.globalKeyCollectionId;
      const { globalKeys } = req.body;

      if (!globalKeys) {
        throw new Error(
          "Please use correct globalKeys:[] format to update the collection"
        );
      }
      const dbCollection = await DbConnection.getCollection("GlobalFieldKeys");

      const keyCollection = await dbCollection.findOne({
        $and: [
          { companyId: ObjectId(companyId) },
          { _id: ObjectId(globalKeyCollectionId) },
        ],
      });

      if (!keyCollection) {
        res.json({
          error: "Global key collection with given id doesn't exist",
        });
      }

      let result = await dbCollection.updateOne(
        {
          $and: [
            { companyId: ObjectId(companyId) },
            { _id: ObjectId(globalKeyCollectionId) },
          ],
        },
        {
          $set: {
            globalKeys: globalKeys,
            updatedAt: dateTimeHelper.getTimeStamp(),
          },
        }
      );

      if (result) {
        res.json({
          status: 200,
          message: "Global key collection successfully updated",
        });
      } else {
        res.json({
          status: 400,
          message: "Error in updating a global key collection",
        });
      }
    } catch (error) {
      res.json({ status: error.status, message: error.message });
    }
  }
);

// DELETE a global collection
router.delete(
  "/companies/:id/globalkeys/:globalKeyCollectionId",
  async (req, res) => {
    const companyId = req.params.id;
    const globalKeyCollectionId = req.params.globalKeyCollectionId;

    console.log(
      "Delete global Key Collection with id: ",
      globalKeyCollectionId
    );

    try {
      const dbCollection = await DbConnection.getCollection("GlobalFieldKeys");

      let result = await dbCollection.deleteOne({
        $and: [
          { companyId: ObjectId(companyId) },
          { _id: ObjectId(globalKeyCollectionId) },
        ],
      });

      if (result) {
        res.json({
          status: 200,
          message: "Global key collection successfully deleted",
        });
      } else {
        res.json({
          status: 400,
          message: "Error in deleting a global key collection",
        });
      }
    } catch (error) {
      res.json({ status: error.status, message: error.message });
    }
  }
);

module.exports = router;
