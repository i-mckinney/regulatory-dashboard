import React from 'react'
import PropTypes from 'prop-types'
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
            '&:nth-child(even)': {
              backgroundColor: '#d3e9ff',
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
    },
  }))

function createData(name, calories, fat, carbs, protein, price) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    history: [
      { date: '2020-01-05', customerId: '11091700', amount: 3 },
      { date: '2020-01-02', customerId: 'Anonymous', amount: 1 },
    ],
  };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
  createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
  createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
  createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
];

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
            {props.rows.map((row) => (
                <HelixCollapsibleRow key={row._id} row={row} />
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    );
}

export default HelixExpandableTable