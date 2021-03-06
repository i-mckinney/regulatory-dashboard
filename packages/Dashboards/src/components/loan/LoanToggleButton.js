import React, { useState, useMemo } from 'react'
import { withRouter } from 'react-router-dom'
import {
  StylesProvider,
  createGenerateClassName,
  makeStyles,
  Typography,
} from '@material-ui/core'
import AddBoxIcon from '@material-ui/icons/AddBox'
import SettingsIcon from '@material-ui/icons/Settings'
import IconButton from '@material-ui/core/IconButton'
import AssessmentIcon from '@material-ui/icons/Assessment'
import DeleteIcon from '@material-ui/icons/Delete'
import { HelixTableCell } from 'helixmonorepo-lib'
import HelixTable from '../table/HelixTable'
import mockData from './MockData'
import { sortableExcludes, columnExcludes, columnLabels } from './config'
import HelixCollapsibleRow from '../utils/HelixCollapsibleRow'
import ConfirmDialog from '../utils/ConfirmDialog'
import Notification from '../utils/Notification'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Grow from '@material-ui/core/Grow'
import Paper from '@material-ui/core/Paper'
import Popper from '@material-ui/core/Popper'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'

const generateClassName = createGenerateClassName({
  productionPrefix: 'loan-',
})

// Styling used for MaterialUI
const loanStyles = makeStyles(() => ({
  mediumContainer: {
    width: '80%',
    margin: 'auto',
    marginTop: '3rem',
    paddingBottom: '3rem',
  },
  createIconStyle: {
    float: 'right',
    cursor: 'pointer',
    marginLeft: 'auto',
  },
  header: {
    paddingBottom: '2rem',
  },
  actionsIconStyle: {
    '& button': {
      marginRight: '1rem',
      cursor: 'pointer',
    },
  },
  discrepancyButton: {
    color: 'green',
  },
}))

/** @return {JSX} Loan site
 * routed at /loan
 */

function Loan(props) {
  // Creates an object for styling. Any className that matches key in the loanStyles object will have a corresponding styling
  const loanClasses = loanStyles()

  /** useMemo is a React hook that memorizes the output of a function.
   * It's important that we're using React.useMemo here to ensure that our data isn't recreated on every render.
   * If we didn't use React.useMemo, the table would think it was receiving new data on every render
   * and attempt to recalulate a lot of logic every single time. Only when the memoized value actually changes, it re renders
   * Header -> Represents what is shown in the table
   * Accessor -> represents key that you look for in a given data
   * Filter -> choosing which filter to use.
   * filter -> includes (tells react table to show values that matches the value in the select field)
   * Filter not given -> will use global filter
   * */
  // rows will stores loans from GET Method fetchLoans via Rest API
  const [rows, setRows] = useState([])

  // columns will store column header that we want to show in the front end
  const columns = useMemo(() => [], [])

  //Set state of notification in response to a button action
  const [notification, setNotification] = useState({
    isOpen: false,
    message: '',
    type: '',
  })

  // Sets state of confirm Dialog window used for editing/deleting a request
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: '',
    subTitle: '',
    confirmText: 'Yes',
    cancelText: 'Cancel',
  })

  //
  const [open, setOpen] = React.useState(false)

  //
  const anchorRef = React.useRef(null)

  //
  const [selectedIndex, setSelectedIndex] = React.useState(1)

  // On first render (column length is zero), set rows to full set of mock data
  if (columns.length === 0) {
    setRows(mockData)
  }

  /**
   * @param {string} id row id to be deleted
   * Closes dialog box and updates row data
   */
  const handleDelete = (id) => {
    const tempData = [...rows]
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    })
    const newData = tempData.filter((myRequest) => myRequest._id !== id)
    setRows(newData)
    setNotification({
      isOpen: true,
      message: 'Successfully deleted request',
      type: 'success',
    })
  }

  if (rows.length !== 0 && columns.length === 0) {
    const headerColumns = Object.keys(rows[0])
    headerColumns.forEach((key, index) => {
      if (!columnExcludes.includes(key)) {
        columns.push({
          Label: columnLabels[index],
          Accessor: key,
          Sortable: sortableExcludes.includes(key) ? false : true,
        })
      }
    })
  }

  /**
   * @param {object} row row represents loan object
   */
  const handleModalDeletePopUp = (row) => {
    setConfirmDialog({
      isOpen: true,
      title: `Do you want to delete this ${row.borrowerName}'s loan?`,
      cancelText: 'Cancel',
      confirmText: 'Yes',
      onConfirm: () => {
        handleDelete(row._id)
      },
    })
  }

  /**
   * @param {object} row row represents loan object
   * @param {int} rowIndex rowIndex represents the index of the current row object
   * @param {object} columns columns represents list of columns
   * @param {func} customCellRender represents HelixTableCell of object properties in that Table row
   */

  const customCollapsibleRowRender = (
    row,
    rowIndex,
    columns,
    customCellRender
  ) => {
    const innerTableHeadColumns = [
      'Borrower ID',
      'Loan Created',
      'Loan Updated',
    ]
    const innerTableBodyRows = [row.borrowerID, row.createdAt, row.updatedAt]
    return (
      <HelixCollapsibleRow
        key={row._id}
        row={row}
        rowIndex={rowIndex}
        columns={columns}
        innerTableHeadColumns={innerTableHeadColumns}
        innerTableBodyRows={innerTableBodyRows}
        customCellRender={customCellRender}
      />
    )
  }

  // SPILT BUTTON MENU

  const splitButtonOptions = [
    'Create a merge commit',
    'Squash and merge',
    'Rebase and merge',
  ]

  const handleClick = () => {
    console.info(`You clicked ${splitButtonOptions[selectedIndex]}`)
  }

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index)
    setOpen(false)
  }

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return
    }

    setOpen(false)
  }

  /**
   * @param {object} row the row is an object of data
   * @param {object} column the column is an object of the header with accessor and label props
   * @param {int} rowIndex the rowIndex represents index of the row
   * @param {int} columnIndex the columnIndex represents index of the column
   * @return {JSX} HelixTableCell of object properties in that Table row
   */
  const customCellRender = (row, column, rowIndex, columnIndex) => {
    const columnAccessor = column.Accessor
    const displayActions = () => (
      <span className={loanClasses.actionsIconStyle}>
        <ButtonGroup
          variant='contained'
          color='primary'
          ref={anchorRef}
          aria-label='split button'
        >
          <Button onClick={handleClick}>
            {splitButtonOptions[selectedIndex]}
          </Button>
          <Button
            color='primary'
            size='small'
            aria-controls={open ? 'split-button-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-label='select merge strategy'
            aria-haspopup='menu'
            onClick={handleToggle}
          >
            <ArrowDropDownIcon />
          </Button>
        </ButtonGroup>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom' ? 'center top' : 'center bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList id='split-button-menu'>
                    {splitButtonOptions.map((option, index) => (
                      <MenuItem
                        key={option}
                        disabled={index === 2}
                        selected={index === selectedIndex}
                        onClick={(event) => handleMenuItemClick(event, index)}
                      >
                        {option}
                      </MenuItem>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>

        {/* <IconButton className={loanClasses.discrepancyButton} aria-label="discrepancy" size="small" edge="start" onClick={() => (props.history.push({ pathname: `/loan/${row._id}/discrepancy-report`, state: row }))}>
              <AssessmentIcon />
            </IconButton>
            <IconButton aria-label="delete" size="small" edge="start" onClick={() => (handleModalDeletePopUp(row))} color="secondary">
              <DeleteIcon />
            </IconButton>
            <IconButton aria-label="config" size="small" edge="start" onClick={() => (props.history.push({ pathname: `/loan/configuration/${row._id}`, state: row }))} color="default">
              <SettingsIcon />
            </IconButton> */}
      </span>
    )

    if (columnAccessor === 'Actions') {
      return (
        <HelixTableCell
          key={`Row-${rowIndex} ${columnAccessor}-${columnIndex}`}
          containActions={true}
          displayActions={displayActions}
        />
      )
    } else {
      return (
        <HelixTableCell
          key={`Row-${rowIndex} ${columnAccessor}-${columnIndex}`}
          value={row[columnAccessor]}
        />
      )
    }
  }

  /**
   * @param {object} column represent object data regarding the api result
   * @return {string} provide table row with unique key props (required)
   */
  const customHeadColumnKeyProp = (column) => {
    return column.Accessor
  }

  /**
   * @param {object} row represent object data regarding the api result
   * @return {string} provide table row with unique key props (required)
   */
  const customBodyRowKeyProp = (row) => {
    return row._id
  }

  // Initially, we can start the table to order by Loan Name or etc in ascending order
  const initialOrderBy = 'loanName'

  /**
   * @return jsx object of create icon in child component's toolbar
   */
  const displayCreateLoanIcon = () => {
    return (
      <span className={loanClasses.createIconStyle}>
        <IconButton
          color='primary'
          onClick={() => props.history.push('/loan/new')}
        >
          <AddBoxIcon fontSize='large' />
        </IconButton>
      </span>
    )
  }

  return (
    <StylesProvider generateClassName={generateClassName}>
      <div className={loanClasses.mediumContainer}>
        <div className={loanClasses.header}>
          <Typography variant='h5'>Loan</Typography>
        </div>
        <HelixTable
          toggleSearch={true}
          toggleExpandable={true}
          customCollapsibleRowRender={customCollapsibleRowRender}
          displayCreateIcon={displayCreateLoanIcon}
          initialOrderBy={initialOrderBy}
          columns={columns.slice(1)}
          rows={rows}
          customCellRender={customCellRender}
          customHeadColumnKeyProp={customHeadColumnKeyProp}
          customBodyRowKeyProp={customBodyRowKeyProp}
        />
      </div>
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
      <Notification
        notification={notification}
        setNotification={setNotification}
      />
    </StylesProvider>
  )
}

export default withRouter(Loan)
