
export const columns = [
    { Label: "Field", Accessor: "Field" }, 
    { Label: "Field Name", Accessor: "FieldName" },
    { Label: "FIS", Accessor: "FIS", customApiId: "1a" },
    { Label: "Temenos", Accessor: "Temenos", customApiId: "2a" },
    { Label: "Input Information", Accessor: "InputInformation" }
]

export const rows = [
    ["H1-1", "Relationship Name", "Abc Cafe", "Ice Cafe", "Null"],
    ["H1-2", "Master ID", "123456", "123456", "Null"],
    ["H1-3", "Account Number", "142322-34522", "142322-34522", "Null"],
    // ["H1-4", "Phone Number", "Null", "Null", ""]
]

export const externalValues = [
    ["Relationship Name", "Abc Cafe", "Ice Cafe", "Null"],
    ["Master ID", "123456", "123456", "Null"],
    ["Account Number", "142322-34522", "142322-34522", "Null"]
]

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
            }
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
            }
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
            }
        ],
    }
]

// TableData
// key_config:
// display: "relationshipName"
// key: "relationshipName"
// __proto__: Object
// sourceSystem:
// source: "5f8e7940c5885c30a56a4a00"
// trueValue: "Sawayn - Hermiston"
// __proto__: Object
// values: Array(2)
// 0: {externalValue: "Sawayn - Hermiston", matchesSoT: true, customApi_id: "5f8e7940c5885c30a56a4a00"}
// 1: {externalValue: "portals.mpe (DataError)", matchesSoT: true, customApi_id: "5f9759577eb265114467433e", currentValue: "Sawayn - Hermiston"}
// length: 2


// TableHeaders
// Accessor: "FieldName"
// Label: "Field Name"