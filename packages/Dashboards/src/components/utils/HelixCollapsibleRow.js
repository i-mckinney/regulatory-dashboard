import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles, Box, Collapse, Table, TableHead, TableRow, TableBody, TableCell, IconButton } from '@material-ui/core'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import GenericSummaryTable from '../report/GenericSummaryTable'

const HelixCollapsibleRowStyles = makeStyles({
    root: {
      '& > *': {
        borderBottom: 'unset',
      },
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
    summaryReceiptRoot: {
      width: "100%",
    },
    summaryReceiptContainer: {
        maxHeight: 440,
    },
    rowInnerTable: {
      backgroundColor: 'white!important',
    },
    innerTable: {
      width: '90%!important',
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
    },
    innerContainer: {
      '& table': {
        '& th': {
          backgroundColor: 'white!important',
          color: 'black!important',
          margin: '0',
          borderBottom: 'solid 1px #e0e4e8',
          padding: '8px',
        },
        '& tr': {
          border: 'none',
          backgroundColor: 'white!important',
        },
      }
    }
})

/**
 * @param {*} props contains state variable
 */
function HelixCollapsibleRow(props) {
  /**
   * row (object) the row is an object of data
   * rowIndex (int) the rowIndex represents index of the row
   * columns (array) contains list of column objects
   * innerTableHeadColumns (array) contains list of string or list of objects of data
   * innerTableBodyRows (array) contains list of string or list of objects of data
   * customCellRender (func) returns a jsx of HelixTableCell
   * isSummaryTableAllow (bool) represents whether this collapsible row will contains additional summary table
   */
  const { row, rowIndex, columns, innerTableHeadColumns, innerTableBodyRows, customCellRender, isSummaryTableAllow } = props;
  
  // open is boolean variable that keep track of whether to show additional data regarding that row.
  const [open, setOpen] = useState(false)
  
  // Creates an object for styling. Any className that matches key in the HelixCollapsibleRowStyles object will have a corresponding styling
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
              <Box margin={1} className={helixCollapsibleRowclasses.innerContainer}>
                {isSummaryTableAllow ?
                <GenericSummaryTable rows={innerTableBodyRows} columns={innerTableHeadColumns} classes={helixCollapsibleRowclasses} />
                :
                <Table className={helixCollapsibleRowclasses.innerTable}>
                  <TableHead className={helixCollapsibleRowclasses.innerTableHead}>
                    <TableRow>
                      {innerTableHeadColumns.map((column, columnIndex) => {
                        return <TableCell key={columnIndex}><b>{column}</b></TableCell>
                      })}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      {innerTableBodyRows.map((row, rowIndex) => {
                        return <TableCell key={rowIndex}>{row}</TableCell>
                      })}
                    </TableRow>
                  </TableBody>
                </Table>
                }
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
  isSummaryTableAllow: PropTypes.bool.isRequired,
}

HelixCollapsibleRow.defaultProps = {
  isSummaryTableAllow: false
}

export default HelixCollapsibleRow