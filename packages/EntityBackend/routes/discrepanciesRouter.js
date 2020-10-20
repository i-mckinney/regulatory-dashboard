// import modules
const express = require("express");
const { ObjectId } = require("mongodb");
const router = express.Router();
const getEntityConfigurations = require("../Helper/getEntityConfigurations");
const responseMapper = require("../Helper/responseMapper");
const mergingReportChanges = require("../Helper/mergingReportChanges");

// db setup
const DbConnection = require("../db");

//Used to get a aggregated discrepancy report for an entity
router.get("/:companyId/:borrowerId/report/:entityId", async (req, res) => {
  try {
    /**
     * CompanyId : used to identify which company this report belongs to
     * BorrowerId : used to identify the entity across different external sources
     * Entity : used to identify the entity that user has created
     */
    const CompanyId = req.params.companyId;
    const BorrowerId = req.params.borrowerId;
    const EntityId = req.params.entityId;

    /** Using this information, we would know which custom api calls to dispatch for a discrepancy report.
     *  getEntityConfigurations(CompanyId) will return a list of custom api calls that has been selected in entity configuration page.
     * ex) [{responsType:"GET", responseURL:"string", responseMapper ...}, {responseType:"GET"...}, ...]
     */
    let configuredApiCalls = await getEntityConfigurations(CompanyId);

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
        BorrowerId,
        configuredApiIdx
      );
    }

    /**If user has made changes to the discrepancy report in the past, we need to bring in those changes
     * and merge them into the data we got back.
     */
    if (resultWithMapping.length > 0) {
      let mergePastChanges = await mergingReportChanges(
        EntityId,
        resultWithMapping,
        allNewMappedKeys
      );

      if ((mergePastChanges.Status = 404)) {
        //if there were no changes made in the past
        res.json({ TableHeaders, TableData: resultWithMapping });
      } else {
        res.json({ TableHeaders, TableData: mergePastChanges });
      }
    }
  } catch (err) {
    res.json({ ErrorStatus: err.status, ErrorMessage: err.message });
  }
});

// Save changes that were made to discrepancy report in edit discrepancy table.
router.post("/report/:entityId", async (req, res) => {
  try {
    /**
     * EntityId : used to identify the entity that user has created
     */
    const EntityId = req.params.entityId;

    const savedChanges = req.body.savedChanges;

    if (savedChanges["_id"] || savedChanges["entity_id"])
      throw Error("Not allowed to manually give _id entity_id");
    //Making sure, table values are compared to correct source of truth value

    if (savedChanges) {
      savedChanges.forEach((rowChange) => {
        let sourceOfTruth = rowChange.sourceSystem.trueValue;
        let values = rowChange.values.map((cell) => {
          if (cell === null) return null;
          if (cell["value"]) {
            let value = cell["value"];
            let matchesSoT = value === sourceOfTruth;
            return {
              value,
              matchesSoT,
            };
          } else {
            let previousValue = cell["previousValue"];
            let newValue = cell["newValue"];
            let matchesSoT = newValue === sourceOfTruth;
            return {
              previousValue,
              newValue,
              matchesSoT,
            };
          }
        });

        rowChange.values = values;
      });
    }
    const reportCollection = await DbConnection.getCollection("DiscrepanciesReport");

    let discrepancyReportChanges = await reportCollection.findOne({
      entity_id: ObjectId(EntityId),
    });

    //each row will have only one discrpacy report changes.
    if (discrepancyReportChanges) {
      await reportCollection.deleteOne({ entity_id: ObjectId(EntityId) });
    }
    await reportCollection.insertOne({
      savedChanges,
      entity_id: ObjectId(EntityId),
    });

    // return added discrepancyReportChanges
    discrepancyReportChanges = await reportCollection
      .find({ entity_id: ObjectId(EntityId) })
      .toArray();
    const changesJustAdded =
      discrepancyReportChanges[discrepancyReportChanges.length - 1];
    res.json(changesJustAdded);
  } catch (err) {
    res.json({ ErrorStatus: err.status, ErrorMessage: err.message });
  }
});

module.exports = router;
