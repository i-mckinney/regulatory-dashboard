const faker = require("faker");
const { BASEFIELDS } = require("../Helper/constants");

exports.ErrorFieldGenerator = (entities) => {

  var entityFakeData = entities.map((entity) => {
    var errorFieldNumberLimit = Math.floor(Math.random() * 14);
    var entityCopy = { ...entity };
    for (let i = 0; i < errorFieldNumberLimit; i++) {
      var chosenField = Math.floor(Math.random() * 35);
      if (chosenField === 0) continue;
      var errorField = BASEFIELDS[chosenField];
      console.log(errorField)
      entityCopy[errorField] = faker.system.commonFileName() + " (DataError)";
    }
    return entityCopy;
  });
  return entityFakeData
};
