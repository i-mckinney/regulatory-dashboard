// sortableExcludes is array of identifier that we do not want to sort
export const sortableExcludes = ["_id", "Actions"]

// columnExcludes is array of identifier that we do not want to display in the table
export const columnExcludes = ["loanId", "primaryBorrowerTIN", "guarantorBID", "companyId", "associatedEntityId", "loanApiConfigurations","createdAt", "updatedAt"]

// innerColumnIncludes is array of identifier that we want to display for additional information in the table
export const innerColumnIncludes = ["loanId", "primaryBorrowerTIN", "guarantorBID", "createdAt", "updatedAt"]

// columnFields is array of fields that LoanForm will have 
export const columnFields = ["loanName", "primaryBorrowerName", "guarantorName", "commitmentAmount", "maturityDate"]

// columnLabels is array of label name that correspondings to columnFields EXCEPT _id (primary key)
// PRIMARY KEY must be FIRST in the array (required)
// These KEYS must be LAST in the array (required unless place it in columnExcludes)
// (1) User Created ( refers to "createdAt" (mongodb semantics) )
// (2) User Updated ( refers to replaces "updatedAt" (mongodb semantics) )
// (3) Actions
export const columnLabels = ["_id", "Commitment Amount", "Loan Created", "Guarantor BID", "Guarantor Name", "Loan ID", "Loan Name", "Maturity Date", "Primary Borrower Name", "Primary Borrower TIN", "Associated Entity ID", "Company ID", "Actions"]

// ---"_id": "5fe0bffc2000e93a5eb991d1",
// ---"commitmentAmount": "$31,000,000",
// ---"createdAt": "12/10/12",
// ---"guarantorBID": "1784445",
// ---"guarantorName": "Julie Davis",
// ---"loanId": "1347288",
// ---"loanName": "Burger Boss, Inc.",
// ---"maturityDate": "12/31/22",
// ---"primaryBorrowerName": "Burger Boss, Inc.",
// ---"primaryBorrowerTIN": "678912234",
// ---"associatedEntityId": "5f7faf2d63836e4d94ade998",
// ---"companyId": "5f7e1bb2ab26a664b6e950c8"