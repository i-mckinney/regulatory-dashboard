// import modules
const express = require("express");
const faker = require("faker");
const router = express.Router();
const { ObjectId } = require("mongodb");
const dateTimeHelper = require("../utils/dateTimeHelper");

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

// GET all FIS
router.get("/fis/generate/fakedata", async(req, res) => {
  const fisEntitites = [];

  for (let i = 0; i < 20; i++) {
    var RelationshipName = faker.company.companyName(); // Rowan Nikolaus
    var BorrowerName = RelationshipName // Rowan Nikolaus
    var DepositorName = RelationshipName // Rowan Nikolaus

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

    var phoneTypes = ["Office", "Mobile", "Home"]
    var randomPhoneType = Math.floor(Math.random()*3)
    var PhoneTypeOne = phoneTypes[randomPhoneType]
    var PhoneTypeTwo = phoneTypes[randomPhoneType]
    var PhoneTypeThree = phoneTypes[randomPhoneType]




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

    var entityTypes = ["S-Corp", "C-Corp", "LLC", "Sole Prop"]
    var randomType = Math.floor(Math.random()*4)
    var EntityType = entityTypes[randomType]


    var CostCenter;
    do {
      CostCenter = Math.floor(Math.random() * 999);
    } while (CostCenter < 100);    
    
    
    var RelationshipManager =
      faker.name.firstName() + "" + faker.name.lastName();
    var PrimaryContact = faker.name.firstName() + "" + faker.name.lastName();

    var BorrowerRiskRating = Math.floor(Math.random() * 10)
    var GuarantorRiskRating = Math.floor(Math.random() * 10)

    const singleEntity = {
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
    fisEntitites.push(singleEntity);
  }
  

  const BASEFIELDS= [
    'RelationshipName',
    'BorrowerName',
    'DepositorName',
    'HQStreetAddress',
    'HQCity',
    'HQState',
    'HQPostalCode',
    'HQCountry',
    'MailingAddress',
    'MailingCity',
    'MailingState',
    'MailingPostalCode',
    'MailingAddressCountry',
    'PhoneNumberOne',
    'PhoneNumberTwo',
    'PhoneNumberThree',
    'PhoneTypeOne',
    'PhoneTypeTwo',
    'PhoneTypeThree',
    'EmailOne',
    'EmailTwo',
    'EmailThree',
    'MasterID',
    'BorrowerID',
    'DepositorID',
    'AccountOne',
    'AccountTwo',
    'AccountThree',
    'TIN',
    'EntityType',
    'CostCenter',
    'NACISCode',
    'RelationshipManager',
    'PrimaryContact',
    'BorrowerRiskRating',
    'GuarantorRiskRating',
  ]
  
 const SalesForce = fisEntitites.map(entity => {
  var randomFieldLimit = Math.floor(Math.random()*14)
  var copyEntity = {...entity}
  for (let i = 0 ; i <randomFieldLimit; i++){
    var randomField = Math.floor(Math.random()*35)
    var randomChosen = BASEFIELDS[randomField]
    copyEntity[randomChosen] = faker.system.commonFileName() + " (DataError)"

  }
  return copyEntity
})

const DataWarehouse = fisEntitites.map(entity => {
  var randomFieldLimit = Math.floor(Math.random()*14)
  var copyEntity = {...entity}
  for (let i = 0 ; i <randomFieldLimit; i++){
    var randomField = Math.floor(Math.random()*35)
    var randomChosen = BASEFIELDS[randomField]
    copyEntity[randomChosen] = faker.system.commonFileName() + " (DataError)"

  }
  return copyEntity
})

const Temenos = fisEntitites.map(entity => {
  var randomFieldLimit = Math.floor(Math.random()*14)
  var copyEntity = {...entity}
  for (let i = 0 ; i <randomFieldLimit; i++){
    var randomField = Math.floor(Math.random()*35)
    var randomChosen = BASEFIELDS[randomField]
    copyEntity[randomChosen] = faker.system.commonFileName() + " (DataError)"

  }
  return copyEntity
})

  const dbCollectionFIS = await DbConnection.getCollection("FIS");
  const dbCollectionSalesforce = await DbConnection.getCollection("Salesforce");
  const dbCollectionTemenos = await DbConnection.getCollection("Temenos");
  const dbCollectionDataWarehouse = await DbConnection.getCollection("DataWarehouse");

  await dbCollectionFIS.insert(fisEntitites);
  await dbCollectionSalesforce.insert(SalesForce);
  await dbCollectionTemenos.insert(Temenos);
  await dbCollectionDataWarehouse.insert(DataWarehouse);

  res.json("success")

});


// GET all companies
router.get("/fis/entities", async (req, res) => {
  const dbCollection = await DbConnection.getCollection("FIS");
  const companies = await dbCollection.find().toArray((err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// GET all companies
router.get("/Salesforce/entities", async (req, res) => {
  const dbCollection = await DbConnection.getCollection("Salesforce");
  const companies = await dbCollection.find().toArray((err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// GET all companies
router.get("/Temenos/entities", async (req, res) => {
  const dbCollection = await DbConnection.getCollection("Temenos");
  const companies = await dbCollection.find().toArray((err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// GET all companies
router.get("/DataWarehouse/entities", async (req, res) => {
  const dbCollection = await DbConnection.getCollection("DataWarehouse");
  const companies = await dbCollection.find().toArray((err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

module.exports = router;
