import React from "react"
import { Styles } from "./ReactTable/AdminDashboardStyle"
import AdminDashboard from "./ReactTable/AdminDashboard"

/** @return {JSX} Regulatory site
 * routed at /Regulatory
 */

function Regulatory() {
  /** useMemo is a React hook that memorizes the output of a function.
   * It's important that we're using React.useMemo here to ensure that our data isn't recreated on every render.
   * If we didn't use React.useMemo, the table would think it was receiving new data on every render
   * and attempt to recalulate a lot of logic every single time. Only when the memoized value actually changes, it re renders
   * Header -> Represents what is shown in the table
   * Accessor -> represents key that you look for in a given data
   * Filter -> choosing which filter to use.
   * filter -> includes (tells react table to show values that matches the value in the select field)
   * Filter not given -> will use global filter
   * */
  const columns = React.useMemo(() => [
    {
      Header: "Loan ID",
      accessor: "LoanID",
    },
    {
      Header: "Primary Borrower",
      accessor: "PrimaryBorrower",
    },
    {
      Header: "Guarantor",
      accessor: "Guarantor",
    },
    {
      Header: "PrimaryTIN",
      accessor: "PrimaryTIN",
    },
    {
      Header: "Commitment Type",
      accessor: "CommitmentType",
    },
    {
      Header: "Commitment Amount",
      accessor: "CommitmentAmount",
    },
    {
      Header: "Outstanding Amount",
      accessor: "OutstandingAmount",
    },
  ])
  const mockData = [
    {
      LoanID: "Loan",
      PrimaryBorrower: "Eric Jho",
      Guarantor: "David Geisinger",
      PrimaryTIN: "L2343243",
      CommitmentType: "Message",
      CommitmentAmount: "$30,200",
      OutstandingAmount: "$32,333",
    },
  ]

  /** setting custom cells for each specific columns while creating rows for the dashboard */
  const customRow = (cell) => {
    return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
  }

  return (
    <div>
      <h4 className="mt-1 ml-4">Regulatory</h4>
      <Styles>
        <AdminDashboard
          columns={columns}
          data={mockData}
          customRowRender={customRow}
          destinationString="reports"
        />
      </Styles>
    </div>
  )
}

export default Regulatory
