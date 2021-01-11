import React, { useState } from "react";
import { render, fireEvent } from "@testing-library/react";
import HelixTable from "./index";
import HelixTableCell from "../HelixTableCell/index"
import "@testing-library/jest-dom/extend-expect";

function SampleHelixTable() {
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

    return (
        <HelixTable
        toggleSearch={true}
        displayCreateIcon={displayCreateEmptyIcon}
        initialOrderBy={initialOrderBy}
        columns={columns.slice(1)}
        rows={rows}
        customCellRender={customCellRender}
        customHeadColumnKeyProp={customHeadColumnKeyProp}
        customBodyRowKeyProp={customBodyRowKeyProp}
        />
    )
}

const setup = () => {
    const utils = render(<SampleHelixTable />)
    return {
        ...utils,
    }
}

afterEach(() => {
    jest.clearAllMocks();
})

it("should render a HelixTable", () => {
    const { ...utils } = setup()

    const table = utils.getByRole("table")

    expect(table).toBeDefined()
})

it("HelixTable contains three rows", () => {
    const { ...utils } = setup()

    const rowgroup = utils.queryAllByRole("rowgroup")
    expect(rowgroup).toHaveLength(3)
})

it("HelixTable contains 9 header columns", () => {
    const { ...utils } = setup()

    const columnHeaders = utils.queryAllByRole("columnheader")

    expect(columnHeaders).toHaveLength(9)
})

it("should have a search bar and search for first name 'John' in the table", () => {
    const { ...utils } = setup()

    const textbox = utils.getByRole("textbox")
    fireEvent.change(textbox, { target: { value: "John" } })

    expect(textbox.value).toBe("John")
})

it("HelixTable contains first name 'John' after user inputted 'John' into textbox", () => {
    const { ...utils } = setup()

    const textbox = utils.getByRole("textbox")
    fireEvent.change(textbox, { target: { value: "John" } })
    const firstName = utils.getByText("John")
    
    expect(firstName.textContent).toBe("John")
})

it("search for last name 'Doe' in the table", () => {
    const { ...utils } = setup()

    const textbox = utils.getByRole("textbox")
    fireEvent.change(textbox, { target: { value: "Doe" } })

    expect(textbox.value).toBe("Doe")
})

it("HelixTable contains two last name of 'Doe' after user inputted 'Doe' into textbox", () => {
    const { ...utils } = setup()

    const textbox = utils.getByRole("textbox")
    fireEvent.change(textbox, { target: { value: "Doe" } })
    const lastName = utils.getAllByText("Doe")

    expect(lastName[0].textContent).toBe("Doe")
    expect(lastName[1].textContent).toBe("Doe")
})

it("search for business name 'Kircuit City' in the table", () => {
    const { ...utils } = setup()

    const textbox = utils.getByRole("textbox")
    fireEvent.change(textbox, { target: { value: "Kircuit City" } })

    expect(textbox.value).toBe("Kircuit City")
})

it("HelixTable contains business name 'Kircuit City' after user inputted 'Kircuit City' into textbox", () => {
    const { ...utils } = setup()

    const textbox = utils.getByRole("textbox")
    fireEvent.change(textbox, { target: { value: "Kircuit City" } })
    const businessName = utils.getByText("Kircuit City")
    
    expect(businessName.textContent).toBe("Kircuit City")
})

it("search for loan amount '125000' in the table", () => {
    const { ...utils } = setup()

    const textbox = utils.getByRole("textbox")
    fireEvent.change(textbox, { target: { value: "125000" } })

    expect(textbox.value).toBe("125000")
})

it("HelixTable contains loan amount '125000' after user inputted '125000' into textbox", () => {
    const { ...utils } = setup()

    const textbox = utils.getByRole("textbox")
    fireEvent.change(textbox, { target: { value: "125000" } })
    const loanAmount = utils.getByText("125000")
    
    expect(loanAmount.textContent).toBe("125000")
})

it("search for tax id '258456913' in the table", () => {
    const { ...utils } = setup()

    const textbox = utils.getByRole("textbox")
    fireEvent.change(textbox, { target: { value: "258456913" } })

    expect(textbox.value).toBe("258456913")
})

it("HelixTable contains tax id '258456913' after user inputted '258456913' into textbox", () => {
    const { ...utils } = setup()

    const textbox = utils.getByRole("textbox")
    fireEvent.change(textbox, { target: { value: "258456913" } })
    const taxId = utils.getByText("258456913")

    expect(taxId.textContent).toBe("258456913")
})

it("Rows per page exist in this table container", () => {
    const { ...utils } = setup()

    const combobox = utils.getByRole("combobox")

    expect(combobox).toBeDefined()
})

it("Options are available in 5, 10, 25, 50, and all", () => {
    const { ...utils } = setup()

    const options = utils.queryAllByRole("option")

    expect(options[0].value).toBe("5")
    expect(options[1].value).toBe("10")
    expect(options[2].value).toBe("25")
    expect(options[3].value).toBe("50")
    expect(options[4].value).toBe("-1")
})