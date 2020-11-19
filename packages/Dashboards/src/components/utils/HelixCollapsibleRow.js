import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles,Typography, Box, Collapse, Table, TableHead, TableRow, TableBody, TableCell, IconButton } from '@material-ui/core'
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
});

function HelixCollapsibleRow(props) {
    const { row } = props;
    const [open, setOpen] = useState(false);
    const helixCollapsibleRowclasses = HelixCollapsibleRowStyles();

    const displayActions = () => (
        <span className={helixCollapsibleRowclasses.actionsIconStyle}>
            <IconButton className={helixCollapsibleRowclasses.discrepancyButton} aria-label="discrepancy" size="small" edge="start" onClick={() => (props.history.push({ pathname: `/loan/${row._id}/discrepancy-report`, state: row }))}>
              <AssessmentIcon />
            </IconButton>
            <IconButton aria-label="edit" size="small" edge="start" onClick={() => (props.history.push({ pathname: `/loan/edit/${row._id}`, state: row }))} color="default">
              <EditIcon />
            </IconButton>
            <IconButton aria-label="delete" size="small" edge="start" onClick={() => (props.history.push({ pathname: `/loan/delete/${row._id}`, state: row }))} color="secondary">
              <DeleteIcon />
            </IconButton>
            <IconButton aria-label="config" size="small" edge="start" onClick={() => (props.history.push({ pathname: `/loan/configuration/${row._id}`, state: row }))} color="default">
              <SettingsIcon />
            </IconButton>
        </span>)
  
    return (
      <React.Fragment>
        <TableRow className={helixCollapsibleRowclasses.root}>
          <TableCell>
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell scope="row" align="right">
            {row.loanName}
          </TableCell>
          <TableCell align="right">{row.loanType}</TableCell>
          <TableCell align="right">{row.createdAt}</TableCell>
          <TableCell align="right">{row.updatedAt}</TableCell>
          <TableCell align="right">{displayActions()}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box margin={1}>
                <Typography variant="h6" gutterBottom component="div">
                  Loan Information
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Maturity Date</TableCell>
                      <TableCell>Commitment Amount</TableCell>
                      <TableCell align="right">Borrower ID</TableCell>
                      <TableCell align="right">Borrower Name</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                        <TableCell scope="row">
                          {row.maturityDate}
                        </TableCell>
                        <TableCell>{row.commitmentAmount}</TableCell>
                        <TableCell align="right">{row.borrowerID}</TableCell>
                        <TableCell align="right">
                          {row.borrowerName}
                        </TableCell>
                      </TableRow>
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }
  
  HelixCollapsibleRow.propTypes = {
    row: PropTypes.instanceOf(Object).isRequired,
}

export default HelixCollapsibleRow