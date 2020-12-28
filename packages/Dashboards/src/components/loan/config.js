// sortableExcludes is array of identifier that we do not want to sort
export const sortableExcludes = ["_id", "Actions"]

// columnExcludes is array of identifier that we do not want to display in the table
export const columnExcludes = ["ExternalSource", "onDashboard", "loanId", "loanType", "primaryBorrowerTIN", "primaryBorrowerBID", "primaryBorrowerTIN", "guarantorBID", "companyId", "associatedEntityId", "loanApiConfigurations","createdAt", "updatedAt"]

// innerColumnIncludes is array of identifier that we want to display for additional information in the table
export const innerColumnIncludes = ["loanId", "primaryBorrowerBID", "guarantorBID", "createdAt", "updatedAt"]

// columnLabels is array of label name that correspondings to columnFields EXCEPT _id (primary key)
// PRIMARY KEY must be FIRST in the array (required)
// These KEYS must be LAST in the array (required unless place it in columnExcludes)
// (1) User Created ( refers to "createdAt" (mongodb semantics) )
// (2) User Updated ( refers to replaces "updatedAt" (mongodb semantics) )
// (3) Actions
export const columnLabels = ["_id", "ExternalSource", "onDashboard", "Primary Borrower Name", "Guarantor Name", "Primary Borrower BID", "Guarantor BID", "Primary Borrower TIN",
"Loan ID", "Loan Type", "Commitment Amount", "Maturity Date", "Associated EntityId", "Company Id", "createdAt", "Actions"]