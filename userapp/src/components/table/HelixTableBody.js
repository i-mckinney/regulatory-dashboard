import React from "react"
import { TableBody, TableRow } from "@material-ui/core"
import PropTypes from "prop-types"

/**
 * @param {array} rows An array of rows, containing array of cell objects.
 * @returns {JSX} renders a custom table body for table
 */
const HelixTableBody = ({ columns, rows, customRowRender }) => {
  return (
    <TableBody>
      {rows.map((row) => {
        return (
          <TableRow key={row.FirstName}>
            {columns.map((column) => {
              const columnID = column.ID
              return (
                  customRowRender(row, columnID)
              )
            })}
          </TableRow>
        )
      })}
  </TableBody>
  )
}

HelixTableBody.propTypes = {
  rows: PropTypes.instanceOf(Array).isRequired,
  customRowRender: PropTypes.func.isRequired,
}

export default HelixTableBody
