const axios = require("axios");
const { ObjectId } = require("mongodb");
const newDiscrepancyRow = require("./newDiscrepancyRow");
const addValueToExistingRow = require("./addValueToExistingRow");
// db setup
const DbConnection = require("../db");

/**
 * @param {obj} customAPI customAPI will be an object that contains all the necessary information to make an axios request 
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
 * @param {obj} resultWithMapping would be the final output after
 * aggregating/mapping all the data from multiple external sources. This * will be used to populate rows of discrepancy table
 * ex) [
        {
            "key_config": {
                "key": "relationshipName",
                "display": "relationshipName"
            },
            "sourceSystem": {
                "source": "FIS",
                "trueValue": "Rohan LLC"
            },
            "values": [
                {
                    "value": "Rohan LLC",
                    "matchesSoT": true
                },
                {
                    "value": "Rohan LLC",
                    "matchesSoT": true
                },
                null
            ]
        },
        {
            "key_config": {
                "key": "hqCountry",
                "display": "hqCountry"
            },
            "sourceSystem": {
                "source": "FIS",
                "trueValue": "Djibouti"
            },
            "values": [
                {
                    "value": "Djibouti",
                    "matchesSoT": true
                },
                null,
                null
            ]
        },
      ]
 * 
 * @param {obj} allNewMappedKeys object of all external systems used and * field name after looping through all calls
 * @param {obj} TableHeaders list of headers to populate headers of a 
 * discrepancy table 
 * @param {string} BorrowerId BorrowerId : used to identify the entity 
 * across different external sources
 * @param {string} configuredApiIdx getEntityConfigurations(companyId) 
 * will return a list of custom api calls that has been selected in 
 * entity configuration page.configuredApiIdx marks the index of 
 * custom api in that list.
 */
async function responseMapper(
  customAPI,
  resultWithMapping,
  allNewMappedKeys,
  TableHeaders,
  BorrowerId,
  configuredApiIdx,
  EntityId
) {
  const reportCollection = await DbConnection.getCollection(
    "DiscrepanciesReport"
  );

  let customApiID = customAPI._id.valueOf();
  let savedChanges;

  const discrepancyReportChanges = await reportCollection.findOne({
    entity_id: ObjectId(EntityId),
  });
  if (discrepancyReportChanges) {
    savedChanges = discrepancyReportChanges.savedChanges[customApiID];
  }


  const customAPIrequest = await axios({
    method: customAPI.requestType,
    url: customAPI.requestUrl + `/${BorrowerId}`,
    data: customAPI.requestBody,
    headers: customAPI.requestHeaders,
    params: customAPI.requestParams,
  }).then((response) => {
    let customApiId = ObjectId(customAPI["_id"]);

    const resultData = response.data;
    TableHeaders.push({
      Label: response.data.ExternalSource,
      Accessor: response.data.ExternalSource,
    });

    //In the case wehre response Mapper is given
    if (customAPI.responseMapper) {
      const responseMapperData = customAPI.responseMapper;
      const mappedKeyCheckOff = { ...allNewMappedKeys };

      for (const externalSystemKey in responseMapperData) {
        //newMappedKey will be a new key that would be used in discrepancyReport
        const newMappedKey = responseMapperData[externalSystemKey];
        if (!allNewMappedKeys.hasOwnProperty(newMappedKey)) {
          allNewMappedKeys[newMappedKey] = "";
        } else {
          delete mappedKeyCheckOff[newMappedKey];
        }

        //value that newMappedKey will have
        const desiredValueFromExternal = resultData[externalSystemKey];

        if (!desiredValueFromExternal) {
          console.log(
            `External System key "${externalSystemKey}" does not exist in the external source data`
          );
          continue;
        }



        //         async function hello(EntityId, customApiId) {
        //           const reportCollection = await DbConnection.getCollection(
        //             "DiscrepanciesReport"
        //           );

        //           const discrepancyReportChanges = await reportCollection.findOne({ entity_id: ObjectId(EntityId) });

        // console.log(discrepancyReportChanges)
        //           //in the past, changes have been made in discrepancy report
        //           if (discrepancyReportChanges) {
        //             return discrepancyReportChanges.savedChanges[customApiId]
        //           } else {
        //             return "None"
        //           }
        //         }
        //          let resultYo = hello(EntityId, customApiId).then((response)=> {console.log(response)})
        //          console.log(resultYo)
        /** Case 1) newMappedKey does already exist in resultWithMapping */

        let doesFieldExist = addValueToExistingRow(
          resultWithMapping,
          desiredValueFromExternal,
          newMappedKey,
          customApiId,
          savedChanges,
        );

        if (doesFieldExist) {
          continue;
        }

        /** Case 2) newMappedKey does not exist in resultWithMapping; we create a new row in discrepancy report */
        newDiscrepancyRow(
          resultWithMapping,
          configuredApiIdx,
          resultData.ExternalSource,
          desiredValueFromExternal,
          newMappedKey,
          customApiId,
          EntityId
        );
      }

      /**Case 3) After looping through a response mapper, we also need to check if value for previous
       * newMappedkeys exist in the data we got back from an external source
       */
      for (let remainingKey in mappedKeyCheckOff) {
        for (let row = 0; row < resultWithMapping.length; row++) {
          if (resultWithMapping[row].key_config.key === remainingKey) {
            let externalValue = resultData[remainingKey];
            if (externalValue) {
              resultWithMapping[row].values.push(externalValue);
            } else {
              resultWithMapping[row].values.push(null);
            }
          }
        }
      }
    }
  });
}

module.exports = responseMapper;
