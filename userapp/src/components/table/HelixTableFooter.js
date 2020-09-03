import React from 'react'
import { TableFooter, TableRow } from '@material-ui/core'
import HelixTablePagination from './HelixTablePagination'

const HelixTableFooter = ({ rows, colSpan, rowsPerPage, page, handleChangePage, handleChangeRowsPerPage}) => {
    return (
        <TableFooter>
            <TableRow>
                <HelixTablePagination
                    rows={rows}
                    colSpan={colSpan}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    handleChangePage={handleChangePage}
                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </TableRow>
      </TableFooter>
    )
}

export default HelixTableFooter