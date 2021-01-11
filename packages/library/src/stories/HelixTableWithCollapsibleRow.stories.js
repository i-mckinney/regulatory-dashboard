import React from "react"
import { withKnobs } from "@storybook/addon-knobs"
import ThemeSelector from "../themes/ThemeSelector"
import CssBaseline from "@material-ui/core/CssBaseline"
import HelixTable from "../components/Table/HelixTable/index"
import HelixCollapsibleRow from "../components/Table/HelixCollapsibleRow/index"
import HelixTableCell from "../components/Table/HelixTableCell/index"

export default {
    title:"Helix Components/Helix Table with Collapsible Row",
    decorators: [withKnobs],
    component: HelixCollapsibleRow,    
}

/**
 * 
 * SampleHelixTableWithCollapsibleRow.stories.js contains this code. 
 * the index.js file that is in the same folder HelixCollapsibleRow is straight from our repo
 * this file is loading that code.
 * @title is the name of the component "Story" folder
 * @component needs to be set to the import component for the cool controls to populate
 * @ThemeSelector is this goofy way I figured out how to change themes on the components 
 * @decorator You have to add the decorator withKnobs for it to work.
 * 
 */

// columns contains mock data of array of columns (objects)
const columns = [
    {
        Label: "Helix UUID",
        Accessor: "HelixUuid",
        Sortable: false,
    },
    {
        Label: "First Name",
        Accessor: "FirstName",
        Sortable: true,
    },
    {
        Label: "Last Name",
        Accessor: "LastName",
        Sortable: true,
    },
    {
        Label: "Business Name",
        Accessor:"BusinessName",
        Sortable: true,
    },
    {
        Label: "Loan Amount",
        Accessor: "LoanAmount",
        Sortable: true,
    }
]

// rows contains mock data of array of row (objects)
const rows = [
    {
        "HelixUUID": "59413728",
        "FirstName": "John",
        "LastName": "Doe",
        "BusinessName": "Kircuit City",
        "LoanAmount": "125000",
        "TaxID": "283375991",
        "Phone": "8001498422",
        "NAICS": "32541",
        "IsProfitable": "No",
        "BankruptedInLast10Years": "Yes",
    },
    {
        "HelixUUID": "75643829",
        "FirstName": "Joy",
        "LastName": "Doe",
        "BusinessName": "Pi Inc",
        "LoanAmount": "75000",
        "TaxID": "590193680",
        "Phone": "8662138532",
        "NAICS": "99542",
        "IsProfitable": "Yes",
        "BankruptedInLast10Years": "No",
    },
    {
        "HelixUUID": "92387456",
        "FirstName": "Ray",
        "LastName": "Smith",
        "BusinessName": "Apple LLC",
        "LoanAmount": "1000000",
        "TaxID": "258456913",
        "Phone": "8009498588",
        "NAICS": "79232",
        "IsProfitable": "Yes",
        "BankruptedInLast10Years": "No",
    }
]

// Initially, we can start the table to order by Loan Name or etc in ascending order
const initialOrderBy = "FirstName"

/**
 * @param {object} row row represents loan object
 * @param {int} rowIndex rowIndex represents the index of the current row object
 * @param {object} columns columns represents list of columns
 * @param {func} customCellRender represents HelixTableCell of object properties in that Table row
 */
const customCollapsibleRowRender = (
row,
rowIndex,
columns,
customCellRender
) => {
    const innerTableHeadColumnLabels = ["Tax ID", "Phone", "NAICS", "Is Profitable", "Bankrupted In Last 10 Years"]
    const innerTableBodyRows = [row.TaxID, row.Phone, row.NAICS, row.IsProfitable, row.BankruptedInLast10Years]
    return (
        <HelixCollapsibleRow
        key={row.HelixUUID}
        row={row}
        rowIndex={rowIndex}
        columns={columns}
        innerTableHeadColumns={innerTableHeadColumnLabels}
        innerTableBodyRows={innerTableBodyRows}
        customCellRender={customCellRender}
        />
    )
}

/**
 * @param {object} row the row is an object of data
 * @param {object} column the column is an object of the header with accessor and label props
 * @param {int} rowIndex the rowIndex represents index of the row
 * @param {int} columnIndex the columnIndex represents index of the column
 * @return {JSX} HelixTableCell of object properties in that Table row
 */
const customCellRender = (row, column, rowIndex, columnIndex) => {
    const columnAccessor = column.Accessor
    return (
        <HelixTableCell key={`Row-${rowIndex} ${columnAccessor}-${columnIndex}`} value={row[columnAccessor]} />
    )
}

/**
 * @param {object} column represent object data regarding the api result
 * @return {string} provide table row with unique key props (required)
 */
const customHeadColumnKeyProp = (column) => column.Accessor

/**
 * @param {object} row represent object data regarding the api result
 * @return {string} provide table row with unique key props (required)
 */
const customBodyRowKeyProp = (row) => row.HelixUUID

// If your service does not need to AddIcon/Button return null ()
const displayCreateEmptyIcon = () => null

/**
 * @param {object} args represents arguments that SampleHelixTableWithCollapsibleRow needs
 */
export const SampleHelixTableWithCollapsibleRow = (args) => {
    return (
        <ThemeSelector>
            <CssBaseline />
            <HelixTable { ...args } />
        </ThemeSelector>
    )
}

/**
 * SampleHelixTableWithCollapsibleRow.args are arguments will provide to SampleHelixTableWithCollapsibleRow to work functionality
 */
SampleHelixTableWithCollapsibleRow.args = {
    toggleSearch: true,
    toggleExpandable: true,
    displayCreateIcon: displayCreateEmptyIcon,
    initialOrderBy: initialOrderBy,
    columns: columns.slice(1),
    rows: rows,
    customCellRender: customCellRender,
    customHeadColumnKeyProp: customHeadColumnKeyProp,
    customBodyRowKeyProp: customBodyRowKeyProp,
    customCollapsibleRowRender: customCollapsibleRowRender,
}

SampleHelixTableWithCollapsibleRow.parameters = {
    jest: ["HelixTable.test.js"],
};