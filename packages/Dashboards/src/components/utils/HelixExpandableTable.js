import React from 'react'
import { makeStyles } from '@material-ui/core'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import HelixCollapsibleRow from './HelixCollapsibleRow'

const helixExpandableTableStyles = makeStyles(() => ({
    helixExpandableTable: {
      '& table': {
          width: '100%',
          display: 'table',
          borderTopRightRadius: '4px',
          borderTopLeftRadius: '4px',
          boxSizing: 'border-box',
          borderSpacing: '2px',
          borderColor: 'grey',
          '& tr': {
            border: 'none',
            backgroundColor: 'white',
            // '&:nth-child(even)': {
            //   backgroundColor: '#d3e9ff',
            // },
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
    },
  }))

function HelixExpandableTable(props) {
    const helixExpandableTableClases = helixExpandableTableStyles()
    return (
      <TableContainer className={helixExpandableTableClases.helixExpandableTable}  component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell align="right">Loan Name</TableCell>
              <TableCell align="right">Loan Type</TableCell>
              <TableCell align="right">Loan Created</TableCell>
              <TableCell align="right">Loan Updated</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.rows.map((row) => {
              console.log(row)
              return <HelixCollapsibleRow key={row._id} row={row} />
            })}
          </TableBody>
        </Table>
      </TableContainer>
    );
}

export default HelixExpandableTable