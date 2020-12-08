import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles, Box, Collapse, Table, TableHead, TableRow, TableBody, TableCell, IconButton } from '@material-ui/core'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'

const HelixCollapsibleRowStyles = makeStyles({
    root: {
      // '& > *': {
      //   borderBottom: 'unset',
      // },
    },
    actionsIconStyle: {
        '& button': {
            marginRight: '1rem',
            cursor: 'pointer',
        },
    },
    discrepancyButton: {
        color: 'green'
    },
    rowInnerTable: {
      backgroundColor: 'white!important',
    },
    innerTable: {
      width: '65%!important',
      margin: 'auto',
      '& tr': {
        border: 'none',
        backgroundColor: 'white!important',
      },
    },
    innerTableHead: {
      '& th': {
        backgroundColor: 'white!important',
        color: 'black!important',
        margin: '0',
        borderBottom: 'solid 1px #e0e4e8',
        padding: '8px',
      },
    }
})

function HelixCollapsibleRow(props) {
    const { row, rowIndex, columns, innerTableHeadColumns, innerTableBodyRows, customCellRender } = props;
    const [open, setOpen] = useState(false)
    const helixCollapsibleRowclasses = HelixCollapsibleRowStyles()
  
    return (
      <>
        <TableRow className={helixCollapsibleRowclasses.root}>
          <TableCell style={{ width: '5%' }}>
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          {columns.map((column, columnIndex) => {
            return (
              customCellRender(row, column, rowIndex, columnIndex)
            )
          })}
        </TableRow>
        <TableRow className={helixCollapsibleRowclasses.rowInnerTable}>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={columns.length+1}>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <Box margin={1}>
                  <Table className={helixCollapsibleRowclasses.innerTable} size="small" aria-label="purchases">
                    <TableHead className={helixCollapsibleRowclasses.innerTableHead}>
                      <TableRow>
                        {innerTableHeadColumns.map((column) => {
                          return <TableCell><b>{column}</b></TableCell>
                        })}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        {innerTableBodyRows.map((row, rowIndex) => {
                          if (rowIndex === 0) {
                            return <TableCell><b>{row}</b></TableCell>
                          } else {
                            return <TableCell>{row}</TableCell>
                          }
                        })}
                      </TableRow>
                    </TableBody>
                  </Table>
                </Box>
              </Collapse>
            </TableCell>
          </TableRow>
      </>
    );
  }
  
HelixCollapsibleRow.propTypes = {
  row: PropTypes.instanceOf(Object).isRequired,
  rowIndex: PropTypes.number.isRequired, 
  columns: PropTypes.instanceOf(Array).isRequired, 
  innerTableHeadColumns: PropTypes.instanceOf(Array).isRequired, 
  innerTableBodyRows: PropTypes.instanceOf(Array).isRequired, 
  customCellRender: PropTypes.func.isRequired,
}

export default HelixCollapsibleRow