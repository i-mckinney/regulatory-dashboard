import React from "react"
import { TableHead, TableRow, TableCell } from "@material-ui/core"
import PropTypes from "prop-types"

/**
 * @param {array} columns Array of object where each object contains which filter to use, header label and accessor for getting specific key from data object
 * @returns {JSX} renders a custom table head for table
 */
const HelixTableHead = ({ columns, customHeadRowProps }) => {
  return (
    <TableHead>
      <TableRow>
        {columns.map((column) => (
            <TableCell key={customHeadRowProps(column)}>
              {column.Label}
            </TableCell>
          ))}
      </TableRow>
    </TableHead>
  )
}

HelixTableHead.propTypes = {
  columns: PropTypes.instanceOf(Array).isRequired,
  customHeadRowProps: PropTypes.func.isRequired,
}

export default HelixTableHead
