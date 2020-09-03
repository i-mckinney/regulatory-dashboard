import React from "react"
import { TableBody, TableRow } from "@material-ui/core"
import PropTypes from "prop-types"

/**
 * @param {array} rows An array of rows, containing array of cell objects.
 * @returns {JSX} renders a custom table body for table
 */
const HelixTableBody = ({ columns, rows, customCellRender }) => {
  return (
    <TableBody>
      {rows.map((row) => {
        return (
          <TableRow key={row.ID}>
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
}

export default HelixTableBody
