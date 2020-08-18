import React, { useState } from "react"
import PropTypes from "prop-types"
import { Button } from "reactstrap"
import { Styles } from "./ReactTable/AdminDashboardStyle"
import AdminConfirmTable from "./ReactTable/AdminConfirmTable"
import ConfirmationModal from "./Common/ConfirmationModal"

/** @return {JSX} Dashboard site
 * routed at /dashboard
 */

function Confirmation() {
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
      Header: "Confirm Change",
      accessor: "ConfirmChange",
    },
    {
      Header: "Data Field",
      accessor: "DataField",
    },
    {
      Header: "System of Records",
      accessor: "SystemOfRecords",
    },
    {
      Header: "Previous Value",
      accessor: "PreviousValue",
    },
    {
      Header: "New Value",
      accessor: "NewValue",
    },
    {
      Header: "Source System",
      accessor: "SourceSystem",
    },
  ])
  const mockData = [
    {
      ConfirmChange: "Loan",
      DataField: "Eric Jho",
      SystemOfRecords: "3243262354",
      PreviousValue: "L2343243",
      NewValue: "3234-1235125325-324",
      SourceSystem: "David Geisinger",
    },
  ]

    /** Boolean state for showing modal when delte report template button is clicked.
   * once button is clicked, it is setting Modal to true by toggle
   * inside the modal, if cancel button is clicked, toggle is dispatched once more, setting modal to false.
   */
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);


  const handleAcceptChange = (evt) => {
    console.log(evt.target.id)
  }

  const handleConfirmationModal = () => {

  }
  /** setting custom cells for each specific columns while creating rows for the dashboard */
  const customRow = (cell, index) => {
    console.log(index)
    if (cell.column.Header === "Confirm Change") {
      return (
        <td style={{ display: "flex", alignItems: "center" }}>
          <Button color="primary mr-2"> Select </Button>
          <Button color="danger"> Delete </Button>
        </td>
      )
    }
    return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
  }

  return (
    <div>
      <Styles>
        <AdminConfirmTable
          columns={columns}
          data={mockData}
          customRowRender={customRow}
          destinationString="reports"
        />
      </Styles>
      <div style={{ textAlign: "center" }}>
        <Button
          style={{ paddingLeft: "20px", paddingRight: "20px" }}
          color="primary"
          onClick={toggle}
        >
          Save Changes
        </Button>
        <ConfirmationModal
          toggle={toggle}
          isOpen={modal}
          // handleDelete={handleDeleteClient}
          deleteString="Client"
        />
      </div>
    </div>
  )
}

// Confirmation.propTypes = {
//   changedData: PropTypes.instanceOf(Array).isRequired,
// }

export default Confirmation
