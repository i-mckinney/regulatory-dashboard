import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles, Box, Collapse, Table, TableHead, TableRow, TableBody, TableCell, IconButton } from '@material-ui/core'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import SettingsIcon from '@material-ui/icons/Settings'
import AssessmentIcon from '@material-ui/icons/Assessment'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'

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
});

function HelixCollapsibleRow(props) {
    const { row, rowIndex, columns, customCellRender } = props;
    const [open, setOpen] = useState(false);
    const helixCollapsibleRowclasses = HelixCollapsibleRowStyles();

    // const displayActions = () => (
    //     <span className={helixCollapsibleRowclasses.actionsIconStyle}>
    //         <IconButton className={helixCollapsibleRowclasses.discrepancyButton} aria-label="discrepancy" size="small" edge="start" onClick={() => (props.history.push({ pathname: `/loan/${row._id}/discrepancy-report`, state: row }))}>
    //           <AssessmentIcon />
    //         </IconButton>
    //         <IconButton aria-label="edit" size="small" edge="start" onClick={() => (props.history.push({ pathname: `/loan/edit/${row._id}`, state: row }))} color="default">
    //           <EditIcon />
    //         </IconButton>
    //         <IconButton aria-label="delete" size="small" edge="start" onClick={() => (props.history.push({ pathname: `/loan/delete/${row._id}`, state: row }))} color="secondary">
    //           <DeleteIcon />
    //         </IconButton>
    //         <IconButton aria-label="config" size="small" edge="start" onClick={() => (props.history.push({ pathname: `/loan/configuration/${row._id}`, state: row }))} color="default">
    //           <SettingsIcon />
    //         </IconButton>
    //     </span>)
  
    return (
      <>
        <TableRow className={helixCollapsibleRowclasses.root}>
          <TableCell>
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          {columns.map((column, columnIndex) => {
            return (
              customCellRender(row, column, rowIndex, columnIndex)
            )
          })}
          {/* <TableCell>{row.loanName}</TableCell>
          <TableCell>{row.loanType}</TableCell>
          <TableCell>{row.commitmentAmount}</TableCell>
          <TableCell>{row.maturityDate}</TableCell>
          <TableCell>{row.borrowerName}</TableCell>
          <TableCell>{displayActions()}</TableCell> */}
        </TableRow>
        <TableRow className={helixCollapsibleRowclasses.rowInnerTable}>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={columns.length+1}>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <Box margin={1}>
                  <Table className={helixCollapsibleRowclasses.innerTable} size="small" aria-label="purchases">
                    <TableHead className={helixCollapsibleRowclasses.innerTableHead}>
                      <TableRow>
                          <TableCell>Borrower ID</TableCell>
                          <TableCell>Loan Created</TableCell>
                          <TableCell>Loan Updated</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>{row.borrowerID}</TableCell>
                        <TableCell>{row.createdAt}</TableCell>
                        <TableCell>{row.updatedAt}</TableCell>
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
}

export default HelixCollapsibleRow