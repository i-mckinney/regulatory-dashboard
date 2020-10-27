import React from 'react'
import { TablePagination } from '@material-ui/core'
import HelixTablePaginationActions from '../HelixTablePaginationActions/index'
import PropTypes from 'prop-types'

/**
 * @param {array} rows API result from getting a list of items such as report templates, clients and etc.(depending on where it is used)
 * @param {int} colSpan the colSpan is span on how many column spaces
 * @param {int} rowsPerPage the rowsPerPage is a number of row per page
 * @param {int} page page is current page currently at
 * @param {func} handleChangePage this function will be pass down to (child component) HelixTablePagination to handle page changes
 * @param {func} handleChangeRowsPerPage this function will be pass down to (child component) HelixTablePagination to handle how many rows per page changes 
 * @returns {JSX} renders a custom table pagination for table
 */
const HelixTablePagination = ({ rows, colSpan, rowsPerPage, page, handleChangePage, handleChangeRowsPerPage }) => {
  return (
    <TablePagination
      rowsPerPageOptions={[5, 10, 25, 50, { label: 'All', value: -1 }]}
      colSpan={colSpan}
      count={rows.length}
      rowsPerPage={rowsPerPage}
      page={page}
      SelectProps={{
        inputProps: { 'aria-label': 'rows per page' },
        native: true,
      }}
      onChangePage={handleChangePage}
      onChangeRowsPerPage={handleChangeRowsPerPage}
      ActionsComponent={HelixTablePaginationActions}
    />
  )
}

HelixTablePagination.propTypes = {
  rows: PropTypes.instanceOf(Array).isRequired,
  colSpan: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  handleChangePage: PropTypes.func.isRequired,
  handleChangeRowsPerPage: PropTypes.func.isRequired,
}

export default HelixTablePagination