import React from 'react'
import { TableFooter, TableRow } from '@material-ui/core'
import HelixTablePagination from './HelixTablePagination'

/**
 * @param {array} rows API result from getting a list of items such as report templates, clients and etc.(depending on where it is used)
 * @param {int} colSpan the colSpan is span on how many column spaces
 * @param {int} rowsPerPage the rowsPerPage is a number of row per page
 * @param {int} page page is current page currently at
 * @param {func} handleChangePage this function will be pass down to (child component) HelixTablePagination to handle page changes
 * @param {func} handleChangeRowsPerPage this function will be pass down to (child component) HelixTablePagination to handle how many rows per page changes 
 * @returns {JSX} renders a custom table footer for table
 */
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