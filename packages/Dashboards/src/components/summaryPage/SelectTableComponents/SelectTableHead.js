import React from 'react';
import PropTypes from 'prop-types';
import {
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Checkbox,
} from "@material-ui/core";

//Head cells to determine column for the select table
const headCells = [
  { id: 'ExternalSource', disablePadding: true, label: 'External Source' },
  { id: 'fieldName', disablePadding: false, label: 'Field Name' },
  { id: 'ExternalValue', disablePadding: false, label: 'External Value' },
  { id: 'CurrentValue', disablePadding: false, label: 'Proposed Value' },
  { id: 'SourceOfTruth', disablePadding: false, label: 'Source Of Truth' },
];

/**
 * 
 * @param {object} classes used for styling regarding select tabled
 * @param {func} onSelectAllClick used for selecting all rows in the table
 * @param {string} order determines whether the order of rows will be asc or desc
 * @param {string} orderBy determines which column will be the basis for ordering
 * @param {number} numSelected number of rows selected
 * @param {number} rowCount number of total rows
 * @param {func} onRequestSort helper function for sorting rows in the table.
 * @return renders table head for select table.
 */
function SelectTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              <b>
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
              </b>
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

SelectTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default SelectTableHead