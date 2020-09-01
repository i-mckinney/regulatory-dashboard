import React from "react"
import { TableBody } from "@material-ui/core"
import PropTypes from "prop-types"

/**
 * @param {array} rows An array of rows, containing array of cell objects
 * @param {func} customRowRender func represent custom func that return jsx of table row of table cell values
 * @returns {JSX} renders a custom table body for table
 */
const HelixTableBody = ({ rows, customRowRender }) => {
  return (
    <TableBody>
      {rows.map((row) => (
        customRowRender(row)
      ))}
  </TableBody>
  )
}

HelixTableBody.propTypes = {
  rows: PropTypes.instanceOf(Array).isRequired,
  customRowRender: PropTypes.func.isRequired,
}

export default HelixTableBody
