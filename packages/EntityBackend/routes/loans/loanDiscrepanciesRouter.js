// import modules
const express = require("express");
const { ObjectId } = require("mongodb");
const router = express.Router();
const getLoanConfigurations = require("./Helper/getLoanConfigurations");
const responseMapper = require("./Helper/responseMapper");
const mergingReportChanges = require("./Helper/mergingReportChanges");

// db setup
const DbConnection = require("../../db");

//Used to get a aggregated discrepancy report for an entity
router.get(
  "/:companyId/:primaryborrowertin/report/:loanid",
  async (req, res) => {
    try {
      /**
       * CompanyId : used to identify which company this report belongs to
       * PrimaryBorrowerTIN : used to identify the entity across different external sources
       * Entity Id: used to identify the entity that user has created
       */
      const CompanyId = req.params.companyId;
      const PrimaryBorrowerTIN = req.params.primaryborrowertin;
      const LoanId = req.params.loanid;
      const reportType = "loan discrepancies";
      /** Using this information, we would know which custom api calls to dispatch for a discrepancy report.
       *  getEntityConfigurations(CompanyId) will return a list of custom api calls that has been selected in entity configuration page.
       * ex) [{responsType:"GET", responseURL:"string", responseMapper ...}, {responseType:"GET"...}, ...]
       */
      let configuredApiCalls = await getLoanConfigurations(CompanyId);

      /** Loading in all the previous changes that user made to this specific entity */
      const savedChangesCollection = await DbConnection.getCollection(
        "DiscrepanciesReport"
      );


      const proposedChanges = await savedChangesCollection.findOne({
        $and: [{ loanId: LoanId }],
      });
      console.log(proposedChanges)


      /** resultWithMapping : would be the final output after aggregating/mapping all the data from multiple external sources  */
      let resultWithMapping = [];

      /** object of all external systems used and field name after looping through all calls */
      let allNewMappedKeys = {};

      /** list of headers to populate headers of a discrepancy table  */
      let TableHeaders = [{ Label: "Field Name", Accessor: "FieldName" }];

      for (
        let configuredApiIdx = 0;
        configuredApiIdx < configuredApiCalls.length;
        configuredApiIdx++
      ) {
        /** customAPI will be an object that contains all the necessary information to make an axios request 
       * ex) 
       *  {
            "_id": "5f868ef929b51262017702fe",
            "company_id": "5f7e1bb2ab26a664b6e950c8",
            "requestName": "Test#1_FIS",
            "requestUrl": "http://localhost:4005/external/FIS",
            "responseMapper": {
                "RelationshipName": "relationshipName",
                "HQCountry": "hqCountry",
                "MasterID": "masterId",
                "HQPostalCode": "hqPostalCode",
                "AccountTwo": "account_two"
            }
         }
      */
        let customAPI = configuredApiCalls[configuredApiIdx];
        await responseMapper(
          customAPI,
          resultWithMapping,
          allNewMappedKeys,
          TableHeaders,
          PrimaryBorrowerTIN,
          configuredApiIdx
        );

        let customApiID = configuredApiCalls[configuredApiIdx]["_id"];

        if (proposedChanges) {
          //if propsed changes for this specific custom
          if (proposedChanges.savedChanges[customApiID]) {
            let savedProposedChanges =
              proposedChanges.savedChanges[customApiID];
            await mergingReportChanges(
              savedProposedChanges,
              resultWithMapping,
              customApiID
            );
          }
        }
      }

      /**If user has made changes to the discrepancy report in the past, we need to bring in those changes
       * and merge them into the data we got back.
       */
      res.json({ TableHeaders, TableData: resultWithMapping });
    } catch (err) {
      res.json({ ErrorStatus: err.status, ErrorMessage: err.message });
    }
  }
);

// Save changes that were made to discrepancy report in edit discrepancy table.
router.post("/:companyId/report/:loanid", async (req, res) => {
  try {
    /** 

     * CompanyId : used to identify which company this report belongs to
     * loanid : used to identify the entity that user has created
     */
    const LoanId = req.params.loanid;
    const CompanyId = req.params.companyId;

    const newChanges = req.body.savedChanges;

    console.log(req.body.savedChanges);

    if (newChanges["_id"] || newChanges["loanId"])
      throw Error("Not allowed to manually give _id loanId");

    const reportCollection = await DbConnection.getCollection(
      "DiscrepanciesReport"
    );

    let pastChanges = await reportCollection.findOne({
      loanId: LoanId,
    });

    let unMergedChanges;

    if (pastChanges) {
      let savedChanges = pastChanges.savedChanges;
      unMergedChanges = { ...savedChanges };

      for (let column in newChanges) {
        for (let row in newChanges[column]) {
          let updatedCellValue = newChanges[column][row];

          //if column exists in past changes
          if (unMergedChanges[column]) {
            //if column & row (cell) exists in past changes, you replace the old object with the new updated cell value
            if (unMergedChanges[column][row]) {
              unMergedChanges[column][row] = updatedCellValue;
            } else {
              // adding in new row (cell value) to existing column (changes)
              let cellValue = newChanges[column][row];
              unMergedChanges[column][row] = cellValue;
            }
          } else {
            //if column does not exist in past changes, create a new column and add in new updated cell

            unMergedChanges[column] = "";

            let cellValue = newChanges[column][row];
            let fieldName = row;

            let newCell = {};
            newCell[fieldName] = cellValue;

            unMergedChanges[column] = newCell;
          }
        }
      }

      let finalChanges = unMergedChanges;

      await reportCollection.updateOne(
        { loanId: LoanId },
        {
          $set: {
            savedChanges: finalChanges,
            loanId: LoanId,
            company_id: ObjectId(CompanyId),
          },
        }
      );
    } else {
      await reportCollection.insertOne({
        savedChanges: newChanges,
        loanId: LoanId,
        company_id: ObjectId(CompanyId),
      });
    }

    // return added discrepancyReportChanges
    pastChanges = await reportCollection
      .find({  loanId: LoanId })
      .toArray();
    const changesJustAdded = pastChanges[pastChanges.length - 1];
    res.json(changesJustAdded);
  } catch (err) {
    res.json({ ErrorStatus: err.status, ErrorMessage: err.message });
  }
});


module.exports = router;
