// import modules
const express = require("express");
const router = express.Router();
const getEntityConfigurations = require("../Helper/getEntityConfigurations");
const responseMapper = require("../Helper/responseMapper");

//Used to get a aggregated discrepancy report for an entity
router.get("/:companyId/:borrowerId/report", async (req, res) => {
  try {
    /**
     * companyId : used to identify which company this report belongs to
     * BorrowerId : used to identify the entity across different external sources
     */
    const companyId = req.params.companyId;
    const BorrowerId = req.params.borrowerId;

    /** Using this information, we would know which custom api calls to dispatch for a discrepancy report. 
     *  getEntityConfigurations(companyId) will return a list of custom api calls that has been selected in entity configuration page.
     * ex) [{responsType:"GET", responseURL:"string", responseMapper ...}, {responseType:"GET"...}, ...]
    */
    let configuredApiCalls = await getEntityConfigurations(companyId);

    /** resultWithMapping : would be the final output after aggregating/mapping all the data from multiple external sources  */
    let resultWithMapping = [];

    /** object of all external systems used and field name after looping through all calls */
    let allNewMappedKeys = {};

    /** list of headers to populate headers of a discrepancy table  */
    let TableHeaders = [{ Label: "Field Name", Accessor: "FieldName" }];

    for (let configuredApiIdx = 0; configuredApiIdx < configuredApiCalls.length; configuredApiIdx++) {
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
    res.json({ TableHeaders, TableData: resultWithMapping });
  } catch (err) {
    res.json({ ErrorStatus: err.status, ErrorMessage: err.message });
  }
});

module.exports = router;
