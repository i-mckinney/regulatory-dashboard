/**
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
 * @param {string} configuredApiIdx getEntityConfigurations(companyId) 
 * will return a list of custom api calls that has been selected in 
 * entity configuration page.configuredApiIdx marks the index of 
 * custom api in that list.
 * @param {string} source name that represents which external sources the data is coming from
 * ex) "FIS", "Temenos"
 * @param {string} desiredValueFromExternal value that newMappedKey will have, using response mapper from it's parents,
 * we grab the correct value from the data we get back from external sources.
 * @param {string} newMappedKey this will be new mapped key that would be shown in the discrepancy report
 */
function newDiscrepancyRow(
  resultWithMapping,
  configuredApiIdx,
  source,
  desiredValueFromExternal,
  newMappedKey,
) {
   /** Case 2) newMappedKey does not exist in resultWithMapping; we create a new row in discrepancy report */
   let valueArray = [];
   /** We make sure that responses get mapped to a correct cell */
   valueArray[configuredApiIdx] = {
     value: desiredValueFromExternal,
     matchesSoT: true,
   };
   resultWithMapping.push({
     key_config: {
       key: newMappedKey,
       display: newMappedKey.replace(/([A-Z])([A-Z])/g, "$1 $2"),
     },
     sourceSystem: {
       source: source,
       trueValue: desiredValueFromExternal,
     },
     values: valueArray,
   });
}

module.exports = newDiscrepancyRow;
