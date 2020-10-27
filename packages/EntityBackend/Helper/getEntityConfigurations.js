const axios = require("axios");
const { entity_config_url } = require("../config");
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
    const dbCollection = await DbConnection.getCollection(
      "Entities_Configuration"
    );
    const response = await dbCollection.findOne({
      company_id: ObjectId(companyId),
    });
    return response.entityConfiguration;
  } catch (e) {
    return { Error: e.message };
  }
}

module.exports = getEntityConfigurations;
