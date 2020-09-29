import React from "react"
import { Paper, TableContainer, Table } from "@material-ui/core"
import PropTypes from "prop-types"
import HelixTableHead from "./HelixTableHead"
import HelixTableBody from "./HelixTableBody"


/**
 * @param {array} columns Array of object where each object contains which filter to use, header label and accessor for getting specific key from data object
 * @param {array} rows API result from getting a list of items such as report templates, clients and etc.(depending on where it is used)
 * @param {func} customCellRender func represents custom func that return jsx of table row of table cell values
 * @param {func} customHeadColumnKeyProp func represents custom func that return key props for table row in table head (required)
 * @param {func} customBodyRowKeyProp func represents custom func that return key props for the table row in table body (required)
 * @returns {JSX} renders a custom table
 */
const HelixTable = ({
  columns,
  rows,
  customCellRender,
  customHeadColumnKeyProp,
  customBodyRowKeyProp,
  }) => {
  
  return (
    <div>
      <TableContainer component={Paper}>
        <Table aria-label="table">
          <HelixTableHead columns={columns} customHeadColumnKeyProp={customHeadColumnKeyProp}/>
          <HelixTableBody columns={columns} rows={rows} customCellRender={customCellRender} customBodyRowKeyProp={customBodyRowKeyProp}/>
        </Table>
      </TableContainer>
    </div>
  )
}

HelixTable.propTypes = {
  columns: PropTypes.instanceOf(Array).isRequired,
  rows: PropTypes.instanceOf(Array).isRequired,
  customCellRender: PropTypes.func.isRequired,
  customHeadColumnKeyProp: PropTypes.func.isRequired,
  customBodyRowKeyProp: PropTypes.func.isRequired,
}

export default HelixTable
