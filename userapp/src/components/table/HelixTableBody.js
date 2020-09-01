import React from "react"
import { TableBody, TableRow, TableCell } from "@material-ui/core"
import PropTypes from "prop-types"

/**
 * @param {array} rows An array of rows, containing array of cell objects.
 * @returns {JSX} renders a custom table body for table
 */
const HelixTableBody = ({ rows }) => {
  return (
    <TableBody>
    {rows.map((row) => (
      <TableRow key={row.FirstName}>
        <TableCell scope="row">
          {row.FirstName}
        </TableCell>
        <TableCell>{row.LastName}</TableCell>
        <TableCell >{row.DateOfBirth}</TableCell>
        <TableCell >{row.Phone}</TableCell>
      </TableRow>
    ))}
  </TableBody>
  )
}

HelixTableBody.propTypes = {
  rows: PropTypes.instanceOf(Array).isRequired,
}

export default HelixTableBody
