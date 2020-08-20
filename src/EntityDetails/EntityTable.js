import React from "react"
import { useTable } from "react-table"
import PropTypes from "prop-types"
import EntityTableHead from "./EntityTableHead"
import EntityTableBody from "./EntityTableBody"

/**
 * @param {array} columns Array of object where each object contains which filter to use, header label and accessor for getting specific key from data object
 * @param {array} data API result from getting a list of items such as report templates, clients and etc.(depending on where it is used)
 * @param {func} saveData func pass down to child component to add data and send it back to the parent component
 * @param {func} removeData func pass down to child component to remove data and send it back to the parent component
 * @param {string} SystemOfRecord API result property
 * @returns {JSX} renders a custom edit entity dashboard
 */
const EntityTable = ({
  columns,
  data,
  saveData,
  removeData,
  SystemOfRecord,
}) => {
  /**
   * 1) getTableProps: Function(?props) Required This function is used to resolve any props needed for your table wrapper.
   * 2) getTableBodyProps: Function(?props) Required This function is used to resolve any props needed for your table wrapper.
   * 3) headerGroups: Array<HeaderGroup> An array of normalized header groups, each containing a flattened array of final column objects for that row.
   * 4) rows: Array<Rows> A object contains array of row, determined by the column header)
   * 5) prepareRow: Required This function is responsible for lazily preparing a row for rendering.
   * Any row that you intend to render in your table needs to be passed to this function before every render.
   */
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
    saveData,
    removeData,
    SystemOfRecord,
  })
  return (
    <div>
      <table {...getTableProps()}>
        <EntityTableHead headerGroups={headerGroups} />
        <EntityTableBody
          getTableBodyProps={getTableBodyProps}
          rows={rows}
          prepareRow={prepareRow}
        />
      </table>
    </div>
  )
}

EntityTable.propTypes = {
  data: PropTypes.instanceOf(Array).isRequired,
  columns: PropTypes.instanceOf(Array).isRequired,
  saveData: PropTypes.func.isRequired,
  removeData: PropTypes.func.isRequired,
  SystemOfRecord: PropTypes.string.isRequired,
}

export default EntityTable
