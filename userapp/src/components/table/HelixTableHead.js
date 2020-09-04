import React from "react"
import { TableHead, TableRow, TableCell, TableSortLabel } from "@material-ui/core"
import PropTypes from "prop-types"

/**
 * @param {array} columns Array of object where each object contains which filter to use, header label and accessor for getting specific key from data object
 * @param {func} customHeadRowProps func represents custom function that return key props for table row in table head (required)
 * @returns {JSX} renders a custom table head for table
 */
const HelixTableHead = ({ columns, customHeadRowProps, visuallyHidden, order, orderBy, onRequestSort }) => {
  return (
    <TableHead>
      <TableRow>
        {columns.map((column) => (
            <TableCell 
            key={customHeadRowProps(column)}
            sortDirection={orderBy === customHeadRowProps(column) ? order : false} >
              <TableSortLabel
              active={orderBy === customHeadRowProps(column)}
              direction={orderBy === customHeadRowProps(column) ? order : 'asc'}
              onClick={onRequestSort(customHeadRowProps(column))}
              >
                {column.Label}
                {orderBy === customHeadRowProps(column) ? (
                <span className={visuallyHidden}>
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
  visuallyHidden: PropTypes.object.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  onRequestSort: PropTypes.func.isRequired,
}

export default HelixTableHead
