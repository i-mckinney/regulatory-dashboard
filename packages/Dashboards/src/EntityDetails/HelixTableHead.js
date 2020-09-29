import React from "react"
import { TableHead, TableRow, TableCell } from "@material-ui/core"
import PropTypes from "prop-types"

/**
 * @param {array} columns Array of object where each object contains which filter to use, header label and accessor for getting specific key from data object
 * @param {func} customHeadColumnKeyProp func represents custom function that return key props for table row in table head (required)
 * @returns {JSX} renders a custom table head for table
 */
const HelixTableHead = ({ columns, customHeadColumnKeyProp }) => {
  return (
    <TableHead>
      <TableRow>
        {columns.map((column) => (
            <TableCell 
            key={customHeadColumnKeyProp(column)}>
              {column.Header}
            </TableCell>
          ))}
      </TableRow>
    </TableHead>
  )
}

HelixTableHead.propTypes = {
  columns: PropTypes.instanceOf(Array).isRequired,
  customHeadColumnKeyProp: PropTypes.func.isRequired,
}

export default HelixTableHead
