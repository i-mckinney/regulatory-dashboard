import React, { useState } from "react"
import { Paper, TableContainer, Table } from "@material-ui/core"
import PropTypes from "prop-types"
import HelixTableHead from "./HelixTableHead"
import HelixTableBody from "./HelixTableBody"
import HelixTableFooter from "./HelixTableFooter"

/**
 * 
 * @param {object} self self object that contains column accessor 
 * @param {object} other other object that contains column accessor
 * @param {string} orderBy orderBy is a column accessor property
 * @return {int} object "self" will compare with object "other" by ascii value of the column header
 */
function descendingComparator(self, other, orderBy) {
  if (other[orderBy] < self[orderBy]) {
    return -1
  }
  if (other[orderBy] > self[orderBy]) {
    return 1
  }
  return 0;
}

/**
 * @param {string} order string represents ascending or descending order
 * @param {string} orderBy string represents a property of the column header 
 */
function getComparator(order, orderBy) {
  return order === 'desc'
      ? (self, other) => descendingComparator(self, other, orderBy)
      : (self, other) => -descendingComparator(self, other, orderBy)
}

/**
 * @param {array} array the array that will be sorted
 * @param {func} comparator func that has the rules of how to sort array by either ascending or descending 
 * @return {array} return a new array of sorted items 
 */
function stableSort(array, comparator) {
  const stabilizedThis = array.map((elem, index) => [elem, index])
  stabilizedThis.sort((self, other) => {
    const order = comparator(self[0], other[0]);
    if (order !== 0) return order;
    return self[1] - other[1];
  })
  return stabilizedThis.map((elem) => elem[0])
}

/**
 * @param {array} columns Array of object where each object contains which filter to use, header label and accessor for getting specific key from data object
 * @param {array} rows API result from getting a list of items such as report templates, clients and etc.(depending on where it is used)
 * @param {func} customCellRender func represents custom func that return jsx of table row of table cell values
 * @param {func} customHeadRowProps func represents custom func that return key props for table row in table head (required)
 * @param {func} customBodyRowProps func represents custom func that return key props for the table row in table body (required)
 * @param {string} initialOrderBy string represents what the column in the table should order by initially
 * @returns {JSX} renders a custom table
 */
const HelixTable = ({
  columns,
  rows,
  customCellRender,
  customHeadRowProps,
  customBodyRowProps,
  initialOrderBy,
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

  // order is a conditional string for ascending or descending order
  const [order, setOrder] = useState('asc')

  // orderBy is a string to order by column in ascending or descending order
  const [orderBy, setOrderBy] = useState(initialOrderBy)

  /**
   * @param {string} property the property is a column header
   */
  const onSort = (property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  return (
    <div>
      <TableContainer component={Paper}>
        <Table aria-label="table">
          <HelixTableHead order={order} orderBy={orderBy} onSort={onSort} columns={columns} customHeadRowProps={customHeadRowProps}/>
          <HelixTableBody order={order} orderBy={orderBy} getComparator={getComparator} stableSort={stableSort} columns={columns} rows={rows} rowsPerPage={rowsPerPage} page={page} customCellRender={customCellRender} customBodyRowProps={customBodyRowProps}/>
          <HelixTableFooter rows={rows} colSpan={columns.length} rowsPerPage={rowsPerPage} page={page} handleChangePage={handleChangePage} handleChangeRowsPerPage={handleChangeRowsPerPage} />
        </Table>
      </TableContainer>
    </div>
  )
}

HelixTable.propTypes = {
  columns: PropTypes.instanceOf(Array).isRequired,
  rows: PropTypes.instanceOf(Array).isRequired,
  customCellRender: PropTypes.func.isRequired,
  customHeadRowProps: PropTypes.func.isRequired,
  customBodyRowProps: PropTypes.func.isRequired,
  initialOrderBy: PropTypes.string.isRequired,
}

export default HelixTable
