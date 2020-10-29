const { ObjectId } = require("mongodb");

// db setup
const DbConnection = require("../db");
/**
 * 
 * @param {*} EntityId  BorrowerId : used to identify the specific entity among entities created by the user
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
// async function mergingReportChanges(
//   EntityId,
//   resultWithMapping,
//   allNewMappedKeys
// ) {
//   try {
//     const reportCollection = await DbConnection.getCollection(
//       "DiscrepanciesReport"
//     );
//     const discrepancyReportChanges = await reportCollection.findOne({
//       entity_id: ObjectId(EntityId),
//     });

//     const savedChanges = discrepancyReportChanges.savedChanges;

//     console.log(resultWithMapping)
//     //in the past, changes have been made in discrepancy report
//     if (discrepancyReportChanges) {
//       for (let idx = 0; idx < savedChanges.length; idx++) {
//         let rowFieldKey = savedChanges[idx]["key_config"]["key"];

//         //check if row that we made change to exist in discrepancy report
//         if (allNewMappedKeys[rowFieldKey] === "") {
//           /**we loop around the result of external data, and replace the row
//            * that has the same field key as savedChanges does. */

//           for (let row = 0; row < resultWithMapping.length; row++) {
//             if (resultWithMapping[row]["key_config"]["key"] === rowFieldKey) {
//               resultWithMapping[row] = savedChanges[idx];
//             }
//           }
//         }
//       }
//     }
//     return resultWithMapping;
//   } catch (err) {
//     return {
//       Error: "No changes were made in the past, Can not find saved changes",
//       Status: 404,
//     };
//   }
// }

async function mergingReportChanges(
  EntityId,
  resultWithMapping,
  allNewMappedKeys
) {
  try {
    const reportCollection = await DbConnection.getCollection(
      "DiscrepanciesReport"
    );
    const discrepancyReportChanges = await reportCollection.findOne({
      entity_id: ObjectId(EntityId),
    });

    //in the past, changes have been made in discrepancy report
    if (discrepancyReportChanges) {
      const savedChanges = discrepancyReportChanges.savedChanges;

      for (let column of savedChanges) {
        for (let cell of column) {
          for (let row of resultWithMapping) {
            if (row.key_config.key === cell.key) {
            }
          }
        }
      }
      return resultWithMapping;
    } else {
      return {
        Error: "No changes were made in the past, Can not find saved changes",
        Status: 404,
      };
    }
  } catch (err) {
    return {
      Error: err.Message,
      Status: err.Status,
    };
  }
}

module.exports = mergingReportChanges;
