import React from "react"
import PropTypes from "prop-types"

/**
 * @param {func(?props)}  getTableBodyProps Array<HeaderGroup> An array of normalized header groups,
 * each containing a flattened array of final column objects for that row.
 * @param {array} rows An array of rows, containing array of cell objects.
 * @param {func(row)} prepareRow Required This function is responsible for lazily preparing a row for rendering.
 * Any row that you intend to render in your table needs to be passed to this function before every render.
 * @returns {JSX} renders a custom table body for table
 */
const EntityTableBody = ({ getTableBodyProps, rows, prepareRow }) => {
  return (
    <tbody {...getTableBodyProps()}>
      {rows.map((row) => {
        prepareRow(row)
        return (
          <tr {...row.getRowProps()}>
            {row.cells.map((cell) => {
              return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
            })}
          </tr>
        )
      })}
    </tbody>
  )
}

EntityTableBody.propTypes = {
  getTableBodyProps: PropTypes.func.isRequired,
  rows: PropTypes.instanceOf(Array).isRequired,
  prepareRow: PropTypes.func.isRequired,
}

export default EntityTableBody
