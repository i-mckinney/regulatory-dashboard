const faker = require("faker");
const { v4: uuidv4 } = require("uuid");
const { ErrorFieldGenerator } = require("./ErrorFieldGenerator");

const DbConnection = require("../db");

//function that gets invoked on mount to generate fake data.
//if data has been generated, would not get produce more data.
const GenerateData = async () => {
  try {
    const dbCollectionFISTest = await DbConnection.getCollection("FIS");
    const fisData = await dbCollectionFISTest.find().toArray();
    if (fisData.length > 0) return;

    const FISEntities = [];

    // i limit would detertmine number of entities for fake data
    for (let i = 0; i < 5; i++) {
      var BorrowerId = uuidv4();

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
        ExternalSource: "FIS",
        BorrowerId,
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

    var SalesForceEntities = ErrorFieldGenerator(FISEntities, "SalesForce");
    var DataWarehouseEntities = ErrorFieldGenerator(FISEntities, "DataWarehouse");
    var TemenosEntities = ErrorFieldGenerator(FISEntities, "Temenos");

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
    } catch (e) {
      throw new Error(e.message);
    }
  } catch (e) {
    throw new Error(e);
  }
};

module.exports = GenerateData;
