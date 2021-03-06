// sortableExcludes is array of identifier that we do not want to sort
export const sortableExcludes = ["_id", "Actions"]

// columnExcludes is array of identifier that we do not want to display in the table
export const columnExcludes = []

// columnFields is array of fields that ReportInputForm will have 
export const columnFields = ["reportName", "archive"]

// columnLabels is array of label name that correspondings to columnFields EXCEPT _id (primary key)
// PRIMARY KEY must be FIRST in the array (required)
// These KEYS must be LAST in the array (required unless place it in columnExcludes)
// (1) Report Created ( refers to "createdAt" (mongodb semantics) )
// (2) Report Updated ( refers to replaces "updatedAt" (mongodb semantics) )
// (3) Actions
export const columnLabels = ["_id", "Report Name", "Archive"]


