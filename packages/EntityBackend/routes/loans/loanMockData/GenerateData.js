const faker = require("faker");
const { v4: uuidv4 } = require("uuid");
const { ErrorFieldGenerator } = require("./ErrorFieldGenerator");

const DbConnection = require("../../../db");

//function that gets invoked on mount to generate fake data.
//if data has been generated, would not get produce more data.
const GenerateData = async () => {
  try {
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

    let mockData =[
      {
          "ExternalSource": "FIS",
          "DataType": "loan",
          "PrimaryBorrowerName": "Camille Keeling",
          "GuarantorName": "Ethel Ebert",
          "PrimaryBorrowerBID": "b090834b-6aae-4412-87b6-959fe331ea3b",
          "GuarantorBID": "e2817a46-ce81-4c5c-993d-4642cc25871f",
          "GuarantorType": "",
          "PrimaryBorrowerTIN": "135af4c5-4e23-4d07-b831-f6c63030bcda",
          "LoanID": "4cf5a281-f1f1-4b7f-9d22-9ab1416a0f64",
          "LoanType": "Student",
          "CommitmentAmount": 585.29,
          "OutstandingAmount": 376.21,
          "IsSublimit": "No",
          "MaturityTimeFrame": "2020-05-28T13:00:06.801Z",
          "MatiurityDate": "2021-04-24T17:46:46.843Z",
          "MaturityValue": 981.31,
          "InterestRateType1": "Discount",
          "InterestRateType2": "Discount",
          "InterestRateType3": "Discount",
          "InterestRate1": "3%",
          "InterestRate2": "3%",
          "InterestRate3": "3%",
          "InterestRateCeiling": "1.99%",
          "InterestRateFloor": "0.99%",
          "FeeType": "Lender",
          "FeeAmount": "$1000",
          "CollateralType": "Equipment",
          "RiskRating": 2,
          "OriginalFacilityID": "99cecb52-1b8b-43ad-9ff0-d61984564d8a",
          "OriginationDate": "2020-04-13T07:16:43.546Z",
          "CostCenter": 352
      },
      {
          "ExternalSource": "FIS",
          "DataType": "loan",
          "PrimaryBorrowerName": "Diane Ruecker",
          "GuarantorName": "Miss Rose Heidenreich",
          "PrimaryBorrowerBID": "88c2cb98-a801-406c-bfaf-23cbd37e602e",
          "GuarantorBID": "61be328a-031f-46c1-97f4-6e919305b662",
          "GuarantorType": "",
          "PrimaryBorrowerTIN": "dda70c84-4d28-4a94-ae40-065f2d21eb8b",
          "LoanID": "7ba28a62-7a86-4428-96b0-5cb49d42eb33",
          "LoanType": "Student",
          "CommitmentAmount": 949.15,
          "OutstandingAmount": 889.79,
          "IsSublimit": "Yes",
          "MaturityTimeFrame": "2020-07-15T15:49:37.954Z",
          "MatiurityDate": "2021-12-17T21:12:18.311Z",
          "MaturityValue": 889.2,
          "InterestRateType1": "Variable",
          "InterestRateType2": "Variable",
          "InterestRateType3": "Variable",
          "InterestRate1": "3%",
          "InterestRate2": "3%",
          "InterestRate3": "3%",
          "InterestRateCeiling": "1.99%",
          "InterestRateFloor": "0.99%",
          "FeeType": "Document",
          "FeeAmount": "$1000",
          "CollateralType": "Investor",
          "RiskRating": 5,
          "OriginalFacilityID": "c4d3f348-ce5f-4c73-a3bf-008b2190ffc6",
          "OriginationDate": "2020-07-28T20:06:44.162Z",
          "CostCenter": 907
      },
      {
          "ExternalSource": "FIS",
          "DataType": "loan",
          "PrimaryBorrowerName": "Ronald Wintheiser",
          "GuarantorName": "Albert Anderson",
          "PrimaryBorrowerBID": "ecc6b6a0-af2b-47a2-9ca8-804d411b1817",
          "GuarantorBID": "c93ec147-20a7-4b9b-b93f-14ab95b93786",
          "GuarantorType": "",
          "PrimaryBorrowerTIN": "08f38903-5b35-4ce3-a9c0-d9f38e0817a9",
          "LoanID": "4ab5068f-63fc-40d0-b07f-deba1df51cec",
          "LoanType": "Student",
          "CommitmentAmount": 994.58,
          "OutstandingAmount": 884.2,
          "IsSublimit": "Yes",
          "MaturityTimeFrame": "2020-08-28T12:26:47.406Z",
          "MatiurityDate": "2021-01-16T20:12:21.610Z",
          "MaturityValue": 657.12,
          "InterestRateType1": "Variable",
          "InterestRateType2": "Variable",
          "InterestRateType3": "Variable",
          "InterestRate1": "2.25%",
          "InterestRate2": "2.25%",
          "InterestRate3": "2.25%",
          "InterestRateCeiling": "1.99%",
          "InterestRateFloor": "0.99%",
          "FeeType": "Document",
          "FeeAmount": "$3000",
          "CollateralType": "Equipment",
          "RiskRating": 0,
          "OriginalFacilityID": "c160d762-329b-4124-b90b-b26d11015168",
          "OriginationDate": "2020-11-13T03:49:32.937Z",
          "CostCenter": 597
      },
      {
          "ExternalSource": "FIS",
          "DataType": "loan",
          "PrimaryBorrowerName": "Lucia Dickens",
          "GuarantorName": "Luke Kuphal",
          "PrimaryBorrowerBID": "ef739533-597d-491c-b5fc-e4136a6d305c",
          "GuarantorBID": "ef0a249c-2d99-4312-b617-22110db722f5",
          "GuarantorType": "",
          "PrimaryBorrowerTIN": "fb12a3e4-2227-4125-8acb-837e2b2602f0",
          "LoanID": "6efe3445-9a62-45e2-b0c4-bcd9a024d09f",
          "LoanType": "Auto",
          "CommitmentAmount": 536.39,
          "OutstandingAmount": 234.21,
          "IsSublimit": "No",
          "MaturityTimeFrame": "2020-12-05T02:36:49.722Z",
          "MatiurityDate": "2021-05-13T04:05:32.897Z",
          "MaturityValue": 109.42,
          "InterestRateType1": "Discount",
          "InterestRateType2": "Discount",
          "InterestRateType3": "Discount",
          "InterestRate1": "3%",
          "InterestRate2": "3%",
          "InterestRate3": "3%",
          "InterestRateCeiling": "1.99%",
          "InterestRateFloor": "0.99%",
          "FeeType": "Document",
          "FeeAmount": "$2000",
          "CollateralType": "Equipment",
          "RiskRating": 4,
          "OriginalFacilityID": "274c25ca-b7d8-4ced-afda-0e86dcf7da25",
          "OriginationDate": "2020-10-29T18:00:41.547Z",
          "CostCenter": 220
      },
      {
          "ExternalSource": "FIS",
          "DataType": "loan",
          "PrimaryBorrowerName": "Derrick Bednar I",
          "GuarantorName": "Sophia Hyatt",
          "PrimaryBorrowerBID": "8bdaf027-0dc4-4610-b10c-a5ade856ba2d",
          "GuarantorBID": "d9aefad3-532c-419f-84f7-9642e362aebf",
          "GuarantorType": "",
          "PrimaryBorrowerTIN": "55a2f1b0-3e93-4073-99ff-36c6ccc6d521",
          "LoanID": "90624503-591f-4b14-aeac-d643d294d963",
          "LoanType": "Student",
          "CommitmentAmount": 475.92,
          "OutstandingAmount": 889.89,
          "IsSublimit": "No",
          "MaturityTimeFrame": "2020-01-31T21:55:41.216Z",
          "MatiurityDate": "2021-11-27T14:05:09.035Z",
          "MaturityValue": 334.62,
          "InterestRateType1": "Fixed",
          "InterestRateType2": "Fixed",
          "InterestRateType3": "Fixed",
          "InterestRate1": "3%",
          "InterestRate2": "3%",
          "InterestRate3": "3%",
          "InterestRateCeiling": "1.99%",
          "InterestRateFloor": "0.99%",
          "FeeType": "Lender",
          "FeeAmount": "$1000",
          "CollateralType": "CRE",
          "RiskRating": 2,
          "OriginalFacilityID": "b1a17a71-cc31-451c-b11a-46199e2485d8",
          "OriginationDate": "2020-03-12T18:43:49.531Z",
          "CostCenter": 225
      }
  ]

    var FulfillmentLoans = ErrorFieldGenerator(mockData, "Fulfillment");

      const dbCollectionFulfillment = await DbConnection.getCollection("Fulfillment");

      await dbCollectionFulfillment.insertMany(FulfillmentLoans);

  } catch (e) {
    throw new Error(e);
  }
};

module.exports = GenerateData;
