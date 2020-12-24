// import modules
const express = require("express");
const { company } = require("faker");
const router = express.Router();
const { ObjectId } = require("mongodb");
const GenerateData = require("./loanMockData/GenerateData");

// db setup
const DbConnection = require("../../db");

// /**************************************************************************************************************************************************** */

//Generating fake mock data
// router.get("/generatemockdata", async (req, res) => {
//   const companyId = req.params.companyId;
//   try {
//     GenerateData()
//     res.json({ messagee: "Fake Data generated" });
//   } catch (e) {
//     res.json({
//       Error: e.message + "Error in grabbing data from an external source",
//     });
//   }
// });

// GET ALL loans that exist in our loan database
router.get("/:companyId", async (req, res) => {
  const companyId = req.params.companyId;
  try {
    const dbCollection = await DbConnection.getCollection("Loans");
    const loans = await dbCollection
      .find({
        companyId: ObjectId(companyId),
      })
      .toArray((err, result) => {
        if (err) throw new Error(err);
        res.json(result);
      });
  } catch (e) {
    res.json({
      Error: e.message + "Error in grabbing data from an external source",
    });
  }
});

// GET ALL loans that exist in our loan dashboard
router.get("/:companyId/loandashboard", async (req, res) => {
  const companyId = req.params.companyId;
  try {
    const dbCollection = await DbConnection.getCollection("Loans");
    const loans = await dbCollection
      .find({
        $and: [{ companyId: ObjectId(companyId) }, { onDashboard: true }],
      })
      .toArray((err, result) => {
        if (err) throw new Error(err);
        res.json(result);
      });
  } catch (e) {
    res.json({
      Error: e.message + "Error in grabbing data from an external source",
    });
  }
});
/**
 * GET all loans associated with an entity and that does not exist on loan dashboard
 * (This is used in the loan selection page when creating a new loan)
 * -> Exists in Databse
 * -> associated with an entity
 * -> not on the LOAN DASHBOARD
 *  */

router.get("/:companyId/entity/:entityId", async (req, res) => {
  const companyId = req.params.companyId;
  const entityId = req.params.entityId;

  try {
    const dbCollection = await DbConnection.getCollection("Loans");
    const loans = await dbCollection
      .find({
        $and: [
          { companyId: ObjectId(companyId) },
          { associatedEntityId: entityId },
          { onDashboard: false },
        ],
      })
      .toArray((err, result) => {
        if (err) throw new Error(err);
        res.json(result);
      });
  } catch (e) {
    res.json({
      Error: e.message + "Error in grabbing data from an external source",
    });
  }
});

// GET one specific loan in the database
router.get("/:companyId/:loanId", async (req, res) => {
  try {
    const companyId = req.params.companyId;
    const loanId = req.params.loanId;
    const dbCollection = await DbConnection.getCollection("Loans");
    const loan = await dbCollection.findOne({
      $and: [{ companyId: ObjectId(companyId) }, { loanId: loanId }],
    });

    if (!loan) {
      res.json({
        error: "Loan with given id doesn't exist",
      });
    }

    res.json(loan);
  } catch (e) {
    res.json({
      ErrorStatus: e.status,
      ErrorMessage: e.message,
    });
  }
});

// POST (create) a new loan in the databse (Not in the dashboard)
router.post("/:companyId", async (req, res) => {
  try {
    const companyId = req.params.companyId;
    const {
      commitmentAmount,
      createdAt,
      guarantorBID,
      guarantorName,
      loanId,
      loanName,
      maturityDate,
      primaryBorrowerName,
      primaryBorrowerTIN,
      associatedEntityId,
    } = req.body;

    const dbCollection = await DbConnection.getCollection("Loans");

    let exist = await dbCollection.findOne({
      $and: [
        { companyId: ObjectId(companyId) },
        { loanId: loanId },
        { associatedEntityId: associatedEntityId },
      ],
    });

    if (!exist) {
      let response = await dbCollection.insertOne({
        commitmentAmount,
        createdAt,
        guarantorBID,
        guarantorName,
        loanId,
        loanName,
        maturityDate,
        primaryBorrowerName,
        primaryBorrowerTIN,
        associatedEntityId,
        companyId: ObjectId(companyId),
        onDashboard: false,
      });
      if (response)
        res.json({ status: 200, message: "Loan Added to a loan database" });
    } else {
      res.json({ status: 400, message: "Error in adding a new loan" });
    }
  } catch (error) {
    res.json({ Error: error.message });
  }
});


// router.get("/hello/what/yes", async (req, res) => {
//   try {
//     // const companyId = req.params.companyId;
//     const mock = [
//       {
//         ExternalSource: "FIS",
//         onDashboard: false,
//         primaryBorrowerName: "Camille Keeling",
//         guarantorName: "Ethel Ebert",
//         primaryBorrowerBID: "b090834b-6aae-4412-87b6-959fe331ea3b",
//         guarantorBID: "e2817a46-ce81-4c5c-993d-4642cc25871f",
//         primaryBorrowerTIN: "135af4c5-4e23-4d07-b831-f6c63030bcda",
//         loanID: "4cf5a281-f1f1-4b7f-9d22-9ab1416a0f64",
//         loanType: "Student",
//         commitmentAmount: 585.29,
//         matiurityDate: "2021-04-24T17:46:46.843Z",
//         associatedEntityId: "5f8109ba78b3b6c9a35d83c6",
//         companyId: "5f7e1bb2ab26a664b6e950c8",
//         createdAt: "02/10/08",
//       },
//       {
//         ExternalSource: "FIS",
//         onDashboard: false,
//         primaryBorrowerName: "Diane Ruecker",
//         guarantorName: "Miss Rose Heidenreich",
//         primaryBorrowerBID: "88c2cb98-a801-406c-bfaf-23cbd37e602e",
//         guarantorBID: "61be328a-031f-46c1-97f4-6e919305b662",
//         primaryBorrowerTIN: "dda70c84-4d28-4a94-ae40-065f2d21eb8b",
//         LoanID: "7ba28a62-7a86-4428-96b0-5cb49d42eb33",
//         LoanType: "Student",
//         commitmentAmount: 949.15,
//         matiurityDate: "2021-12-17T21:12:18.311Z",
//         associatedEntityId: "5f8109ba78b3b6c9a35d83c6",
//         companyId: "5f7e1bb2ab26a664b6e950c8",
//         createdAt: "02/10/08",
//       },
//       {
//         ExternalSource: "FIS",
//         onDashboard: false,
//         primaryBorrowerName: "Ronald Wintheiser",
//         guarantorName: "Albert Anderson",
//         primaryBorrowerBID: "ecc6b6a0-af2b-47a2-9ca8-804d411b1817",
//         guarantorBID: "c93ec147-20a7-4b9b-b93f-14ab95b93786",
//         primaryBorrowerTIN: "08f38903-5b35-4ce3-a9c0-d9f38e0817a9",
//         LoanID: "4ab5068f-63fc-40d0-b07f-deba1df51cec",
//         LoanType: "Student",
//         commitmentAmount: 994.58,
//         matiurityDate: "2021-01-16T20:12:21.610Z",
//         associatedEntityId: "5f8109ba78b3b6c9a35d83c6",
//         companyId: "5f7e1bb2ab26a664b6e950c8",
//         createdAt: "02/10/08",
//         associatedEntityId: "5f7faf2d63836e4d94ade998",
//         companyId: "5f7e1bb2ab26a664b6e950c8",
//         createdAt: "02/10/08",
//       },
//       {
//         ExternalSource: "FIS",
//         onDashboard: false,
//         primaryBorrowerName: "Lucia Dickens",
//         guarantorName: "Luke Kuphal",
//         primaryBorrowerBID: "ef739533-597d-491c-b5fc-e4136a6d305c",
//         guarantorBID: "ef0a249c-2d99-4312-b617-22110db722f5",
//         primaryBorrowerTIN: "fb12a3e4-2227-4125-8acb-837e2b2602f0",
//         LoanID: "6efe3445-9a62-45e2-b0c4-bcd9a024d09f",
//         LoanType: "Auto",
//         commitmentAmount: 536.39,
//         matiurityDate: "2021-05-13T04:05:32.897Z",
//         associatedEntityId: "5f7faf2d63836e4d94ade998",
//         companyId: "5f7e1bb2ab26a664b6e950c8",
//         createdAt: "02/10/08",
//       },
//       {
//         ExternalSource: "FIS",
//         onDashboard: false,
//         primaryBorrowerName: "Derrick Bednar I",
//         guarantorName: "Sophia Hyatt",
//         primaryBorrowerBID: "8bdaf027-0dc4-4610-b10c-a5ade856ba2d",
//         guarantorBID: "d9aefad3-532c-419f-84f7-9642e362aebf",
//         primaryBorrowerTIN: "55a2f1b0-3e93-4073-99ff-36c6ccc6d521",
//         LoanID: "90624503-591f-4b14-aeac-d643d294d963",
//         LoanType: "Student",
//         commitmentAmount: 475.92,
//         matiurityDate: "2021-11-27T14:05:09.035Z",
//         associatedEntityId: "5f7faf2d63836e4d94ade998",
//         companyId: "5f7e1bb2ab26a664b6e950c8",
//         createdAt: "02/10/08",
//       },
//     ];

//     console.log("heree")
//     const dbCollection = await DbConnection.getCollection("Loans");

//     const insert = dbCollection.insertMany(mock);
//     res.json({message:"insert"});
//   } catch (error) {
//     res.json({ Error: error.message });
//   }
// });

// PATCH used to update an existing loan (primarily for transferring loan in database to the loan dashboard)
router.patch("/:companyId", async (req, res) => {
  try {
    const companyId = req.params.companyId;
    const { loanId, onDashboard } = req.body;

    const dbCollection = await DbConnection.getCollection("Loans");

    let doesloanExist = await dbCollection.findOne({
      $and: [{ companyId: ObjectId(companyId) }, { loanID: loanId }],
    });
    console.log(req.body)
    if (doesloanExist) {
      let updatedDashboardLoan = await dbCollection.updateOne(
        {
          loanID: loanId,
        },
        { $set: { onDashboard: onDashboard } }
      );

      if (response)
        res.json({ status: 200, message: "Loan successfully updated" });
    } else {
      res.json({ status: 400, message: "Failed to update the loan" });
    }
  } catch (error) {
    res.json({ Error: error.message });
  }
});

// DELETE a loan
router.delete("/:companyId/:loanId", async (req, res) => {
  const companyId = req.params.companyId;
  const loanId = req.params.loanId;

  try {
    const dbCollection = await DbConnection.getCollection("Loans");

    let result = await dbCollection.deleteOne({
      $and: [{ companyId: ObjectId(companyId) }, { loanId: loanId }],
    });

    if (result) {
      res.json({
        status: 200,
        message: "loan successfully deleted",
      });
    } else {
      res.json({
        status: 400,
        message: "Error in deleting a loan",
      });
    }
  } catch (error) {
    res.json({ status: error.status, message: error.message });
  }
});

module.exports = router;
