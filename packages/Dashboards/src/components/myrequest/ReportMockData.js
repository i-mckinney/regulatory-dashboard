let mockData = [
  { BorrowerId: "26393edd-e8c0-4a17-8ccd-fccec998ff49" },
  { RelationshipName: "Deckow - Nienow" },
  { BorrowerName: "Deckow - Nienow" },
  { DepositorName: "computer_purple_engage.pdf (DataError)" },
  { HQCity: "Lorenaland" },
  { HQState: "Wisconsin" },
  { HQPostalCode: "05958-3258" },
  { HQCountry: "persevering_unbranded.mp4v (DataError)" },
  { MailingAddress: "547 Spencer Landing" },
  { MailingCity: "New Giovani" },
  { MailingState: "Georgia" },
  { MailingPostalCode: "63103" },
  { PhoneNumberOne: "loaf.gif (DataError)" },
  { PhoneNumberTwo: "277.341.3263 x474" },
  { PhoneNumberThree: "(952) 888-5701" },
  { PhoneTypeOne: "Home" },
  { PhoneTypeTwo: "Home" },
  { PhoneTypeThree: "Home" },
  { EmailOne: "Stanton_Greenholt@yahoo.com" },
  { EmailTwo: "philippines_incredible.gif (DataError)" },
  { EmailThree: "Issac23@gmail.com" },
  { MasterID: "40853128" },
  { DepositorID: "redundant_global_ergonomic.png (DataError)" },
  { AccountOne: "04205686" },
  { AccountTwo: "77851833" },
  { AccountThree: "markets_workforce.pdf (DataError)" },
  { EntityType: "C-Corp" },
  { CostCenter: "public_key.html (DataError)" },
  { RelationshipManager: "CandidoAufderhar" },
  { PrimaryContact: "nevada.png (DataError)" },
  { BorrowerRiskRating: 9 },
  { GuarantorRiskRating: 8 },
  { MailinggAddressCountry: "Marshall Islands" },
  { NACISCode: "04593284" },
  { HQStreet_ddress: "8110 Alexandro Centers" },
];

function ReportMockData() {
  let finalRows = []

  for (let i = 0 ; i <mockData.length; i++){
    let num = i+ 1
    let fieldCode = "H" + num
    let fieldName;
    let fieldValue;

    for (let key in mockData[i]){
      fieldName = key
      fieldValue =mockData[i][key]
    }

    let row = {
      fieldCode,
      fieldName,
      fieldValue
    }

    finalRows.push(row)
  }

  return finalRows
}

export default ReportMockData;
