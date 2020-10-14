const DbConnection = require("../db");

//Helper Function to reset fake data coming from external sources in db
const ResetData = async () => {
  try {
    const companyProfileList = [
      "FIS",
      "Temenos",
      "SalesForce",
      "DataWarehouse",
    ];
    for (let i = 0; i < companyProfileList.length; i++) {
      var dbCollection = await DbConnection.getCollection(
        companyProfileList[i]
      );
      await dbCollection.deleteMany({});
    }
  } catch (e) {
    throw new Error(e);
  }
};

module.exports = ResetData;
