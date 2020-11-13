// import modules
const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");
const dateTimeHelper = require("../utils/dateTimeHelper");
const customApiRequestTest = require("../helpers/customApiRequestTest");

// db setup
const DbConnection = require("../db");

// GET base route
router.get("/", async (req, res) => {
  res.json({ServerName: "Company Backend"});
});
// GET all companies
router.get("/companies", async (req, res) => {
  const dbCollection = await DbConnection.getCollection("Company_Portal");
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
    const dbCollection = await DbConnection.getCollection("Company_Portal");
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

    console.log("Adding new company: ", newCompany);
    if (newCompany["_id"])
      throw Error("Not allowed to manually give _id to new Company");

    const dbCollection = await DbConnection.getCollection("Company_Portal");
    let companies = await dbCollection.find().toArray();

    await dbCollection.insertOne({
      ...newCompany,
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

    const dbCollection = await DbConnection.getCollection("Company_Portal");
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
    const dbCollection = await DbConnection.getCollection("Company_Portal");
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


module.exports = router;
