import React, { useState, useEffect } from "react"
import { withRouter } from "react-router-dom"
import PropTypes from "prop-types"
import { Button } from "reactstrap"
import { Styles } from "./ReactTable/AdminDashboardStyle"
import AdminConfirmTable from "./ReactTable/AdminConfirmTable"
import ConfirmationModal from "./Common/ConfirmationModal"

/** @return {JSX} Confirmation Page
 * routed at /confirmation
 */

function Confirmation(props) {
  // tableData would be set to changes that comes from /editentity page.
  // Once user makes changes, saves them in /editentity and then presses confirm.
  // at /confirmation route, we are going to be able to access that edited data through using history.
  const [tableData, setInitialTableData] = useState([])

  // In the confirmation page, the only changes that are selected by the user would be in clickedTableRows,
  // Each element will be an object that contains information about the specific change that has been clicked by the user.
  const [clickedTableRows, setClickedTableRows] = useState([])

  /**
   * User would see the list of changes that they made in /editentity route as a table format with option to select and deselect
   * specific change. Thus handleConfirmChange, pushes that specific change into clickedTableRows only if user selects that specific
   * change from this page.
   */
  const hanldeConfirmChange = (evt) => {
    const copyCurrentTableData = [...tableData]
    const index = evt.target.id
    const currentRow = copyCurrentTableData[index]

    // toggle false and true
    currentRow.selected = !currentRow.selected

    if (currentRow.selected) {
      const selectedRow = currentRow
      setClickedTableRows([...clickedTableRows, selectedRow])
    } else {
      const filteredRows = clickedTableRows.filter(
        (row) => row.rowIndex !== currentRow.rowIndex
      )
      setClickedTableRows(filteredRows)
    }
    setInitialTableData(copyCurrentTableData)
  }

   /**
   * User would see the list of changes that they made in /editentity route as a table format with option to select and deselect
   * specific change. Thus handleDeleteChange, delete that specific change and cancel the change that has been made at /editentity page.
   */
  const handleDeleteChange = (evt) => {
    const copyCurrentTableData = [...tableData]
    const index = evt.target.id
    const currentRow = copyCurrentTableData[index]

    if (currentRow.selected) {
      const filteredRows = clickedTableRows.filter(
        (row) => row.rowIndex !== currentRow.rowIndex
      )
      setClickedTableRows(filteredRows)
    }
    const filteredRows = copyCurrentTableData.filter(
      (row) => row.rowIndex !== currentRow.rowIndex
    )
    setInitialTableData(filteredRows)
  }

  /** Renders only when it is mounted at first
   * we can access editEntityData from /editentiy through accessing history.location.state.
   * then we are going to filter out only ones that has been EDITED.
   * Then we are setting adding in two extra keys selected, rowIndex.
   * rowIndex would be used for unique identifiers
   * selected would be used for identifying whether user click to confirm or not confirm the changes that they made in /editentity.
   */
  useEffect(() => {
    if (props.history.location.state.editEntityData) {
      const editedDataFromtableData = props.history.location.state.editEntityData.filter(
        (field) => field.IsEdited === true
      )

      const markedtableData = editedDataFromtableData.map((data, index) => {
        return {
          ...data,
          selected: false,
          rowIndex: index,
        }
      })

      setInitialTableData(markedtableData)
    }
  }, [])

  /** setting custom cells for each specific columns while creating rows for the dashboard */
  const customRow = (cell, index) => {
    if (cell.column.Header === "Confirm Change") {
      return (
        <td {...cell.getCellProps()} key={cell.column.Header + index}>
          {cell.value ? (
            <Button
              color="success ml-2 mr-2"
              id={cell.row.id}
              onClick={hanldeConfirmChange}
            >
              Selected
            </Button>
          ) : (
            <Button
              outline
              color="primary ml-2 mr-2"
              id={cell.row.id}
              onClick={hanldeConfirmChange}
            >
              &nbsp;&nbsp;Select&nbsp;&nbsp;
            </Button>
          )}
          <Button
            outline
            color="danger mr-2"
            id={cell.row.id}
            onClick={handleDeleteChange}
          >
            Delete
          </Button>
        </td>
      )
    }
    return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
  }

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
      Header: "FieldName",
      accessor: "FieldName",
    },
    {
      Header: "System of Record",
      accessor: "SystemOfRecord",
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
    {
      Header: "Confirm Change",
      accessor: "selected",
    },
  ])

  // Boolean to determine whether first modal is open or not
  const [modalStepOne, setModalStepOne] = useState(false)
  // Used to toggle modalStepOne
  const handleStepOneOpen = () => setModalStepOne(true)
  const handleStepOneCancel = () => setModalStepOne(false)
  // When Cancel button is pressed, user is redirected to /editentity.
  const handleGoBacktoEditEntity = () => {
    props.history.push("/editentity")
  }

  return (
    <div>
      <Styles>
        <AdminConfirmTable
          columns={columns}
          data={tableData}
          customRowRender={customRow}
          destinationString="reports"
        />
      </Styles>
      <div style={{ textAlign: "center" }}>
        <Button className="mr-2" onClick={handleGoBacktoEditEntity}>
          Cancel
        </Button>
        <Button
          style={{ paddingLeft: "20px", paddingRight: "20px" }}
          color="primary"
          onClick={handleStepOneOpen}
        >
          Save Changes
        </Button>
        <ConfirmationModal
          handleStepOneOpen={handleStepOneOpen}
          handleStepOneCancel={handleStepOneCancel}
          isModalOneOpen={modalStepOne}
          clickedTableRows={clickedTableRows}
        />
      </div>
    </div>
  )
}

Confirmation.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
}

export default withRouter(Confirmation)
