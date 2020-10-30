/**
 * 
 * @param {string} customApiID  customApiID : used to identify a specific custom api
 * @param {obj} savedProposedChanges contains all the previously proposed changes related to a specific user and custom api call
 * ex)  {
            "relationshipName": {
                "CurrentValue": "testing",
                "SourceOfTruth": true
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
 *  * @param {obj} allNewMappedKeys object of all external systems used and * field name after looping through all calls
 * when we get data back from external sources, this function bringing in past changes we made and aggregate those data together
 */

async function mergingReportChanges(
  savedProposedChanges,
  resultWithMapping,
  customApiID
) {
  if (resultWithMapping) {
    for (let row of resultWithMapping) {

      //Name of fields for a ROW
      let fieldName = row["key_config"]["key"];

      //If user previously made changes to that cell
      if (savedProposedChanges.hasOwnProperty(row["key_config"]["key"])) {

        //If user selected the cell as source of truth
        if (savedProposedChanges[fieldName]["SourceOfTruth"]) {
          row["sourceSystem"]["source"] = customApiID;
          row["sourceSystem"]["trueValue"] =
            savedProposedChanges[fieldName]["CurrentValue"];
        }

        //proposed values that a user has inputted in the past
        let proposedValue = savedProposedChanges[fieldName]["CurrentValue"];
        let sourceOfTruthValue = row["sourceSystem"]["trueValue"];

        let entireRowArray = row["values"];
        let updatedCell = row["values"][entireRowArray.length - 1];

        //merging in changes to our mapped response
        let matchesSoT = sourceOfTruthValue === proposedValue;
        row["values"][entireRowArray.length - 1] = {
          ...updatedCell,
          currentValue: proposedValue,
          customApi_id: customApiID,
          matchesSoT,
        };
      }
    }
  }
}

module.exports = mergingReportChanges;
