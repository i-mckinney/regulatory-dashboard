import { v4 as uuidv4 } from 'uuid';
export const initialReportTemplate = 
{
  companyId: "5f7e1bb2ab26a664b6e950c8",
  reportTemplateName: "",
  selectedReportColumn: "",
  reportTemplateFields: [],
  columnOrder: [],
  doesReportExist: false,
  enableEntities: true,
  enableLoans: true,
  selectedReportApiRequests: [],
  selectedReportApiRequestsDisplay: [],
  selectedEntityApiRequests: [],
  selectedEntityApiRequestsDisplay: [],
  selectedLoanApiRequests: [],
  selectedLoanApiRequestsDisplay:[],
  responseMappedReport: {},
  responseMappedEntity: {},
  responseMappedLoans: {},
}

export const initialRowData =[ 
  {
      _id: uuidv4(),
      Row: "1",
      FieldCode:'H1',
      FieldName:'',
      Actions:''
  },
  {
      _id: uuidv4(),
      Row: '2',
      FieldCode:'H2',
      FieldName:'',
      Actions:''
  },
  {
    _id: uuidv4(),
    Row: '3',
    FieldCode:'H3',
    FieldName:'',
    Actions:''
},
]
const columnLabels = ["_id", "Row", "Field Code", "Field Name", "Actions"]
export const initialColumnData = columnLabels.map((col)=>{
return ({ 
  Label: col,
  Accessor: col.replace(/\s+/g, '')
})
})