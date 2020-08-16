import React from "react"
import {
  useTable,
  useFilters,
  useGlobalFilter,
  usePagination,
} from "react-table"
import PropTypes from "prop-types"
import GlobalFilter from "./GlobalFitler"
import DefaultColumnFilter from "./DefaultColumnFilter"
import TablePagination from "./TablePagination"

/**
 * @param {array}  columns array of object where each object contains
 * which filter to use, header label and accessor for getting specific key from data object
 * @param {array} data API result from getting a list of items such as reporttemplates, clients and etc.(depending on where it is used)
 * @param {func} customRowRender function that is used to redner rows for the dashboard
 * @param {boolean} isReportTemplate true -> then renders column search fields for reporttemplates, null otherwise
 * @param {string} destinationString string to represent where dashboard is being used
 * @returns {JSX} renders a custom admin dashboard
 */

function AdminDashboard({ columns, data, customRowRender, destinationString }) {
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
   * 6) canPreviousPage: Bool If there are pages and the current pageIndex is greater than 0, this will be true
   * 7) canNextPage: If there are pages and the current pageIndex is less than pageCount, this will be true
   * 8) pageOptions: Array<Int> An array of zero-based index integers corresponding to available pages in the table.
   * This can be useful for generating things like select interfaces for the user to select a page from a list,
   * instead of manually paginating to the desired page.
   * 9) pageCount: Integer
   * 10) pageIndex: Integer
   * 11) pageSize: Integer
   * - visibleColumns: Array<Column> A flat array of all visible column objects derived from allColumns.
   * - setGlobalFilter function used to update the global filter value. {func}
   * - preGlobalFilteredRows The array of rows used right before filtering. {array}
   */
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    globalFilter,
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter,
    state: { pageIndex, pageSize },
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
  const createPaginationJsx = () => {
    return (
      <TablePagination
        canPreviousPage={canPreviousPage}
        canNextPage={canNextPage}
        pageOptions={pageOptions}
        pageCount={pageCount}
        gotoPage={gotoPage}
        nextPage={nextPage}
        previousPage={previousPage}
        setPageSize={setPageSize}
        pageIndex={pageIndex}
        pageSize={pageSize}
      />
    )
  }
  return (
    <>
      {/** Dashboard Table */}
      <table {...getTableProps()}>
        <thead>
          <tr>
            <th colSpan={visibleColumns.length} style={{ textAlign: "left" }}>
              <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={globalFilter}
                setGlobalFilter={setGlobalFilter}
                destinationString={destinationString}
              />
            </th>
          </tr>
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
            const reportSoid = row.original.Soid
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => customRowRender(cell, reportSoid))}
              </tr>
            )
          })}
        </tbody>
      </table>
      {/** Pagination component */}
      {createPaginationJsx()}
    </>
  )
}

AdminDashboard.propTypes = {
  columns: PropTypes.instanceOf(Array).isRequired,
  data: PropTypes.instanceOf(Array).isRequired,
  customRowRender: PropTypes.func.isRequired,
  destinationString: PropTypes.string.isRequired,
}

export default AdminDashboard
