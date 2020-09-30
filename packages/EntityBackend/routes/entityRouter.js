// import modules
const express = require("express");
const router = express.Router();
const faker = require("faker");
const { v4: uuidv4 } = require("uuid");
const { ObjectId } = require("mongodb");
const { ErrorFieldGenerator } = require("../Helper/ErrorFieldGenerator");
const TableDataGenerator = require("../Helper/TableDataGenerator");
const { TableHeaders } = require("../Helper/constants");

// db setup
const DbConnection = require("../db");

/**************************************************************************************************************************************************** */
// Generate Fake Data for entities

router.get("/entities/generate", async (req, res) => {
  const FISEntities = [];

  // i limit would detertmine number of entities for fake data
  for (let i = 0; i < 10; i++) {
    var userId = uuidv4();

    var RelationshipName = faker.company.companyName();
    var BorrowerName = RelationshipName;
    var DepositorName = RelationshipName;

    var HQStreetAddress = faker.address.streetAddress();
    var HQCity = faker.address.city();
    var HQState = faker.address.state();
    var HQPostalCode = faker.address.zipCode();
    var HQCountry = faker.address.country();
    var MailingAddress = faker.address.streetAddress();
    var MailingCity = faker.address.city();
    var MailingState = faker.address.state();
    var MailingPostalCode = faker.address.zipCode();
    var MailingAddressCountry = faker.address.country();

    var PhoneNumberOne = faker.phone.phoneNumber();
    var PhoneNumberTwo = faker.phone.phoneNumber();
    var PhoneNumberThree = faker.phone.phoneNumber();

    var phoneTypes = ["Office", "Mobile", "Home"];
    var randomPhoneType = Math.floor(Math.random() * 3);
    var PhoneTypeOne = phoneTypes[randomPhoneType];
    var PhoneTypeTwo = phoneTypes[randomPhoneType];
    var PhoneTypeThree = phoneTypes[randomPhoneType];

    var EmailOne = faker.internet.email();
    var EmailTwo = faker.internet.email();
    var EmailThree = faker.internet.email();

    var EmailOne = faker.internet.email();
    var EmailTwo = faker.internet.email();
    var EmailThree = faker.internet.email();

    var MasterID = faker.finance.account();
    var BorrowerID = faker.finance.account();
    var DepositorID = faker.finance.account();
    var AccountOne = faker.finance.account();
    var AccountTwo = faker.finance.account();
    var AccountThree = faker.finance.account();
    var TIN = faker.finance.account();
    var NACISCode = faker.finance.account();

    var entityTypes = ["S-Corp", "C-Corp", "LLC", "Sole Prop"];
    var randomType = Math.floor(Math.random() * 4);
    var EntityType = entityTypes[randomType];

    var CostCenter;
    do {
      CostCenter = Math.floor(Math.random() * 999);
    } while (CostCenter < 100);

    var RelationshipManager =
      faker.name.firstName() + "" + faker.name.lastName();
    var PrimaryContact = faker.name.firstName() + "" + faker.name.lastName();

    var BorrowerRiskRating = Math.floor(Math.random() * 10);
    var GuarantorRiskRating = Math.floor(Math.random() * 10);

    const singleEntity = {
      userId,
      RelationshipName,
      BorrowerName,
      DepositorName,
      HQStreetAddress,
      HQCity,
      HQState,
      HQPostalCode,
      HQCountry,
      MailingAddress,
      MailingCity,
      MailingState,
      MailingPostalCode,
      MailingAddressCountry,
      PhoneNumberOne,
      PhoneNumberTwo,
      PhoneNumberThree,
      PhoneTypeOne,
      PhoneTypeTwo,
      PhoneTypeThree,
      EmailOne,
      EmailTwo,
      EmailThree,
      MasterID,
      BorrowerID,
      DepositorID,
      AccountOne,
      AccountTwo,
      AccountThree,
      TIN,
      EntityType,
      CostCenter,
      NACISCode,
      RelationshipManager,
      PrimaryContact,
      BorrowerRiskRating,
      GuarantorRiskRating,
    };
    FISEntities.push(singleEntity);
  }

  var SalesForceEntities = ErrorFieldGenerator(FISEntities);
  var DataWarehouseEntities = ErrorFieldGenerator(FISEntities);
  var TemenosEntities = ErrorFieldGenerator(FISEntities);

  try {
    const dbCollectionFIS = await DbConnection.getCollection("FIS");
    const dbCollectionSalesForce = await DbConnection.getCollection(
      "SalesForce"
    );
    const dbCollectionTemenos = await DbConnection.getCollection("Temenos");
    const dbCollectionDataWarehouse = await DbConnection.getCollection(
      "DataWarehouse"
    );

    await dbCollectionFIS.insertMany(FISEntities);
    await dbCollectionSalesForce.insertMany(SalesForceEntities);
    await dbCollectionTemenos.insertMany(TemenosEntities);
    await dbCollectionDataWarehouse.insertMany(DataWarehouseEntities);

    res.json("Data has been successfully generated!");
  } catch (e) {
    res.json({ ErrorMessage: e.message });
  }
});

// Reset Entities
router.get("/entities/reset", async (req, res) => {
  try {
    const companyProfileList = [
      "FIS",
      "Temenos",
      "SalesForce",
      "DataWarehouse",
    ];
    for (let i = 0; i < companyProfileList.length; i++) {
      var dbCollection = await DbConnection.getCollection(
        companyProfileList[i]
      );
      await dbCollection.deleteMany({});
    }
    res.json("Data entities have been cleared out");
  } catch (e) {
    res.json({ ErrorMessage: e.message });
  }
});

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
