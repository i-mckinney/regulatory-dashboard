import React from "react"
import { TableBody, TableRow } from "@material-ui/core"
import PropTypes from "prop-types"

/**
 * @param {array} columns Array of object where each object contains which filter to use, header label and accessor for getting specific key from data object
 * @param {array} rows API result from getting a list of items such as report templates, clients and etc.(depending on where it is used)
 * @param {func} customCellRender func represent custom func that return jsx of table row of table cell values
 * @param {func} customBodyRowProps func represent custom func that return key props for the table row (required)
 * @returns {JSX} renders a custom table body for table
 */
const HelixTableBody = ({ columns, rows, rowsPerPage, page, customCellRender, customBodyRowProps }) => {
  return (
      <TableBody>
        {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => {
            return (
              <TableRow key={customBodyRowProps(row)}>
                {columns.map((column) => {
                  return (
                    customCellRender(row, column)
                  )
                })}
              </TableRow>
            )
          })}
      </TableBody>
  )
}

HelixTableBody.propTypes = {
  columns: PropTypes.instanceOf(Array).isRequired,
  rows: PropTypes.instanceOf(Array).isRequired,
  customCellRender: PropTypes.func.isRequired,
  customBodyRowProps: PropTypes.func.isRequired,
}

export default HelixTableBody
