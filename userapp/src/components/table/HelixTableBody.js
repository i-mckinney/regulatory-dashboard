import React from "react"
import { TableBody, TableRow } from "@material-ui/core"
import PropTypes from "prop-types"

/**
 * @param {array} columns Array of object where each object contains which filter to use, header label and accessor for getting specific key from data object
 * @param {array} rows API result from getting a list of items such as report templates, clients and etc.(depending on where it is used)
 * @param {int} rowsPerPage the rowsPerPage is a number of row per page
 * @param {int} page page is current page currently at
 * @param {func} customCellRender func represent custom func that return jsx of table row of table cell values
 * @param {func} customBodyRowProps func represent custom func that return key props for the table row (required)
 * @param {string} order string represents ascending or descending order
 * @param {string} orderBy string represents which column should it order by
 * @param {func} getComparator func that set up a rule to compare the orderby column by acsending or descending order
 * @param {func} stableSort func that uses getComparator to sort it in order
 * @returns {JSX} renders a custom table body for table
 */
const HelixTableBody = ({ columns, rows, rowsPerPage, page, customCellRender, customBodyRowProps, order, orderBy, getComparator, stableSort }) => {
  
  //If rowsPerPage is always greater than 0, then we sort the rows by indicating column
  //and display rowsPerPage by each page
  //Else display all the sorted rows order by indicating columns
  const sortedRows = (rowsPerPage > 0 
    ? stableSort(rows, getComparator(order, orderBy))
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    : stableSort(rows, getComparator(order, orderBy))
  )

  return (
      <TableBody>
        {sortedRows.map((row, rowIndex) => {
            return (
              <TableRow key={customBodyRowProps(row)}>
                {columns.map((column) => {
                  return (
                    customCellRender(rowIndex, row, column)
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
  customCellRender: PropTypes.func.isRequired,
  customBodyRowProps: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  getComparator: PropTypes.func.isRequired,
  stableSort: PropTypes.func.isRequired,
}

export default HelixTableBody
