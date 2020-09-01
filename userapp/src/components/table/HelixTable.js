import React from "react"
import { withStyles, Paper, TableContainer, Table } from "@material-ui/core"
import PropTypes from "prop-types"
import UserTableHead from "./HelixTableHead"
import UserTableBody from "./HelixTableBody"

const tableStyles = {
  table: {
    width: '100%',
    display: 'table',
    borderTopRightRadius: '4px',
    borderTopLeftRadius: '4px',
    borderCollapse: 'separate',
    boxSizing: 'border-box',
    borderSpacing: '2px',
    borderColor: 'grey',
    '& tr': {
      border: 'none',
      backgroundColor: 'white',
      '&:nth-child(even)': {
        backgroundColor: '#f2f2f2',
      },
      '&:hover': {
        backgroundColor: '#add8e6',
      },
      '&:last-child': {
        borderBottomRightRadius: '4px',
        borderBottomLeftRadius: '4px',
      }
    },
    '& th': {
      backgroundColor: '#2e353d',
      color: 'white',
      margin: '0',
      borderBottom: 'solid 1px #e0e4e8',
      padding: '8px',
    },
    '& td': {
      margin: '0',
      borderBottom: 'solid 1px #e0e4e8',
      padding: '8px',
    },
    '&:last-children': {
      borderBottom: 'none',
    },
  },
}

/**
 * @param {array} columns Array of object where each object contains which filter to use, header label and accessor for getting specific key from data object
 * @param {array} rows API result from getting a list of items such as report templates, clients and etc.(depending on where it is used)
 * @param {array} classes Object that contains custom inline-style solution to write component styles
 * @param {func} customRowRender func represent custom func that return jsx of table row of table cell values
 * @returns {JSX} renders a custom edit entity dashboard
 */
const HelixTable = ({
  columns,
  rows,
  classes,
  customRowRender,
}) => {
  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="table">
          <UserTableHead columns={columns} />
          <UserTableBody rows={rows} customRowRender={customRowRender}/>
        </Table>
      </TableContainer>
    </div>
  )
}

HelixTable.propTypes = {
  rows: PropTypes.instanceOf(Array).isRequired,
  columns: PropTypes.instanceOf(Array).isRequired,
  classes: PropTypes.object.isRequired,
  customRowRender: PropTypes.func.isRequired,
}

export default withStyles(tableStyles)(HelixTable)
