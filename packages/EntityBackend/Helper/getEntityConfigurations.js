const { ObjectId } = require("mongodb");
// db setup
const DbConnection = require("../db");

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
async function getEntityConfigurations(companyId) {
  /** Using this information, we would know which custom api calls to dispatch for a discrepancy report. */

  try {
    //Setting up entity configurations
    const entityConfigCollection = await DbConnection.getCollection(
      "Entities_Configuration"
    );
    const entityConfigurationData = await entityConfigCollection.findOne({
      company_id: ObjectId(companyId),
    });

    let entityConfiguration = entityConfigurationData.entityConfiguration;

    //Using entity configurations to look up custom apis that exist in our db
    const customApiCollection = await DbConnection.getCollection(
      "CustomApiRequests"
    );


    let customApis = [];

    if (!entityConfiguration) {
      return { Error: "Entity configuration does not exist" };
    } else {
      for (let i = 0; i < entityConfiguration.length; i++) {
        let customApiId = entityConfiguration[i];

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

module.exports = getEntityConfigurations;
