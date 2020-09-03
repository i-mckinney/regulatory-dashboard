import React from "react"
import { Paper, TableContainer, Table } from "@material-ui/core"
import PropTypes from "prop-types"
import HelixTableHead from "./HelixTableHead"
import HelixTableBody from "./HelixTableBody"

/**
 * @param {array} columns Array of object where each object contains which filter to use, header label and accessor for getting specific key from data object
 * @param {array} rows API result from getting a list of items such as report templates, clients and etc.(depending on where it is used)
 * @param {func} customCellRender func represent custom func that return jsx of table row of table cell values
 * @returns {JSX} renders a custom edit entity dashboard
 */
const HelixTable = ({
  columns,
  rows,
  customCellRender,
}) => {
  return (
    <div>
      <TableContainer component={Paper}>
        <Table aria-label="table">
          <HelixTableHead columns={columns} />
          <HelixTableBody columns={columns} rows={rows} customCellRender={customCellRender}/>
        </Table>
      </TableContainer>
    </div>
  )
}

HelixTable.propTypes = {
  rows: PropTypes.instanceOf(Array).isRequired,
  columns: PropTypes.instanceOf(Array).isRequired,
  customCellRender: PropTypes.func.isRequired,
}

export default HelixTable
