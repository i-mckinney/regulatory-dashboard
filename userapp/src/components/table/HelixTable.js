import React, { useState } from "react"
import { Paper, TableContainer, Table } from "@material-ui/core"
import PropTypes from "prop-types"
import HelixTableHead from "./HelixTableHead"
import HelixTableBody from "./HelixTableBody"
import HelixTableFooter from "./HelixTableFooter"

/**
 * @param {array} columns Array of object where each object contains which filter to use, header label and accessor for getting specific key from data object
 * @param {array} rows API result from getting a list of items such as report templates, clients and etc.(depending on where it is used)
 * @param {func} customCellRender func represent custom func that return jsx of table row of table cell values
 * @param {func} customHeadRowProps func represent custom func that return key props for table row in table head (required)
 * @param {func} customBodyRowProps func represent custom func that return key props for the table row in table body (required)
 * @returns {JSX} renders a custom table
 */
const HelixTable = ({
  columns,
  rows,
  customCellRender,
  customHeadRowProps,
  customBodyRowProps,
}) => {
  // Page is needed for pagination to determine the process of what page it is at
  const [page, setPage] = useState(0)

  // rowsPerPage is needed for pagination to determine how many rows should be display per page
  const [rowsPerPage, setRowsPerPage] = useState(5)

  /**
   * @param {int} newPage the newPage passed from the child component
   * it sets a new page
   */
  const handleChangePage = (newPage) => {
    setPage(newPage)
  }

  /**
   * @param {event} event the event object hold the property of input value that passed from the child component
   * it sets row per page by specific value and set the page to 0
   */
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  return (
    <div>
      <TableContainer component={Paper}>
        <Table aria-label="table">
          <HelixTableHead columns={columns} customHeadRowProps={customHeadRowProps}/>
          <HelixTableBody columns={columns} rows={rows} rowsPerPage={rowsPerPage} page={page} customCellRender={customCellRender} customBodyRowProps={customBodyRowProps}/>
          <HelixTableFooter rows={rows} colSpan={columns.length} rowsPerPage={rowsPerPage} page={page} handleChangePage={handleChangePage} handleChangeRowsPerPage={handleChangeRowsPerPage} />
        </Table>
      </TableContainer>
    </div>
  )
}

HelixTable.propTypes = {
  rows: PropTypes.instanceOf(Array).isRequired,
  columns: PropTypes.instanceOf(Array).isRequired,
  customCellRender: PropTypes.func.isRequired,
  customHeadRowProps: PropTypes.func.isRequired,
  customBodyRowProps: PropTypes.func.isRequired,
}

export default HelixTable
