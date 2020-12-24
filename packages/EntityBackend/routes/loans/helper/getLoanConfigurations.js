const { ObjectId } = require("mongodb");
// db setup
const DbConnection = require("../../../db");

/**
 *
 * @param {string} companyId a unique identifier to represent company
 * @return list of selected custom apis in entity configuration page for a company
 * example)
 * [
 *     {
 *           "_id": "5f868ef929b51262017702fe",
 *           "company_id": "5f7e1bb2ab26a664b6e950c8",
 *           "requestName": "Test#1_FIS",
 *           "requestUrl": "http://localhost:4005/external/FIS",
 *           "responseMapper": {
 *               "RelationshipName": "relationshipName",
 *               "AccountTwo": "account_two"
 *           }
 *       },
 *       {
 *           "_id": "5f8690eb29b5126201770301",
 *           "company_id": "5f7e1bb2ab26a664b6e950c8",
 *           "requestName": "Test#2_SalesForce",
 *           "requestUrl": "http://localhost:4005/external/SalesForce",
 *           "responseMapper": {
 *               "RelationshipName": "relationshipName",
 *           }
 *       },
 * ]
 *
 */
async function getLoanConfigurations(companyId) {
  /** Using this information, we would know which custom api calls to dispatch for a discrepancy report. */

  try {
    //Setting up entity configurations
    const loanConfigCollection = await DbConnection.getCollection(
      "LoanAPIconfiguration"
    );
    const loanConfigurationData = await loanConfigCollection.findOne({
      companyId: ObjectId(companyId),
    });

    let loanConfiguration = loanConfigurationData.loanConfiguration;

    //Using entity configurations to look up custom apis that exist in our db
    const customApiCollection = await DbConnection.getCollection(
      "CustomApiRequests"
    );


    let customApis = [];

    if (!loanConfiguration) {
      return { Error: "Loan configuration does not exist" };
    } else {
      for (let i = 0; i < loanConfiguration.length; i++) {
        let customApiId = loanConfiguration[i];

        let singleCustomApi = await customApiCollection.findOne({
          $and: [
            { company_id: ObjectId(companyId) },
            { _id: ObjectId(customApiId) },
          ],
        });

        if (singleCustomApi) {
          customApis.push(singleCustomApi);
        } else {
          customApis.push(null);
        }
      }
    }

    return customApis;
  } catch (e) {
    return {
      Error: e.message + "Error in grabbing configuration settings",
    };
  }
}

module.exports = getLoanConfigurations;
