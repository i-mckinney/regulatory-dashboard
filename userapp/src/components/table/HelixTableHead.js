import React from "react"
import { TableHead, TableRow, TableCell, TableSortLabel, makeStyles } from "@material-ui/core"
import PropTypes from "prop-types"

const helixTableHeadStyles = makeStyles(() => ({
  sortLabel: {
    color: "white!important",
    // '&.active': {
    //   color: "white",
    // }
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
 * @returns {JSX} renders a custom table head for table
 */
const HelixTableHead = ({ columns, customHeadRowProps, order, orderBy, onRequestSort }) => {
  const helixTableHeadClasses = helixTableHeadStyles()

  const createSortHandler = (property) => () => {
    onRequestSort(property)
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
              active={orderBy === customHeadRowProps(column)}
              direction={orderBy === customHeadRowProps(column) ? order : 'asc'}
              onClick={createSortHandler(customHeadRowProps(column))}
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
  onRequestSort: PropTypes.func.isRequired,
}

export default HelixTableHead
