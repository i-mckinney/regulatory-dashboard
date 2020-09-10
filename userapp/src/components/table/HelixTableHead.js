import React from "react"
import { TableHead, TableRow, TableCell, TableSortLabel, makeStyles } from "@material-ui/core"
import PropTypes from "prop-types"

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
 * @param {func} customHeadRowProps func represents custom function that return key props for table row in table head (required)
 * @param {string} order string represents ascending or descending order
 * @param {string} orderBy string represents which column should it order by
 * @param {func} onSort func that sort the table by column either ascending or descending order
 * @returns {JSX} renders a custom table head for table
 */
const HelixTableHead = ({ columns, customHeadRowProps, order, orderBy, onSort }) => {
  // Creates an object for styling. Any className that matches key in the helixTableHeadStyles object will have a corresponding styling
  const helixTableHeadClasses = helixTableHeadStyles()

  /**
   * @param {string} column the column represents object containing headers
   * it passes the column header property back up to parent component to sort
   */
  const createSortHandler = (column) => () => {
    onSort(customHeadRowProps(column))
  }

  /**
   * @return true if current order by is current column identifier else turn off active sorting
   */
  const isActive = (orderBy, column) => {
    return orderBy === customHeadRowProps(column)
  }

  /**
   * @return the ascending order when clicked on a new column to order by otherwise descending order on the same column that we are at    
   */
  const orderByDirection = (order, orderBy, column) => {
    return orderBy === customHeadRowProps(column) ? order : 'asc'
  }

  return (
    <TableHead>
      <TableRow>
        {columns.map((column) => (
            <TableCell 
            key={customHeadRowProps(column)}
            sortDirection={orderBy === customHeadRowProps(column) ? order : false}>
              <TableSortLabel
              className={helixTableHeadClasses.sortLabel}
              active={isActive(orderBy, column)}
              direction={orderByDirection(order, orderBy, column)}
              onClick={createSortHandler(column)}
              >
                {column.Label}
                {orderBy === customHeadRowProps(column) ? (
                <span className={helixTableHeadClasses.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
      </TableRow>
    </TableHead>
  )
}

HelixTableHead.propTypes = {
  columns: PropTypes.instanceOf(Array).isRequired,
  customHeadRowProps: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  onSort: PropTypes.func.isRequired,
}

export default HelixTableHead
