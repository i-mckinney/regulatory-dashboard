import React, { useState, useMemo, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import {
  StylesProvider,
  createGenerateClassName,
  makeStyles,
  withStyles,
  Typography,
} from '@material-ui/core'
import AddBoxIcon from '@material-ui/icons/AddBox'
import SettingsIcon from '@material-ui/icons/Settings'
import IconButton from '@material-ui/core/IconButton'
import AssessmentIcon from '@material-ui/icons/Assessment'
import DeleteIcon from '@material-ui/icons/Delete'
import { HelixTableCell } from 'helixmonorepo-lib'
import HelixTable from '../table/HelixTable'
import { sortableExcludes, columnExcludes, columnLabels } from './config'
import HelixCollapsibleRow from '../utils/HelixCollapsibleRow'
import ConfirmDialog from '../utils/ConfirmDialog'
import Notification from '../utils/Notification'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemText from '@material-ui/core/ListItemText'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import entities from '../apis/entities'

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

  // Sets state of dropdown menu location
  const [anchorEl, setAnchorEl] = React.useState(null)

  /**
   * @param {string} id row id to be deleted
   * Closes dialog box and updates row data
   */
  const handleDelete = async (loanId) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    })
    await entities.delete(`/loans/5f7e1bb2ab26a664b6e950c8/${loanId}`)

    setNotification({
      isOpen: true,
      message: 'Successfully deleted request',
      type: 'success',
    })
  }

  if (rows.length !== 0) {
    const headerColumns = Object.keys(rows[0])
    if (columns.length === 0) {
      headerColumns.forEach((key, index) => {
        if (!columnExcludes.includes(key)) {
          columns.push({
            Label: columnLabels[index],
            Accessor: key,
            Sortable: sortableExcludes.includes(key) ? false : true,
          })
        }
      })
      columns.push({
        Label: "Actions",
        Accessor: "Actions",
        Sortable: sortableExcludes.includes("Actions") ? false : true,
      })
    }
  }

  /**
   * @param {object} entity represent object of entity with particular props
   * @param {string} accessor represents the accessor which entity with acessor can access the property value
   */
  const isoToDate = (entity, accessor) => {
    const strDate = entity[accessor];
    entity[accessor] = strDate.substring(0, 10);
  };

  /**
   * Renders only when it is mounted at first
   * It will fetchLoans whenever Loan loads
   */
  useEffect(() => {
    /**
     * fetchLoans calls backend api through get protocol to get all the loans
     */
    const fetchLoans = async () => {
      const response = await entities.get("loans/5f7e1bb2ab26a664b6e950c8");

      response.data.forEach((entity) => {
        if (entity["createdAt"] !== undefined) {
          isoToDate(entity, "createdAt");
        }
        if (entity["updatedAt"] !== undefined) {
          isoToDate(entity, "updatedAt");
        }
      });
      setRows(response.data);
    };

    fetchLoans();
  }, [columns, notification]);

  /**
   * @param {object} row row represents loan object
   */
  const handleModalDeletePopUp = (row) => {
    setConfirmDialog({
      isOpen: true,
      title: `Do you want to delete this ${row.primaryBorrowerName}'s loan?`,
      cancelText: 'Cancel',
      confirmText: 'Yes',
      onConfirm: () => {
        handleDelete(row.loanId)
      },
    })
  }

  // Handles opening of the action button dropdown menu
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  // Handles closing of the action button dropdown menu
  const handleClose = () => {
    setAnchorEl(null)
  }

  // Toggle-able dropdown menu that displays on action button click event
  const ActionMenu = withStyles({
    paper: {
      border: '1px solid #d3d4d5',
    },
  })((props) => (
    <Menu
      elevation={10}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      {...props}
    />
  ))

  // Dropdown menu list items and styling
  const ActionMenuItem = withStyles((theme) => ({
    root: {
      '&:focus': {
        backgroundColor: theme.palette.primary.main,
        '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
          color: theme.palette.common.white,
        },
      },
    },
  }))(MenuItem)

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
      'Loan ID',
      'Primary BorrowerTIN',
      'Guarantor ID',
      'Loan Created',
      'Loan Updated',
    ]
    const innerTableBodyRows = [row.loanId, row.primaryBorrowerTIN, row.guarantorBID, row.createdAt, row.updatedAt]
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
        <Button
          aria-controls='action-menu'
          aria-haspopup='true'
          variant='contained'
          color='primary'
          onClick={handleClick}
        >
          Actions<ExpandMoreIcon style={{ paddingLeft: '0.5em' }} />
        </Button>
        <ActionMenu
          id='action-menu'
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <ActionMenuItem
            onClick={() =>
              props.history.push({
                pathname: `/loan/${row._id}/discrepancy-report`,
                state: row,
              })
            }
          >
            <IconButton
              className={loanClasses.discrepancyButton}
              aria-label='discrepancy'
              size='small'
              edge='start'
            >
              <AssessmentIcon />
            </IconButton>
            <ListItemText primary='Discrepancies' />
          </ActionMenuItem>
          <ActionMenuItem
            onClick={() =>
              props.history.push({
                pathname: `/loan/configuration/${row._id}`,
                state: row,
              })
            }
          >
            <IconButton
              aria-label='config'
              size='small'
              edge='start'
              color='default'
            >
              <SettingsIcon />
            </IconButton>
            <ListItemText primary='Configure' />
          </ActionMenuItem>
          <ActionMenuItem onClick={() => {handleModalDeletePopUp(row); handleClose();}}>
            <IconButton
              aria-label='delete'
              size='small'
              edge='start'
              color='secondary'
            >
              <DeleteIcon />
            </IconButton>
            <ListItemText primary='Delete' />
          </ActionMenuItem>
        </ActionMenu>
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
        color="primary"
        onClick={() => (props.history.push("/loan/new/selectentity"))}>
            <AddBoxIcon fontSize="large" />
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
