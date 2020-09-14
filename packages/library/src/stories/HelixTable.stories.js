import React, { useState } from "react"
import { TableCell } from "@material-ui/core"
import { withKnobs } from "@storybook/addon-knobs"
import ThemeSelector from "../themes/ThemeSelector"
import HelixTable from "../components/Table/HelixTable/index"

export default {
    title:"Helix Components/Helix Table",
    decorators: [withKnobs],
    component: HelixTable,    
}

const columns = [
    {
        Label: "Helix UUID",
        accessor: "HelixUuid",
        sortable: false,
    },
    {
        Label: "First Name",
        accessor: "FirstName",
        sortable: true,
    },
    {
        Label: "Last Name",
        accessor: "LastName",
        sortable: true,
    },
    {
        Label: "Business Name",
        accessor:"BusinessName",
        sortable: true,
    },
    {
        Label: "Loan Amount",
        accessor: "LoanAmount",
        sortable: true,
    },
    {
        Label: "Tax ID",
        accessor: "TaxID",
        sortable: true,
    },
    {
        Label: "Phone",
        accessor: "Phone",
        sortable: true,
    },
    {
        Label: "NAICS",
        accessor: "NAICS",
        sortable: true,
    },
    {
        Label: "Profitable",
        accessor: "IsProfitable",
        sortable: true,
    },
    {
        Label: "Bankrupted In Last 10 Years",
        accessor: "BankruptedInLast10Years",
        sortable: true,
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

const initialOrderBy = "Owner"

const customCellRender = (rowIndex, row, column) => {
    const columnID = column.accessor
    return (
        <TableCell key={`${rowIndex} ${columnID}`}>
            {row[columnID]}
        </TableCell>
    )
}

const customHeadRowProps = (column) => column.accessor

const customBodyRowProps = (row) => row.Uuid

const displayCreateEmptyIcon = () => null

export const SampleHelixTable = () => {
    return (
        <ThemeSelector>
            <HelixTable 
            displayCreateIcon={displayCreateEmptyIcon}
            initialOrderBy={initialOrderBy} 
            columns={columns.slice(1)} 
            rows={rows} 
            customCellRender={customCellRender} 
            customHeadRowProps={customHeadRowProps} 
            customBodyRowProps={customBodyRowProps} />
        </ThemeSelector>
    )
}