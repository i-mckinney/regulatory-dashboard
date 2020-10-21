const faker = require("faker");
const { BASEFIELDS } = require("../Helper/constants");
// While generating fake data, use this helper function to make discrepancies among data between external sources

exports.ErrorFieldGenerator = (entities, externalSourceName) => {
  let entityDiscrepancyData = entities.map((entity) => {
    let entityCopy = { ...entity, ExternalSource: externalSourceName };

    let numberOfFieldErrors = Math.floor(Math.random() * 14);
    for (let i = 0; i < numberOfFieldErrors; i++) {
      //Altering FIELD VALUES to have discrepancies within field values among different external sources
      let randomFieldIdx = Math.floor(Math.random() * 35);
      if (randomFieldIdx === 0 || randomFieldIdx === 1) continue;
      let fieldToHaveError = BASEFIELDS[randomFieldIdx];
      entityCopy[fieldToHaveError] =
        faker.system.commonFileName() + " (DataError)";
    }
    return entityCopy;
  });

  errorFieldNames = [];
  // let numberOfFieldErrors = Math.floor(Math.random() * 11)
  for (let i = 0; i < 7; i++) {
    //Altering FIELD NAME to have discrepancies within field names among different external sources
    let randomFieldNameIdx = Math.floor(Math.random() * 35);
    if (randomFieldNameIdx === 0 || randomFieldNameIdx === 1) continue;
    
    let fieldNameChangers = ["_", "-", "|"];
    let randomFieldNameChangersIdx = Math.floor(Math.random() * 3);

    let fieldName = BASEFIELDS[randomFieldNameIdx];

    let randomFieldNameSpot = Math.floor(Math.random() * fieldName.length - 1);

    let discrepancyFieldName = fieldName.replace(
      fieldName[randomFieldNameSpot],
      fieldNameChangers[randomFieldNameChangersIdx]
    );
    errorFieldNames.push({
      previousName: fieldName,
      newName: discrepancyFieldName,
    });
  }
console.log(errorFieldNames)
  let finalData = entityDiscrepancyData.map( row => {
    let rowCopy = { ...row}
    for (let t = 0 ; t< errorFieldNames.length; t++){
      let previousName = errorFieldNames[t].previousName
      let newName = errorFieldNames[t].newName
      rowCopy[newName] = rowCopy[previousName]
      delete rowCopy[previousName]
    }
    //   console.log(previousName)
    //   console.log(newName)
    //   console.log(row[previousName])
    // }
    // console.log(rowCopy)
    return rowCopy
  })

  // console.log(finalData)
  // entityCopy[discrepancyFieldName] = entity[fieldName];

  // delete entityCopy[fieldName];

  return finalData;
};
