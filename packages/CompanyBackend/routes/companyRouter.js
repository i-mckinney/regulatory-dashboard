// import modules
const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const { ObjectId } = require("mongodb");
const dateTimeHelper = require("../utils/dateTimeHelper");
const customAPIrequest = require("../helpers/customAPIrequest");

// db setup
const DbConnection = require("../db");

// GET all companies
router.get("/companies", async (req, res) => {
  const dbCollection = await DbConnection.getCollection("helixcompany");
  console.log(dbCollection);
  const companies = await dbCollection.find().toArray((err, result) => {
    console.log(result);
    if (err) throw err;
    res.json(result);
  });
});

// GET one company identified by id
router.get("/companies/:id", async (req, res) => {
  try {
    const companyId = req.params.id;
    const dbCollection = await DbConnection.getCollection("helixcompany");
    const company = await dbCollection.findOne({ _id: ObjectId(companyId) });
    res.json(company);
  } catch (err) {
    throw new Error("Db Call error: " + err.message);
  }
});

// POST (create) a company
router.post("/companies", async (req, res) => {
  try {
    const newCompany = req.body;

    if (!newCompany.CustomApiRequests) {
      newCompany.CustomApiRequests = [];
    }

    console.log("Adding new company: ", newCompany);
    if (newCompany["_id"])
      throw Error("Not allowed to manually give _id to new Company");

    const dbCollection = await DbConnection.getCollection("helixcompany");
    let companies = await dbCollection.find().toArray();

    await dbCollection.insertOne({
      ...newCompany,
      createdAt: dateTimeHelper.getTimeStamp(),
    });

    // return updated list
    companies = await dbCollection.find().toArray();
    res.json(companies);
  } catch (error) {
    res.json({ Error: error.message });
  }
});

// PUT (update) a company
router.put("/companies/:id", async (req, res) => {
  try {
    const companyId = req.params.id;
    const updatedcompany = req.body;
    console.log("Editing company ", companyId, " to be ", updatedcompany);

    if (updatedcompany["_id"])
      throw Error("Not allowed to manually update _id of a company");

    const dbCollection = await DbConnection.getCollection("helixcompany");
    const company = await dbCollection.findOne({ _id: ObjectId(companyId) });

    if (!company) {
      res.json({
        error: "Company with given id doesn't exist",
      });
    }

    updatedcompany.updatedAt = dateTimeHelper.getTimeStamp();
    await dbCollection.updateOne(
      { _id: ObjectId(companyId) },
      { $set: updatedcompany }
    );

    // return updated company
    const companies = await dbCollection.findOne({ _id: ObjectId(companyId) });
    res.json(companies);
  } catch (error) {
    res.json({ Error: error.message });
  }
});

// DELETE a company
router.delete("/companies/:id", async (req, res) => {
  const companyId = req.params.id;
  console.log("Delete Company with id: ", companyId);

  try {
    const dbCollection = await DbConnection.getCollection("helixcompany");
    const company = await dbCollection.findOne({ _id: ObjectId(companyId) });

    if (!company) {
      res.json({
        error: "Company with given id doesn't exist",
      });
    } else {
      await dbCollection.deleteOne({ _id: ObjectId(companyId) });

      // return success message
      res.json({
        Success: "Company successfully deleted",
      });
    }
  } catch (error) {
    console.log(error.message);
    res.json({
      Error: error.message,
    });
  }
});

//Retrieves specific custom api and dispatches custom api.
router.get("/customapi/:apiCustomId", async (req, res) => {
  try {
    const customId = req.params.apiCustomId;
    const dbCollection = await DbConnection.getCollection("helixcompany");
    const company = await dbCollection.findOne({},{
      CustomApiRequests: { $elemMatch: { _id: customId } },
    })
    if (company){
    const customAPI = company.CustomApiRequests.find(request => request._id === customId)
    const result = await customAPIrequest(customAPI);
    res.json(result);
    }
  } catch (e) {
    res.json({
      ErrorStatus: e.status,
      ErrorMessage: e.message,
    });
  }
});

module.exports = router;

