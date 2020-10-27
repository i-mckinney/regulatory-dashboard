import React from 'react'
import { TableHead, TableRow, TableCell, TableSortLabel, makeStyles } from '@material-ui/core'
import PropTypes from 'prop-types'

// Styling used for MaterialUI
const helixTableHeadStyles = makeStyles(() => ({
  sortLabel: {
    color: "white!important",
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}))

/**
 * @param {array} columns Array of object where each object contains which filter to use, header label and accessor for getting specific key from data object
 * @param {func} customHeadColumnKeyProp func represents custom function that return key props for table row in table head (required)
 * @param {string} order string represents ascending or descending order
 * @param {string} orderBy string represents which column should it order by
 * @param {func} onSort func that sort the table by column either ascending or descending order
 * @param {bool} toggleSearch bool represents true or false if table should have a search function
 * @returns {JSX} renders a custom table head for table
 */
const HelixTableHead = ({ columns, customHeadColumnKeyProp, order, orderBy, onSort, toggleSearch }) => {
  // Creates an object for styling. Any className that matches key in the helixTableHeadStyles object will have a corresponding styling
  const helixTableHeadClasses = helixTableHeadStyles()

  /**
   * @param {string} column the column represents object containing headers
   * it passes the column header property back up to parent component to sort
   */
  const createSortHandler = (column) => () => {
    onSort(customHeadColumnKeyProp(column))
  }

  /**
   * @return true if current order by is current column identifier else turn off active sorting
   */
  const isActive = (orderBy, column) => {
    return orderBy === customHeadColumnKeyProp(column)
  }

  /**
   * @return the ascending order when clicked on a new column to order by otherwise descending order on the same column that we are at    
   */
  const orderByDirection = (order, orderBy, column) => {
    return orderBy === customHeadColumnKeyProp(column) ? order : 'asc'
  }

  /**
   * 
   * @param {object} column the column is an object that contains header label and header accessor
   * @return {jsx} return a jsx sortable column label or regular column label
   */
  const renderTableSortLabel = (column) => {
    return (
      column.Sortable ? <TableSortLabel
      className={helixTableHeadClasses.sortLabel}
      active={isActive(orderBy, column)}
      direction={orderByDirection(order, orderBy, column)}
      onClick={createSortHandler(column)}
      >
        {column.Label}
        {orderBy === customHeadColumnKeyProp(column) ? (
        <span className={helixTableHeadClasses.visuallyHidden}>
          {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
        </span>
        ) : null}
      </TableSortLabel>
      : column.Label
    )
  }

  return (
    <TableHead>
      <TableRow>
        {columns.map((column) => (
            <TableCell 
            key={customHeadColumnKeyProp(column)}
            sortDirection={orderBy === customHeadColumnKeyProp(column) ? order : false}>
              {toggleSearch ? renderTableSortLabel(column) : column.Label}
            </TableCell>
          ))}
      </TableRow>
    </TableHead>
  )
}

HelixTableHead.propTypes = {
  columns: PropTypes.instanceOf(Array).isRequired,
  customHeadColumnKeyProp: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc', '']).isRequired,
  orderBy: PropTypes.string.isRequired,
  onSort: PropTypes.func.isRequired,
  toggleSearch: PropTypes.bool.isRequired,
}

HelixTableHead.defaultProps = {
  order: '',
  orderBy: '',
  toggleSearch: false,
}

export default HelixTableHead
