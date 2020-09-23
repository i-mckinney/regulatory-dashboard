// sortableExcludes is array of identifier that we do not want to sort
export const sortableExcludes = ["_id", "MiddleName", "PhoneType", "Address1", "Address2", "City", "State", "Country", "Zipcode", "Actions"]

// columnExcludes is array of identifier that we do not want to display in the table
export const columnExcludes = ["MiddleName", "Address1", "Address2", "City", "State", "Country", "Zipcode"]

// columnFields is array of fields that UserForm will have 
export const columnFields = ["Username","FirstName", "MiddleName", "LastName", "Address1", "Address2", "City", "State", "Country", "Zipcode", "DateOfBirth"]

// columnLabels is array of label name that correspondings to columnFields EXCEPT _id (primary key)
// PRIMARY KEY must be FIRST in the array (required)
// These KEYS must be LAST in the array (required unless place it in columnExcludes)
// (1) User Created ( refers to "createdAt" (mongodb semantics) )
// (2) User Updated ( refers to replaces "updatedAt" (mongodb semantics) )
// (3) Actions
export const columnLabels = ["_id","Username","First Name", "Middle Name", "Last Name", "Address1", "Address2", "City", "State", "Country", "Zip Code", "Date Of Birth", "User Created", "User Updated", "Actions"]

// dateTypeFields is array of fieldname that are date type
export const dateTypeFields = ["DateOfBirth"]

