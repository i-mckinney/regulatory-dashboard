import React from "react"
import { Paper, TableContainer, Table } from "@material-ui/core"
import PropTypes from "prop-types"
import HelixTableHead from "./HelixTableHead"
import HelixTableBody from "./HelixTableBody"
import HelixTableFooter from "./HelixTableFooter"

/**
 * @param {array} columns Array of object where each object contains which filter to use, header label and accessor for getting specific key from data object
 * @param {array} rows API result from getting a list of items such as report templates, clients and etc.(depending on where it is used)
 * @param {func} customCellRender func represent custom func that return jsx of table row of table cell values
 * @param {func} customRowProp func represent custom func that return key props for the table row (required)
 * @returns {JSX} renders a custom edit entity dashboard
 */
const HelixTable = ({
  columns,
  rows,
  customCellRender,
  customRowProps,
}) => {
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  return (
    <div>
      <TableContainer component={Paper}>
        <Table aria-label="table">
          <HelixTableHead columns={columns} />
          <HelixTableBody columns={columns} rows={rows} rowsPerPage={rowsPerPage} page={page} customCellRender={customCellRender} customRowProps={customRowProps}/>
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
  customRowProps: PropTypes.func.isRequired,
}

export default HelixTable
