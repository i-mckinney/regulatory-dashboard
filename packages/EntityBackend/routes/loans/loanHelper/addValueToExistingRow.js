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
 * 
 * @param {string} desiredValueFromExternal value that newMappedKey will have, using response mapper from it's parents,
 * we grab the correct value from the data we get back from external sources.
 * @param {string} newMappedKey this will be new mapped key that would be shown in the discrepancy report
 */
function addValueToExistingRow(
  resultWithMapping,
  desiredValueFromExternal,
  newMappedKey,
  customApiId,
) {
  let doesFieldExist = false;

  resultWithMapping.forEach((responseMapped) => {
    if (responseMapped["key_config"]["key"] === newMappedKey) {
      let sourceOfTruth =
        desiredValueFromExternal === responseMapped.sourceSystem.trueValue;

      responseMapped.values.push({
        externalValue: desiredValueFromExternal,
        matchesSoT: sourceOfTruth,
        customApi_id: customApiId,
      });
      doesFieldExist = true;
    }
  });

  return doesFieldExist;
}
module.exports = addValueToExistingRow;
