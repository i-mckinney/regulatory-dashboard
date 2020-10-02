import React, { useState } from 'react';
import { Paper, TableContainer, Table } from '@material-ui/core';
import PropTypes from 'prop-types';
import HelixTableHead from './HelixTableHead';
import HelixTableBody from './HelixTableBody';
import HelixTableFooter from './HelixTableFooter';
import HelixToolBarSearch from './HelixToolBarSearch';
import { getComparator, stableSort } from './HelixTableSortFunc';

/**
 * @param {array} columns Array of object where each object contains which filter to use, header label and accessor for getting specific key from data object
 * @param {array} rows API result from getting a list of items such as report templates, clients and etc.(depending on where it is used)
 * @param {func} customCellRender func represents custom func that return jsx of table row of table cell values
 * @param {func} customHeadColumnKeyProp func represents custom func that return key props for table row in table head (required)
 * @param {func} customBodyRowKeyProp func represents custom func that return key props for the table row in table body (required)
 * @param {string} initialOrderBy string represents what the column in the table should order by initially
 * @param {func} displayCreateIcon func displays jsx object of create icon into toolbar
 * @returns {JSX} renders a custom table
 */
const HelixTable = ({
  columns,
  rows,
  customCellRender,
  customHeadColumnKeyProp,
  customBodyRowKeyProp,
  initialOrderBy,
  displayCreateIcon,
}) => {
  // Page is needed for pagination to determine the process of what page it is at
  const [page, setPage] = useState(0);

  // rowsPerPage is needed for pagination to determine how many rows should be display per page
  const [rowsPerPage, setRowsPerPage] = useState(5);

  /**
   * @param {int} newPage the newPage passed from the child component
   * it sets a new page
   */
  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  /**
   * @param {event} event the event object hold the property of input value that passed from the child component
   * it sets row per page by specific value and set the page to 0
   */
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // order is a conditional string for ascending or descending order
  const [order, setOrder] = useState('asc');

  // orderBy is a string to order by column in ascending or descending order
  const [orderBy, setOrderBy] = useState(initialOrderBy);

  /**
   * @param {string} property the property is a column header
   */
  const onSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // searchFilter contains a func that store filter query search upon user input
  const [searchFilter, setSearchFilter] = useState({
    search: (rows, columns) => {
      return rows;
    },
  });

  /**
   * @param {object} event the event object contains user input
   * Pass the user query input to searchFilter and it store which object matches the query
   */
  const onSearch = (event) => {
    const { value } = event.target;
    setSearchFilter({
      search: (rows, columns) => {
        if (value === '') return rows;
        else
          return rows.filter((row) =>
            columns.filter((column) => {
              const columnAccessor = column.Accessor;
              if (typeof row[columnAccessor] === 'string') {
                return row[columnAccessor]
                  .toLowerCase()
                  .includes(value.toLowerCase());
              }
              try {
                const assignedRoles = row[columnAccessor].reduce(
                  (result, roles) => {
                    return `${result} ${roles}`.trim();
                  },
                  ''
                );
                return assignedRoles
                  .toLowerCase()
                  .includes(value.toLowerCase());
              } catch (error) {
                console.log('Error Type', error);
                return error;
              }
            }).length > 0
              ? true
              : false
          );
      },
    });
  };

  return (
    <div>
      <HelixToolBarSearch
        onSearch={onSearch}
        displayCreateIcon={displayCreateIcon}
      />
      <TableContainer component={Paper}>
        <Table aria-label='table'>
          <HelixTableHead
            order={order}
            orderBy={orderBy}
            onSort={onSort}
            columns={columns}
            customHeadColumnKeyProp={customHeadColumnKeyProp}
          />
          <HelixTableBody
            searchFilter={searchFilter}
            order={order}
            orderBy={orderBy}
            getComparator={getComparator}
            stableSort={stableSort}
            columns={columns}
            rows={rows}
            rowsPerPage={rowsPerPage}
            page={page}
            customCellRender={customCellRender}
            customBodyRowKeyProp={customBodyRowKeyProp}
          />
          <HelixTableFooter
            rows={rows}
            colSpan={columns.length}
            rowsPerPage={rowsPerPage}
            page={page}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Table>
      </TableContainer>
    </div>
  );
};

HelixTable.propTypes = {
  columns: PropTypes.instanceOf(Array).isRequired,
  rows: PropTypes.instanceOf(Array).isRequired,
  customCellRender: PropTypes.func.isRequired,
  customHeadColumnKeyProp: PropTypes.func.isRequired,
  customBodyRowKeyProp: PropTypes.func.isRequired,
  initialOrderBy: PropTypes.string.isRequired,
  displayCreateIcon: PropTypes.func.isRequired,
};

export default HelixTable;
