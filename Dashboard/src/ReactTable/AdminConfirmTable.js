import React from "react"
import {
  useTable,
  useFilters,
  useGlobalFilter,
  usePagination,
} from "react-table"
import PropTypes from "prop-types"
import DefaultColumnFilter from "./DefaultColumnFilter"

/**
 * @param {array}  columns array of object where each object contains
 * which filter to use, header label and accessor for getting specific key from data object
 * @param {array} data API result from getting a list of items such as reporttemplates, clients and etc.(depending on where it is used)
 * @param {func} customRowRender function that is used to redner rows for the dashboard
 * @returns {JSX} renders a custom admin dashboard
 */

function AdminConfirmTable({ columns, data, customRowRender }) {
  const defaultColumn = React.useMemo(
    () => ({
      // if column did not select any filters, use default filter
      Filter: DefaultColumnFilter,
    }),
    []
  )

  /**
   * 1) getTableProps: Function(?props) Required This function is used to resolve any props needed for your table wrapper.
   * 2) getTableBodyProps: Function(?props) Required This function is used to resolve any props needed for your table wrapper.
   * 3) headerGroups: Array<HeaderGroup> An array of normalized header groups, each containing a flattened array of final column objects for that row.
   * 4) prepareRow: Required This function is responsible for lazily preparing a row for rendering.
   * Any row that you intend to render in your table needs to be passed to this function before every render.
   * 5) page: Array<row> An array of rows for the current page, determined by the current pageIndex value.
   */
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
  } = useTable(
    {
      columns,
      data,
      defaultColumn, // Be sure to pass the defaultColumn option
      initialState: { pageIndex: 0 }, // Pass our initial table state
    },
    useFilters,
    useGlobalFilter,
    usePagination
  )

  return (
    <>
      {/** Confirmation Table */}
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell, index) => customRowRender(cell, index))}
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}

AdminConfirmTable.propTypes = {
  columns: PropTypes.instanceOf(Array).isRequired,
  data: PropTypes.instanceOf(Array).isRequired,
  customRowRender: PropTypes.func.isRequired,
}

export default AdminConfirmTable
