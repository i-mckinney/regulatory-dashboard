

let companyId = "5f7e1bb2ab26a664b6e950c8"

//// GET all report templates for a company
let getURL = `http://localhost:4005/reporttemplate/${companyId}`

// get single report template for a company
let getReportTemp = `http://localhost:4005/reporttemplate/${companyId}/:reportTemplateId`
// POST create a new report template
let postURL = `http://localhost:4005/reporttemplate/new`

// DELETE url
let deleteURL = `http://localhost:4005/reporttemplate/:companyId/:reportTemplateId`

//BELOW are list of things needeed in req.body
/******** STEP ONE *******/

 
let companyId = "5f7e1bb2ab26a664b6e950c8" // string

let reportTemplateName = "Insert Report Name" // string

let selectedReportColumn = "fieldName" //string

/**
 * Array -> Each element represents row
 * element -> Object : keys are the column, and values are corresponding values for
 * that cell and column.
 */
let reportTemplateFields = [
  {
    fieldCode:  "H1",
    fieldName:"RelationshipName"
  },
  {
    fieldCode:  "H2",
    fieldName:"MasterID"
  },
  {
    fieldCode:  "H3",
    fieldName:"BorrowerId"
  },
] 

// colum orders that are going to be shown in our normalization table
let columnOrder = ["fieldCode", "fieldName"];

/*********** STEP TWO ******/

let doesReportExist = false //boolean
let enableEntities = ture //boolean
let enableLoans = true //boolean

selectedEntitiyApiRequests = ["5342432432123","3243242w32432"] // array with list of custom api ids
selectedLoanApiRequests = ["111166dff42432432123","666feee242w32432"] // array with list of custom api ids

/*********** STEP Three ******/

let responseMappedEntiity = {
  fesf432421asfeara43er: [
    { RelationshipName: "relationshipName" },
    { MasterID: "masterId" },
    { BorrowerId: "borrowerId" },
  ],
};

let responseMappedLoans = {
  desfaee2342341fsdaffsdf: [
    { RelationshipName: "relationshipName" },
    { MasterID: "masterId" },
    { BorrowerId: "borrowerId" },
  ],
};

// OBJECT 
  //first key represents custom api id
  // value is an array -> each element is a response mapper 
  // key is key of report that was set in step 1 and value is normalization table key