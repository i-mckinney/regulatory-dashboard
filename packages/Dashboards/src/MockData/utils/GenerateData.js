const faker = require("faker");
const { v4: uuidv4 } = require("uuid");
const { ErrorFieldGenerator } = require("./ErrorFieldGenerator");

// const DbConnection = require("../db");

//function that gets invoked on mount to generate fake data.
//if data has been generated, would not get produce more data.
const GenerateData = async () => {
  try {
    // const dbCollectionFISTest = await DbConnection.getCollection("FIS");
    // const fisData = await dbCollectionFISTest.find().toArray();
    // if (fisData.length > 0) return;

    const FISEntities = [];

    // i limit would detertmine number of entities for fake data
    for (let i = 0; i < 5; i++) {

      var PrimaryBorrowerName = faker.name.findName();
      var CoBorrowerName1 = faker.name.findName();
      var CoBorrowerName2 = faker.name.findName();;
      var CoBorrowerName3 = faker.name.findName();;
      var CoBorrowerName4 = faker.name.findName();;
      var CoBorrowerName5 = faker.name.findName();;
      var GuarantorName1 = faker.name.findName();;
      var GuarantorName2 = faker.name.findName();;
      var GuarantorName3 = faker.name.findName();;
      var GuarantorName4 = faker.name.findName();;
      var GuarantorName5 = faker.name.findName();;

      var PrimaryBorrowerBID = uuidv4();
      var CoBorrowerBID1 = uuidv4();
      var CoBorrowerBID2 = uuidv4();
      var CoBorrowerBID3 = uuidv4();
      var CoBorrowerBID4 = uuidv4();
      var CoBorrowerBID5 = uuidv4();
      var GuarantorBID1 = uuidv4();
      var GuarantorBID2 = uuidv4();
      var GuarantorBID3 = uuidv4();
      var GuarantorBID4 = uuidv4();
      var GuarantorBID5 = uuidv4();

      var GuarantorType1 = "";

      var PrimaryBorrowerTINSSN1 = faker.finance.account();
      var CoBorrowerTINSSN1 = faker.finance.account();
      var CoBorrowerTINSSN2 = faker.finance.account();
      var CoBorrowerTINSSN3 = faker.finance.account();
      var CoBorrowerTINSSN4 = faker.finance.account();
      var CoBorrowerTINSSN5 = faker.finance.account();

      var LoanID = uuidv4();
      var possibleLoanType = ["Auto", "Mortgage", "Student"];
      var pLTindex = Math.floor(Math.random() * 3);
      var LoanType = possibleLoanType[pLTindex];
      var OtherLoanType = "";

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
      var InterestRateType4 = possibleInterestRateType[pIRTindex];
      var InterestRateType5 = possibleInterestRateType[pIRTindex];
      var possibleInterestRate = ["3%", "2.25%", "1.25%"];
      var pIRIndex = Math.floor(Math.random() * 3);
      var InterestRate1 = possibleInterestRate[pIRIndex];
      var InterestRate2 = possibleInterestRate[pIRIndex];
      var InterestRate3 = possibleInterestRate[pIRIndex];
      var InterestRate4 = possibleInterestRate[pIRIndex];
      var InterestRate5 = possibleInterestRate[pIRIndex];

      var InterestRateCeiling = "1.99%";
      var InterestRateFloor = "0.99%";

      var FeeType1 = "";
      var FeeType2 = "";
      var FeeType3 = "";
      var FeeType4 = "";
      var FeeType5 = "";
      var FeeAmount1 = "";
      var FeeAmount2 = ""; 
      var FeeAmount3 = "";
      var FeeAmount4 = "";
      var FeeAmount5 = "";

      var Purpose = "Need loan to use";
      var DetailedPurpose = "";
      var Syndication = "";
      var LienPriority = "";
      var CollateralType = "";

      var RiskRating = Math.floor(Math.random() * 10);
      var OriginalFacilityID = "";
      var OriginationDate = "";
      var LineReportedOnFrY9C = "";

      var CostCenter;
      do {
        CostCenter = Math.floor(Math.random() * 999);
      } while (CostCenter < 100);

      var Division = "";
      var LineOfBusiness = "";
      var CumalitiveChargeOffs = "";
      var ASC31010 = "";
      var ASC31030 = "";

      var NumberofDaysPrincialorInterestPastDue = "";
      var NonAccrualDays = "";
      var IDOfPrimaryObligorForRepayment = "";
      var DateOfFinancials = faker.date.future();
      var DateOfLastAudit = faker.date.past();
      var NetSalesCurrent = faker.finance.amount();;
      var NetSalesPriorYear = faker.finance.amount();;
      var OperatingIncome = faker.finance.amount();;
      var DepreciationAndAmortization = faker.finance.amount();;
      var InterestExpense = faker.finance.amount();;
      var NetIncomeCurrent = faker.finance.amount();;
      var NetIncomePrioryYear = "";
      var CashAndMarketableSecurities = "";
      var AccountsReceivableCurrent = faker.finance.amount();;
      var AccountsReceivablePriorYear = faker.finance.amount();;
      var InventoryCurrent = "";
      var InventoryPriorYear = "";
      var CurrentAssetsCurrent = faker.finance.amount();;
      var CurrentAssetsPriorYear = faker.finance.amount();;
      var TangibleAssets = faker.finance.amount();;
      var FixedAssets = faker.finance.amount();;
      var TotalAssetsCurrent = faker.finance.amount();;
      var TotalAssetsPriorYear = faker.finance.amount();;
      var AccountsPayableCurrent = faker.finance.amount();;
      var AccountsPayablePriorYear = faker.finance.amount();;
      var ShortTermDebt = faker.finance.amount();;
      var CurrentMaturitiesOfLongTermDebt = faker.finance.amount();;
      var CurrentLiabilitiesCurrent = faker.finance.amount();;
      var CurrentLiabilitiesPriorYear = faker.finance.amount();;
      var LongTermDebt = faker.finance.amount();;
      var MinorityInterest = faker.finance.amount();;
      var TotalLiabilities = faker.finance.amount();;
      var RetainedEarnings = faker.finance.amount();;
      var CapitalExpenditures = faker.finance.amount();;
      var SpecialPurposeEntityFlag = "";
      var FairValueAdjustmentCommittedExposure = "";
      var FairValueAdjustmentDrawn = "";
      var LowerOfCostOrMarketFlag = "";
      var SNCInternalCreditID = "";
      var ProbabilityOfDefault = "";
      var LossGivenDefault = "";
      var ExposureAtDefault = "";
      var RenewalDate = faker.database.future();
      var CreditFacilityCurrency = "";
      var EstimatedValue = faker.finance.amount();;
      var PrepaymentPenalty = "";
      var PSRIndustryCode = "";
      var ShareOfTotalCommitment = "";
      var LeveragedLoan = "";
      var DispositionFlag = "";
      var DispostionScheduleShift = "";
      var SyndicationType = "";
      var TargetHold = "";
      var FedCodes = "";
      var CCARLiens = "";
      var PropertyType = "";
      var LoanPuproseRELOAN = "";
      var LowerOfCostOrMarketFlag__1 = "";
      var ISO4127CurrencyCodes = "";
      var CurrentValueBasis = "";
      var PrepaymentPenaltyFlag = "";
      var LeveragedLoanFlag = "";
      var TroubledDebtRestructuring = "";
      var AcquiredLoan = faker.finance.amount();;
      var Recourse = "";
      var ParicipationFlag = "";
      var IndustryCodeType = "";
      var CreditFacilityType = "";
      var CreditFacilityPurpose = "";
      var LineReportedOnFRY9C = "";
      var InterestIncomeTaxStatus = "";
      var SyndicatedLoanFlag = "";

      const singleEntity = {
        Warehouse: "FIS",
        PrimaryBorrowerName,
        CoBorrowerName1,
        CoBorrowerName2,
        CoBorrowerName3,
        CoBorrowerName4,
        CoBorrowerName5,
        GuarantorName1,
        GuarantorName2,
        GuarantorName3,
        GuarantorName4,
        GuarantorName5,
        PrimaryBorrowerBID,
        CoBorrowerBID1,
        CoBorrowerBID2,
        CoBorrowerBID3,
        CoBorrowerBID4,
        CoBorrowerBID5,
        GuarantorBID1,
        GuarantorBID2,
        GuarantorBID3,
        GuarantorBID4,
        GuarantorBID5,
        GuarantorType1,
        PrimaryBorrowerTINSSN1,
        CoBorrowerTINSSN1,
        CoBorrowerTINSSN2,
        CoBorrowerTINSSN3,
        CoBorrowerTINSSN4,
        CoBorrowerTINSSN5,
        LoanID,
        LoanType,
        OtherLoanType,
        CommitmentAmount,
        OutstandingAmount,
        IsSublimit,
        MaturityTimeFrame,
        MatiurityDate,
        MaturityValue,
        InterestRateType1,
        InterestRateType2,
        InterestRateType3,
        InterestRateType4,
        InterestRateType5,
        InterestRate1,
        InterestRate2,
        InterestRate3,
        InterestRate4,
        InterestRate5,
        InterestRateCeiling,
        InterestRateFloor,
        FeeType1,
        FeeType2,
        FeeType3,
        FeeType4,
        FeeType5,
        FeeAmount1,
        FeeAmount2,
        FeeAmount3,
        FeeAmount4,
        FeeAmount5,
        Purpose,
        DetailedPurpose,
        Syndication,
        LienPriority,
        CollateralType,
        RiskRating,
        OriginalFacilityID,
        OriginationDate,
        LineReportedOnFrY9C,
        CostCenter,
        Division,
        LineOfBusiness,
        CumalitiveChargeOffs,
        ASC31010,
        ASC31030,
        NumberofDaysPrincialorInterestPastDue,
        NonAccrualDays,
        IDOfPrimaryObligorForRepayment,
        DateOfFinancials,
        DateOfLastAudit,
        NetSalesCurrent,
        NetSalesPriorYear,
        OperatingIncome,
        DepreciationAndAmortization,
        InterestExpense,
        NetIncomeCurrent,
        NetIncomePrioryYear,
        CashAndMarketableSecurities,
        AccountsReceivableCurrent,
        AccountsReceivablePriorYear,
        InventoryCurrent,
        InventoryPriorYear,
        CurrentAssetsCurrent,
        CurrentAssetsPriorYear,
        TangibleAssets,
        FixedAssets,
        TotalAssetsCurrent,
        TotalAssetsPriorYear,
        AccountsPayableCurrent,
        AccountsPayablePriorYear,
        ShortTermDebt,
        CurrentMaturitiesOfLongTermDebt,
        CurrentLiabilitiesCurrent,
        CurrentLiabilitiesPriorYear,
        LongTermDebt,
        MinorityInterest,
        TotalLiabilities,
        RetainedEarnings,
        CapitalExpenditures,
        SpecialPurposeEntityFlag,
        FairValueAdjustmentCommittedExposure,
        FairValueAdjustmentDrawn,
        LowerOfCostOrMarketFlag,
        SNCInternalCreditID,
        ProbabilityOfDefault,
        LossGivenDefault,
        ExposureAtDefault,
        RenewalDate,
        CreditFacilityCurrency,
        EstimatedValue,
        PrepaymentPenalty,
        PSRIndustryCode,
        ShareOfTotalCommitment,
        LeveragedLoan,
        DispositionFlag,
        DispostionScheduleShift,
        SyndicationType,
        TargetHold,
        FedCodes,
        CCARLiens,
        PropertyType,
        LoanPuproseRELOAN,
        LowerOfCostOrMarketFlag__1,
        ISO4127CurrencyCodes,
        CurrentValueBasis,
        PrepaymentPenaltyFlag,
        LeveragedLoanFlag,
        TroubledDebtRestructuring,
        AcquiredLoan,
        Recourse,
        ParicipationFlag,
        IndustryCodeType,
        CreditFacilityType,
        CreditFacilityPurpose,
        LineReportedOnFRY9C,
        InterestIncomeTaxStatus,
        SyndicatedLoanFlag,
      };
      FISEntities.push(singleEntity);
    }
    console.log(FISEntities)
    // var SalesForceEntities = ErrorFieldGenerator(FISEntities, "SalesForce");
    // var DataWarehouseEntities = ErrorFieldGenerator(FISEntities, "DataWarehouse");
    // var TemenosEntities = ErrorFieldGenerator(FISEntities, "Temenos");

    // try {
    //   const dbCollectionFIS = await DbConnection.getCollection("FIS");
    //   const dbCollectionSalesForce = await DbConnection.getCollection(
    //     "SalesForce"
    //   );
    //   const dbCollectionTemenos = await DbConnection.getCollection("Temenos");
    //   const dbCollectionDataWarehouse = await DbConnection.getCollection(
    //     "DataWarehouse"
    //   );

    //   await dbCollectionFIS.insertMany(FISEntities);
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

// module.exports = GenerateData;
