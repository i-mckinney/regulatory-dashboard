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
      // var BorrowerId = uuidv4();

      // var RelationshipName = faker.company.companyName();
      // var BorrowerName = RelationshipName;
      // var DepositorName = RelationshipName;

      // var HQStreetAddress = faker.address.streetAddress();
      // var HQCity = faker.address.city();
      // var HQState = faker.address.state();
      // var HQPostalCode = faker.address.zipCode();
      // var HQCountry = faker.address.country();
      // var MailingAddress = faker.address.streetAddress();
      // var MailingCity = faker.address.city();
      // var MailingState = faker.address.state();
      // var MailingPostalCode = faker.address.zipCode();
      // var MailingAddressCountry = faker.address.country();

      // var PhoneNumberOne = faker.phone.phoneNumber();
      // var PhoneNumberTwo = faker.phone.phoneNumber();
      // var PhoneNumberThree = faker.phone.phoneNumber();

      // var phoneTypes = ["Office", "Mobile", "Home"];
      // var randomPhoneType = Math.floor(Math.random() * 3);
      // var PhoneTypeOne = phoneTypes[randomPhoneType];
      // var PhoneTypeTwo = phoneTypes[randomPhoneType];
      // var PhoneTypeThree = phoneTypes[randomPhoneType];

      // var EmailOne = faker.internet.email();
      // var EmailTwo = faker.internet.email();
      // var EmailThree = faker.internet.email();

      // var EmailOne = faker.internet.email();
      // var EmailTwo = faker.internet.email();
      // var EmailThree = faker.internet.email();

      // var MasterID = faker.finance.account();
      // var DepositorID = faker.finance.account();
      // var AccountOne = faker.finance.account();
      // var AccountTwo = faker.finance.account();
      // var AccountThree = faker.finance.account();
      // var TIN = faker.finance.account();
      // var NACISCode = faker.finance.account();

      // var entityTypes = ["S-Corp", "C-Corp", "LLC", "Sole Prop"];
      // var randomType = Math.floor(Math.random() * 4);
      // var EntityType = entityTypes[randomType];

      // var CostCenter;
      // do {
      //   CostCenter = Math.floor(Math.random() * 999);
      // } while (CostCenter < 100);

      // var RelationshipManager =
      //   faker.name.firstName() + "" + faker.name.lastName();
      // var PrimaryContact = faker.name.firstName() + "" + faker.name.lastName();

      // var BorrowerRiskRating = Math.floor(Math.random() * 10);
      // var GuarantorRiskRating = Math.floor(Math.random() * 10);

      const singleEntity = {
        Warehouse: "FIS",
        PrimaryBorrowerName,
        CoBorrowerName1,
        CoBorrowerName2,
        CoBorrowerName2,
        CoBorrowerName3,
        CoBorrowerName3,
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
        interestIncomeTaxStatus,
        SyndicatedLoanFlag,

        // ExternalSource: "FIS",
        // BorrowerId,
        // RelationshipName,
        // BorrowerName,
        // DepositorName,
        // HQStreetAddress,
        // HQCity,
        // HQState,
        // HQPostalCode,
        // HQCountry,
        // MailingAddress,
        // MailingCity,
        // MailingState,
        // MailingPostalCode,
        // MailingAddressCountry,
        // PhoneNumberOne,
        // PhoneNumberTwo,
        // PhoneNumberThree,
        // PhoneTypeOne,
        // PhoneTypeTwo,
        // PhoneTypeThree,
        // EmailOne,
        // EmailTwo,
        // EmailThree,
        // MasterID,
        // DepositorID,
        // AccountOne,
        // AccountTwo,
        // AccountThree,
        // TIN,
        // EntityType,
        // CostCenter,
        // NACISCode,
        // RelationshipManager,
        // PrimaryContact,
        // BorrowerRiskRating,
        // GuarantorRiskRating,
      };
      FISEntities.push(singleEntity);
    }

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

module.exports = GenerateData;
