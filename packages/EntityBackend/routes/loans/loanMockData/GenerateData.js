const faker = require("faker");
const { v4: uuidv4 } = require("uuid");
const { ErrorFieldGenerator } = require("./ErrorFieldGenerator");

const DbConnection = require("../../../db");

//function that gets invoked on mount to generate fake data.
//if data has been generated, would not get produce more data.
const GenerateData = async () => {
  try {
    // const dbCollectionFISTest = await DbConnection.getCollection("FIS");
    // const fisData = await dbCollectionFISTest.find().toArray();
    // if (fisData.length > 0) return;

    const FISLoans = [];

    // i limit would detertmine number of loans for fake data
    for (let i = 0; i < 5; i++) {
      var PrimaryBorrowerTIN = uuidv4();
      var PrimaryBorrowerName = faker.name.findName();
      var GuarantorName = faker.name.findName();

      var PrimaryBorrowerBID = uuidv4();
      var GuarantorBID = uuidv4();
      var GuarantorType = "";

      var LoanID = uuidv4();

      var possibleLoanType = ["Auto", "Mortgage", "Student"];
      var pLTindex = Math.floor(Math.random() * 3);
      var LoanType = possibleLoanType[pLTindex];

      var CommitmentAmount = faker.finance.amount();
      var OutstandingAmount = faker.finance.amount();
      var yesOrNo = ["Yes", "No"];
      var yOnIndex = Math.floor(Math.random() * 2);
      var IsSublimit = yesOrNo[yOnIndex];

      var MaturityTimeFrame = faker.date.past();
      var MatiurityDate = faker.date.future();
      var MaturityValue = faker.finance.amount();

      var possibleInterestRateType = ["Fixed", "Variable", "Discount"];
      var pIRTindex = Math.floor(Math.random() * 3);
      var InterestRateType1 = possibleInterestRateType[pIRTindex];
      var InterestRateType2 = possibleInterestRateType[pIRTindex];
      var InterestRateType3 = possibleInterestRateType[pIRTindex];

      var possibleInterestRate = ["3%", "2.25%", "1.25%"];
      var pIRIndex = Math.floor(Math.random() * 3);
      var InterestRate1 = possibleInterestRate[pIRIndex];
      var InterestRate2 = possibleInterestRate[pIRIndex];
      var InterestRate3 = possibleInterestRate[pIRIndex];

      var InterestRateCeiling = "1.99%";
      var InterestRateFloor = "0.99%";

      var possibleFeeTypes = ["Document", "Facility", "Appraisal", "Lender"]
      var possibleFeeTypesIndex = Math.floor(Math.random() * 4);
      var FeeType = possibleFeeTypes[possibleFeeTypesIndex]

      var FeeAmount =  "$" + (Math.floor(Math.random() * 4)*1000);

      var CollateralTypes = ["ABL", "Equipment", "CRE", "Investor", "Insurance"]
      var CollateralTypesIndex = Math.floor(Math.random() * 5);
      var CollateralType = CollateralTypes[CollateralTypesIndex]

      var RiskRating = Math.floor(Math.random() * 10);
      var OriginalFacilityID = uuidv4()
      var OriginationDate =  faker.date.past();

      var CostCenter;
      do {
        CostCenter = Math.floor(Math.random() * 999);
      } while (CostCenter < 100);

      const singleLoan = {
        ExternalSource: "FIS",
        DataType:"loan",
        PrimaryBorrowerName,
        GuarantorName,
        PrimaryBorrowerBID,
        GuarantorBID,
        GuarantorType,
        PrimaryBorrowerTIN,
        LoanID,
        LoanType,
        CommitmentAmount,
        OutstandingAmount,
        IsSublimit,
        MaturityTimeFrame,
        MatiurityDate,
        MaturityValue,
        InterestRateType1,
        InterestRateType2,
        InterestRateType3,
        InterestRate1,
        InterestRate2,
        InterestRate3,
        InterestRateCeiling,
        InterestRateFloor,
        FeeType,
        FeeAmount,
        CollateralType,
        RiskRating,
        OriginalFacilityID,
        OriginationDate,
        CostCenter,
      };
      FISLoans.push(singleLoan);
    }
    console.log(FISLoans);
    // var SalesForceEntities = ErrorFieldGenerator(FISEntities, "SalesForce");
    // var DataWarehouseEntities = ErrorFieldGenerator(FISEntities, "DataWarehouse");
    // var TemenosEntities = ErrorFieldGenerator(FISEntities, "Temenos");


      const dbCollectionFIS = await DbConnection.getCollection("FIS");
    //   const dbCollectionSalesForce = await DbConnection.getCollection(
    //     "SalesForce"
    //   );
    //   const dbCollectionTemenos = await DbConnection.getCollection("Temenos");
    //   const dbCollectionDataWarehouse = await DbConnection.getCollection(
    //     "DataWarehouse"
    //   );

      await dbCollectionFIS.insertMany(FISLoans);
    //   await dbCollectionSalesForce.insertMany(SalesForceEntities);
    //   await dbCollectionTemenos.insertMany(TemenosEntities);
    //   await dbCollectionDataWarehouse.insertMany(DataWarehouseEntities);
    // } catch (e) {
    //   throw new Error(e.message);
    // }
  } catch (e) {
    throw new Error(e);
  }
};

module.exports = GenerateData;
