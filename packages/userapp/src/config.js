// sortableExcludes is array of identifier that we do not want to sort
export const sortableExcludes = ["_id", "MiddleName", "PhoneType", "Actions", "Address1", "Address2", "City", "State", "Country", "Zipcode", "Actions"]

// columnExcludes is array of identifier that we do not want to display in the table
export const columnExcludes = ["updatedAt", "MiddleName", "Address1", "Address2", "City", "State", "Country", "Zipcode"]

// columnFields is array of fields that UserForm will have 
export const columnFields = ["Username","FirstName", "MiddleName", "LastName", "Address1", "Address2", "City", "State", "Country", "Zipcode", "DateOfBirth", "Role"]

// columnLabels is array of label name that correspondings to columnFields EXCEPT _id (primary key)
// PRIMARY KEY must be FIRST in the array
export const columnLabels = ["_id","Username","First Name", "Middle Name", "Last Name", "Address1", "Address2", "City", "State", "Country", "Zip Code", "Date Of Birth", "Role", "Actions"]

// dateTypeFields is array of fieldname that are date type
export const dateTypeFields = ["DateOfBirth"]

