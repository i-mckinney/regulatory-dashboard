const faker = require("faker");
const { BASEFIELDS } = require("../Helper/constants");
// While generating fake data, use this helper function to make discrepancies among data between external sources

exports.ErrorFieldGenerator = (entities, externalSourceName) => {
  let entityDiscrepancyData = entities.map((entity) => {
    let entityCopy = { ...entity,  ExternalSource:externalSourceName };

    let numberOfFieldErrors = Math.floor(Math.random() * 14);
    for (let i = 0; i < numberOfFieldErrors; i++) {
      //Altering FIELD VALUES to have discrepancies within field values among different external sources
      let randomFieldIdx = Math.floor(Math.random() * 35);
      if (randomFieldIdx === 0 || randomFieldIdx === 1) continue;
      let fieldToHaveError = BASEFIELDS[randomFieldIdx];
      entityCopy[fieldToHaveError] = faker.system.commonFileName() + " (DataError)";

      //Altering FIELD NAME to have discrepancies within field names among different external sources
      let randomFieldNameIdx = Math.floor(Math.random() * 35);
      if (randomFieldIdx === 0 || randomFieldIdx === 1) continue;

      let fieldNameChangers = ["_", "-", "|"];
      let randomFieldNameChangersIdx = Math.floor(Math.random() * 3);

      let fieldName = BASEFIELDS[randomFieldNameIdx];

      let randomFieldNameSpot = Math.floor(
        Math.random() * fieldName.length - 1
      );

      let discrepancyFieldName = fieldName.replace(
        fieldName[randomFieldNameSpot],
        fieldNameChangers[randomFieldNameChangersIdx]
      );

      entityCopy[discrepancyFieldName] = entity[fieldName];

      delete entityCopy[fieldName];
    }
    return entityCopy;
  });

  return entityDiscrepancyData;
};
