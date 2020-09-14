import React from "react"
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
        Label: "UUID",
        ID: "Uuid",
        sortable: false,
    },
    {
        Label: "First Name",
        ID: "FirstName",
        sortable: true,
    },
    {
        Label: "Last Name",
        ID: "LastName",
        sortable: true,
    },
    {
        Label: "Date of Birth",
        ID:"DateOfBirth",
        sortable: true,
    },
    {
        Label: "Phone",
        ID: "Phone",
        sortable: true,
    },
]

const rows = [
    {
        ID: "1",
        FirstName: "Joe",
        LastName: "Doe",
        DateOfBirth: "1987-01-01",
        Phone: "8861551515",
    },
    {
        ID: "2",
        FirstName: "John",
        LastName: "Smith",
        DateOfBirth: "1989-12-12",
        Phone: "8002552525",
    },
    {
        ID: "3",
        FirstName: "Ray",
        LastName: "Smith",
        DateOfBirth: "1988-11-11",
        Phone: "8003553535",
    },
]

const initialOrderBy = "FirstName"

const customCellRender = (rowIndex, row, column) => {
    const columnID = column.ID
    return (
        <TableCell key={`${rowIndex} ${columnID}`}>
            {row[columnID]}
        </TableCell>
    )
}

const customHeadRowProps = (column) => {
    return column.Uuid
}

const customBodyRowProps = (row) => {
    return row.Uuid
}

const displayCreateEmptyIcon = () => {
    return null
}

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