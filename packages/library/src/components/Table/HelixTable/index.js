import React, { useState } from "react"
import { Paper, TableContainer, Table } from "@material-ui/core"
import PropTypes from "prop-types"
import HelixTableHead from "../HelixTableHead/index"
import HelixTableBody from "../HelixTableBody/index"
import HelixTableFooter from "../HelixTableFooter/index"
import HelixToolBarSearch from "../HelixToolBarSearch/index"
import { getComparator, stableSort } from '../HelixTableSortFunc/index'

/**
 * 
 * ###Params
 * * _**columns**_ **\<array\>** Array of object where each object contains which filter to use, header label and accessor for getting specific key from data object
 * * _**rows**_ **\<array\>**  API result from getting a list of items such as report templates, clients and etc.(depending on where it is used)
 * * _**customCellRender**_ **\<func\>** customCellRender func represents custom func that return jsx of table row of table cell values
 * * _**customHeadRowProps**_ **\<func\>**  func represents custom func that return key props for table row in table head (required)
 * * _**customBodyRowProps**_ **\<func\>**  func represents custom func that return key props for the table row in table body (required)
 * * _**initialOrderBy**_ **\<string\>** string represents what the column in the table should order by initially
 * * _**displayCreateIcon**_ **\<func\>** func displays jsx object of create icon into toolbar
 * 
 * ###Returns 
 * * **\<JSX\>** renders a react custom table component
 */
const HelixTable = ({
  columns,
  rows,
  customCellRender,
  customHeadRowProps,
  customBodyRowProps,
  initialOrderBy,
  displayCreateIcon,
  }) => {
  // Page is needed for pagination to determine the process of what page it is at
  const [page, setPage] = useState(0)

  // rowsPerPage is needed for pagination to determine how many rows should be display per page
  const [rowsPerPage, setRowsPerPage] = useState(5)

  /**
   * @param {int} newPage the newPage passed from the child component
   * it sets a new page
   */
  const handleChangePage = (newPage) => {
    setPage(newPage)
  }

  /**
   * @param {event} event the event object hold the property of input value that passed from the child component
   * it sets row per page by specific value and set the page to 0
   */
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  // order is a conditional string for ascending or descending order
  const [order, setOrder] = useState('asc')

  // orderBy is a string to order by column in ascending or descending order
  const [orderBy, setOrderBy] = useState(initialOrderBy)

  /**
   * @param {string} property the property is a column header
   */
  const onSort = (property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  // searchFilter contains a func that store filter query search upon user input
  const [searchFilter, setSearchFilter] = useState({ search: (rows, columns) => { return rows }})
  
  /**
   * @param {object} event the event object contains user input
   * Pass the user query input to searchFilter and it store which object matches the query 
   */
  const onSearch = (event) => {
    const { value } = event.target
    setSearchFilter({ search: (rows, columns) => {
        if (value === '') return rows
        else 
          return rows.filter((row) => 
            (columns.filter((column) =>
              row[column.accessor]
              .toLowerCase()
              .includes(value.toLowerCase())
              )
            )
            .length > 0 
            ? true 
            : false
          )
      }
    })
  }
  
  return (
    <div>
      <HelixToolBarSearch onSearch={onSearch} displayCreateIcon={displayCreateIcon} />
      <TableContainer component={Paper}>
        <Table aria-label="table">
          <HelixTableHead order={order} orderBy={orderBy} onSort={onSort} columns={columns} customHeadRowProps={customHeadRowProps}/>
          <HelixTableBody searchFilter={searchFilter} order={order} orderBy={orderBy} getComparator={getComparator} stableSort={stableSort} columns={columns} rows={rows} rowsPerPage={rowsPerPage} page={page} customCellRender={customCellRender} customBodyRowProps={customBodyRowProps}/>
          <HelixTableFooter rows={rows} colSpan={columns.length} rowsPerPage={rowsPerPage} page={page} handleChangePage={handleChangePage} handleChangeRowsPerPage={handleChangeRowsPerPage} />
        </Table>
      </TableContainer>
    </div>
  )
}

HelixTable.propTypes = {
  columns: PropTypes.instanceOf(Array).isRequired,
  rows: PropTypes.instanceOf(Array).isRequired,
  customCellRender: PropTypes.func.isRequired,
  customHeadRowProps: PropTypes.func.isRequired,
  customBodyRowProps: PropTypes.func.isRequired,
  initialOrderBy: PropTypes.string.isRequired,
  displayCreateIcon: PropTypes.func.isRequired,
}

export default HelixTable
