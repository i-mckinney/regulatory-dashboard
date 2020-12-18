import React from "react"
import { withKnobs } from "@storybook/addon-knobs"
import ThemeSelector from "../themes/ThemeSelector"
import CssBaseline from "@material-ui/core/CssBaseline"
import { v4 as uuidv4 } from 'uuid';
import HelixTableGeneric from "../components/Table/TableGeneric/HelixTableGeneric/index"

export default {
    title:"Helix Components/Helix Table Generic",
    decorators: [withKnobs],
    component: HelixTableGeneric 
}

/**
 * 
 * HelixTableGeneric.stories.js contains this code. 
 * the index.js file that is in the same folder HelixTable is straight from our repo
 * this file is loading that code.
 * @title is the name of the component "Story" folder
 * @component needs to be set to the import component for the cool controls to populate
 * @ThemeSelector is this goofy way I figured out how to change themes on the components 
 * @decorator You have to add the decorator withKnobs for it to work.
 * 
 */
const initialMockRows =[ 
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
      FieldName:'MasterID',
      Actions:''
  },
]
const mockColumnLabels = ["_id", "Row", "Field Code", "Field Name", "Actions"]

const initialMockColumns = mockColumnLabels.map((col)=>{
  return ({ 
    Label: col,
    Accessor: col.replace(/\s+/g, ''),
    Sortable: true
  })
})

/**
 * @param {object} args represents arguments that SampleHelixTable needs
 */
export const SampleHelixTableGeneric = (args) => {

  // Row data to be passed to next component
  const [rows, setRows] = React.useState(initialMockRows)
  // Column data to be passed to next component
  const [columns, setColumns] = React.useState(initialMockColumns)

  return (
      <ThemeSelector>
          <CssBaseline />
            <HelixTableGeneric { ...args}
              columns = {columns}
              rows= {rows}
              setColumns = {setColumns} 
              setRows = {setRows}
              />
      </ThemeSelector>
  )
}

/**
 * SampleHelixTableGeneric.args are arguments will provide to SampleHelixTable to work functionality
 */
SampleHelixTableGeneric.args = {
  initialOrderBy: '',
  toggleSearch: true,
  showAddRow: true,
  showAddColumn: true,
  deleteColumnOption: true,
  editColumnOption: true,
  editableRows: true,
  columns: initialMockColumns,
  rows: initialMockRows,
}
