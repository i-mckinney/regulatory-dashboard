import React from 'react'
import { TablePagination } from '@material-ui/core'
import HelixTablePaginationActions from './HelixTablePaginationActions'

const HelixTablePagination = ({ rows, colSpan, rowsPerPage, page, handleChangePage, handleChangeRowsPerPage }) => {
  console.log(rows)
  return (
    <TablePagination
      rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
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

export default HelixTablePagination