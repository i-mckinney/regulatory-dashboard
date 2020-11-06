// sortableExcludes is array of identifier that we do not want to sort
export const sortableExcludes = ["_id", "Actions"]

// columnExcludes is array of identifier that we do not want to display in the table
export const columnExcludes = ["Request Created", "Request Updated"]

// columnFields is array of fields that MyRequests Table will have 
export const columnFields = ["requestType", "reportName", "approver", "submitter", "startDate", "submittedDated"]
// columnLabels is array of label name that correspondings to columnFields EXCEPT _id (primary key)
// PRIMARY KEY must be FIRST in the array (required)
// These KEYS must be LAST in the array (required unless place it in columnExcludes)
// (1) User Created ( refers to "createdAt" (mongodb semantics) )
// (2) User Updated ( refers to replaces "updatedAt" (mongodb semantics) )
// (3) Actions

export const columnLabels = ["_id", "Request Type", "Report Name", "Approver", "Submitter", "Start Date", "Submitted Date", "Actions" ]