// import modules
const express = require("express");
const router = express.Router();
const axios = require("axios");

// db setup
const DbConnection = require("../db");

//Used to get a aggregated discrepancy report for an entity
router.get("/:companyId/:borrowerId/report", async (req, res) => {
  try {
    /**
     * companyId : used to identify which company this report belongs to
     * BorrowerId : used to identify the entity across different external sources
     */
    const companyId = req.params.companyId;
    const BorrowerId = req.params.borrowerId;

    /** Using this information, we would know which custom api calls to dispatch for a discrepancy report. */
    let entityConfigurations = axios({
      method: "GET",
      url: `http://localhost:4005/config/${companyId}`,
    });

    let configuredApiCalls = await entityConfigurations.then((response) => {
      let entityConfigs = response.data.entityConfiguration;
      return entityConfigs;
    });

    /** resultWithMapping : would be the final output after aggregating/mapping all the data from multiple external sources  */
    let resultWithMapping = [];

    /** list of all new keys used in resultWithMapping */
    let allNewMappedKeys = {};

    /** list of all External Sources that was used */
    let TableHeaders = [{ Label: "Field Name", Accessor: "FieldName" }];

    for (let i = 0; i < configuredApiCalls.length; i++) {
      /**customAPI will be an object that contains all the necessary information to make an axios request */
      let customAPI = configuredApiCalls[i];

      const customAPIrequest = await axios({
        method: customAPI.requestType,
        url: customAPI.requestUrl + `/${BorrowerId}`,
        data: customAPI.requestBody,
        headers: customAPI.requestHeaders,
        params: customAPI.requestParams,
      }).then((response) => {
        const resultData = response.data;
        TableHeaders.push({
          Label: response.data.ExternalSource,
          Accessor: response.data.ExternalSource,
        });

        //In the case wehre response Mapper is given
        if (customAPI.responseMapper) {
          const responseMapper = customAPI.responseMapper;
          const mappedKeyCheckOff = { ...allNewMappedKeys };

          for (const externalSystemKey in responseMapper) {
            //newMappedKey will be a new key that would be used in discrepancyReport
            const newMappedKey = responseMapper[externalSystemKey];

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
            }

            /** Case 1) newMappedKey does already exist in resultWithMapping */
            let doesFieldExist = 0;

            resultWithMapping.forEach((responseMapped) => {
              if (responseMapped.key_config.key === newMappedKey) {
                let sorceOfTruth =
                  desiredValueFromExternal ===
                  responseMapped.sourceSystem.trueValue;

                responseMapped.values.push({
                  value: desiredValueFromExternal,
                  matchesSoT: sorceOfTruth,
                });
                doesFieldExist++;
              }
            });
            if (doesFieldExist > 0) {
              continue;
            }

            /** Case 2) newMappedKey does not exist in resultWithMapping; we create a new row in discrepancy report */

            let valueArray = [];
            /** We make sure that responses get mapped to a correct cell */
            valueArray[i] = {
              value: desiredValueFromExternal,
              matchesSoT: true,
            };
            resultWithMapping.push({
              key_config: {
                key: newMappedKey,
                display: newMappedKey.replace(/([A-Z])([A-Z])/g, "$1 $2"),
              },
              sourceSystem: {
                source: resultData.ExternalSource,
                trueValue: desiredValueFromExternal,
              },
              values: valueArray,
            });
          }

          /**Case 3) After looping through a response mapper, we also need to check if value for previous
           * newMappedkeys exist in the data we got back from an external source
           */
          for (let remainingKey in mappedKeyCheckOff) {
            for (let i = 0; i < resultWithMapping.length; i++) {
              if (resultWithMapping[i].key_config.key === remainingKey) {
                resultWithMapping[i].values.push(null);
                break;
              }
            }
            resultWithMapping[i].values.push;
          }
        }
      });
      if (i === configuredApiCalls.length - 1) {
        res.json({ TableHeaders, TableData: resultWithMapping });
      }
    }
  } catch (err) {
    res.json({ ErrorStatus: err.status, ErrorMessage: err.message });
  }
});

module.exports = router;
