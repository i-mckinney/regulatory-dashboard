export const columns = [
  { Label: "Field", Accessor: "Field" },
  { Label: "Field Name", Accessor: "FieldName" },
  { Label: "FIS", Accessor: "FIS", customApiId: "1a" },
  { Label: "Temenos", Accessor: "Temenos", customApiId: "2a" },
  { Label: "Input Information", Accessor: "InputInformation" },
];

export const rows = [
  ["H1-1", "Relationship Name", "Abc Cafe", "Ice Cafe", "Null"],
  ["H1-2", "Master ID", "123456", "123456", "Null"],
  ["H1-3", "Account Number", "142322-34522", "142322-34522", "Null"],
];

export const externalValues = [
  ["Relationship Name", "Abc Cafe", "Ice Cafe", "Null"],
  ["Master ID", "123456", "123456", "Null"],
  ["Account Number", "142322-34522", "142322-34522", "Null"],
];

export const data = [
  {
    key_config: {
      fieldID: "H1-1",
      display: "Relationship Name",
      key: "relationshipName",
    },
    sourceSystem: {
      source: "1a",
      trueValue: "Abc Cafe",
    },
    values: [
      {
        externalValue: "Abc Cafe",
        matchesSoT: true,
      },
      {
        externalValue: "Ice Cafe",
        matchesSoT: false,
      },
    ],
  },
  {
    key_config: {
      fieldID: "H1-2",
      display: "Master ID",
      key: "masterID",
    },
    sourceSystem: {
      source: "2a",
      trueValue: "123456",
    },
    values: [
      {
        externalValue: "123456",
        matchesSoT: true,
      },
      {
        externalValue: "123456",
        matchesSoT: true,
      },
    ],
  },
  {
    key_config: {
      fieldID: "H1-2",
      display: "Account Number",
      key: "AccountNumber",
    },
    sourceSystem: {
      source: "2a",
      trueValue: "142322-34522",
    },
    values: [
      {
        externalValue: "142322-34522",
        matchesSoT: true,
      },
      {
        externalValue: "142322-34522",
        matchesSoT: true,
      },
    ],
  },
  {
    key_config: {
      fieldID: "H1-2",
      display: "Account Number",
      key: "AccountNumber",
    },
    sourceSystem: {
      source: "2a",
      trueValue: "142322-34522",
    },
    values: [
      {
        externalValue: "142322-34522",
        matchesSoT: true,
      },
      {
        externalValue: "142322-34522",
        matchesSoT: true,
      },
    ],
  },
];
