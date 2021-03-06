import React from "react"
import { TableBody, TableRow } from "@material-ui/core"
import PropTypes from "prop-types"

/**
 * @param {array} columns Array of object where each object contains which filter to use, header label and accessor for getting specific key from data object
 * @param {array} rows API result from getting a list of items such as report templates, clients and etc.(depending on where it is used)
 * @param {int} rowsPerPage the rowsPerPage is a number of row per page
 * @param {int} page page is current page currently at
 * @param {func} customCellRender func represent custom func that return jsx of table row of table cell values
 * @param {func} customBodyRowKeyProp func represent custom func that return key props for the table row (required)
 * @param {string} order string represents ascending or descending order
 * @param {string} orderBy string represents which column should it order by
 * @param {func} getComparator func that set up a rule to compare the orderby column by acsending or descending order
 * @param {func} stableSort func that uses getComparator to sort it in order
 * @param {object} searchFilter object that contains a function for filtering search query
 * @param {bool} toggleSearch bool represents true or false if table should have a search function
 * @returns {JSX} renders a custom table body for table
 */
const HelixTableBody = ({ columns, rows, rowsPerPage, page, customCellRender, customBodyRowKeyProp, order, orderBy, getComparator, stableSort, searchFilter, toggleSearch }) => {
  
  //If rowsPerPage is always greater than 0, then we sort the rows by indicating column
  //and display rowsPerPage by each page
  //Else display all the sorted rows order by indicating columns
  const sortedRows = (rowsPerPage > 0 
    ? stableSort(searchFilter.search(rows, columns), getComparator(order, orderBy))
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    : stableSort(searchFilter.search(rows, columns), getComparator(order, orderBy))
  )

  const dataRows = toggleSearch ? sortedRows : rows

  return (
      <TableBody>
        {dataRows.map((row, rowIndex) => {
            return (
              <TableRow key={customBodyRowKeyProp(row)}>
                {columns.map((column, columnIndex) => {
                  return (
                    customCellRender(row, column, rowIndex, columnIndex)
                  )
                })}
              </TableRow>
            )
          })
        }
      </TableBody>
  )
}

HelixTableBody.propTypes = {
  columns: PropTypes.instanceOf(Array).isRequired,
  rows: PropTypes.instanceOf(Array).isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  customCellRender: PropTypes.func.isRequired,
  customBodyRowKeyProp: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  getComparator: PropTypes.func.isRequired,
  stableSort: PropTypes.func.isRequired,
  searchFilter: PropTypes.shape({ search: PropTypes.func.isRequired }).isRequired,
  toggleSearch: PropTypes.bool.isRequired,
}

HelixTableBody.defaultProps = {
  rowsPerPage: 0,
  page: 0,
  order: '',
  orderBy: '',
  toggleSearch: false,
}

export default HelixTableBody
