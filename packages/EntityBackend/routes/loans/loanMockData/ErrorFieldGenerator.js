const faker = require("faker");
const { BASEFIELDS } = require("./constants");
// While generating fake data, use this helper function to make discrepancies among data between external sources

exports.ErrorFieldGenerator = (loans, externalSourceName) => {
  let loanDiscrepancyData = loans.map((loan) => {
    let loanCopy = { ...loan, ExternalSource: externalSourceName };

    let numberOfFieldErrors = 12
    for (let i = 0; i < numberOfFieldErrors; i++) {
      //Altering FIELD VALUES to have discrepancies within field values among different external sources
      let randomFieldIdx = Math.floor(Math.random() * 16);
      if (randomFieldIdx === 0 || randomFieldIdx === 1) continue;
      let fieldToHaveError = BASEFIELDS[randomFieldIdx];

      if (fieldToHaveError === "PrimaryBorrowerTIN") {
        continue;
      }
      loanCopy[fieldToHaveError] =
        faker.system.commonFileName() + " (NewValue)";
    }
    return loanCopy;
  });

  return loanDiscrepancyData;
};
