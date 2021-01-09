import React from "react"
import { makeStyles } from "@material-ui/core"
import { withKnobs } from "@storybook/addon-knobs"
import ThemeSelector from "../themes/ThemeSelector"
import CssBaseline from "@material-ui/core/CssBaseline"
import HelixTable from "../components/Table/HelixTable/index"
import HelixTableCell from "../components/Table/HelixTableCell/index"

export default {
    title:"Helix Components/Helix Table",
    decorators: [withKnobs],
    component: HelixTable,    
}

/**
 * 
 * HelixTable.stories.js contains this code. 
 * the index.js file that is in the same folder HelixTable is straight from our repo
 * this file is loading that code.
 * @title is the name of the component "Story" folder
 * @component needs to be set to the import component for the cool controls to populate
 * @ThemeSelector is this goofy way I figured out how to change themes on the components 
 * @decorator You have to add the decorator withKnobs for it to work.
 * 
 */

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
    },
    {
        Label: "Tax ID",
        Accessor: "TaxID",
        Sortable: true,
    },
    {
        Label: "Phone",
        Accessor: "Phone",
        Sortable: true,
    },
    {
        Label: "NAICS",
        Accessor: "NAICS",
        Sortable: true,
    },
    {
        Label: "Profitable",
        Accessor: "IsProfitable",
        Sortable: true,
    },
    {
        Label: "Bankrupted In Last 10 Years",
        Accessor: "BankruptedInLast10Years",
        Sortable: true,
    },
]

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

const initialOrderBy = "FirstName"

const customCellRender = (row, column, rowIndex, columnIndex) => {
    const columnAccessor = column.Accessor
    return (
        <HelixTableCell key={`Row-${rowIndex} ${columnAccessor}-${columnIndex}`} value={row[columnAccessor]} />
    )
}


const customHeadColumnKeyProp = (column) => column.Accessor

// The unique idenifier for whole row
const customBodyRowKeyProp = (row) => row.HelixUUID

// If your service does not need to AddIcon/Button return null ()
const displayCreateEmptyIcon = () => null

/**
 * @param {object} args represents arguments that SampleHelixTable needs
 */
export const SampleHelixTable = (args) => {
    return (
        <ThemeSelector>
            <CssBaseline />
            <HelixTable { ...args } />
        </ThemeSelector>
    )
}

/**
 * SampleHelixTable.args are arguments will provide to SampleHelixTable to work functionality
 */
SampleHelixTable.args = {
    toggleSearch: true,
    displayCreateIcon: displayCreateEmptyIcon,
    initialOrderBy: initialOrderBy,
    columns: columns.slice(1),
    rows: rows,
    customCellRender: customCellRender,
    customHeadColumnKeyProp: customHeadColumnKeyProp,
    customBodyRowKeyProp: customBodyRowKeyProp,
}

SampleHelixTable.parameters = {
    jest: ["HelixTable.test.js"],
};