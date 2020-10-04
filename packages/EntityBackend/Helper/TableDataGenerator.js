const { BASEFIELDS_NAME, BASEFIELDS } = require("../Helper/constants");
/**
 * @param {array} entityList list of entity data from different external sources such as temenos, salesforce, datawarehouse
 * Return aggregated list of object that contains responses from each external services
 */
function TableDataGenerator(entityList) {
  let TableData = [];
  let fieldPointer = 0;

  for (let field of BASEFIELDS) {
    if (field === "userId") {
      fieldPointer++;
      continue;
    }

    let values = [BASEFIELDS_NAME[fieldPointer]];

    for (let i = 0; i < entityList.length; i++) {
      values.push(entityList[i][field]);
    }

    const singleFieldObject = {
      key_config: {
        key: field,
        display: BASEFIELDS_NAME[fieldPointer],
      },
      values,
    };

    TableData.push(singleFieldObject);

    fieldPointer++;
  }

  return TableData;
}

module.exports = TableDataGenerator;
