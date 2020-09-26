import React, { useState, useEffect, useMemo } from 'react';
import { withRouter } from 'react-router-dom';
import {
  StylesProvider,
  makeStyles,
  Typography,
  TableCell,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { HelixTable } from 'helixmonorepo-lib';
import users from '../apis/users';
import { sortableExcludes, columnExcludes, columnLabels } from '../../config';
import { Button as MuiButton } from '@material-ui/core';
import axios from 'axios';


// Styling used for MaterialUI
const userTableStyles = makeStyles(() => ({
  mediumContainer: {
    width: '80%',
    margin: 'auto',
    marginTop: '5rem',
    paddingBottom: '5rem',
    '& table': {
      width: '100%',
      display: 'table',
      borderTopRightRadius: '4px',
      borderTopLeftRadius: '4px',
      boxSizing: 'border-box',
      borderSpacing: '2px',
      borderColor: 'grey',
      '& tr': {
        border: 'none',
        backgroundColor: 'white',
        '&:nth-child(even)': {
          backgroundColor: '#f2f2f2',
        },
        '&:hover': {
          backgroundColor: '#add8e6',
        },
        '&:last-child': {
          borderBottomRightRadius: '4px',
          borderBottomLeftRadius: '4px',
        },
      },
      '& th': {
        backgroundColor: '#2e353d',
        color: 'white',
        margin: '0',
        borderBottom: 'solid 1px #e0e4e8',
        padding: '8px',
      },
      '& td': {
        margin: '0',
        borderBottom: 'solid 1px #e0e4e8',
        padding: '8px',
      },
      '&:last-children': {
        borderBottom: 'none',
      },
    },
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
}));

/**
 * @param {Object} props Using the history location to route next component with data state
 * @return {JSX} ApiTable of the client's custom APIs
 * routed at /
 */
const ApiTable = (props) => {
  // Creates an object for styling. Any className that matches key in the userTableStyles object will have a corresponding styling
  const userTableClasses = userTableStyles();

  // rows will stores users from GET Method fetchUsers via Rest API
  const [rows, setRows] = useState([]);

  // columns will store column header that we want to show in the front end
  const columns = [
      { field: 'requestName', headerName: 'Request Name', width: 70 },
      { field: 'requestMethod', headerName: 'Request Method' },
      { field: 'requestUrl', headerName: 'Request URL' },
  ]

  if (rows.length !== 0) {
    const headerColumns = Object.keys(rows[0]);
    headerColumns.forEach((key, index) => {
      if (!columnExcludes.includes(key)) {
        columns.push({
          Label: columnLabels[index],
          Accessor: key,
          Sortable: sortableExcludes.includes(key) ? false : true,
        });
      }
    });
  }

  //what is the structure of the columns and the rows ?
  

  /**
   * @param {object} api represent object of api with particular props
   * @param {string} accessor represents the accessor which api with acessor can access the property value
   */
  const isoToDate = (api, accessor) => {
    const strDate = api[accessor];
    api[accessor] = strDate.substring(0, 10);
  };

  /**
   * Renders only when it is mounted at first
   * It will fetchUsers whenever ApiTable loads
   */
  useEffect(() => {
    /**
     * fetchUsers calls backend api through get protocol to get all the users
     */
    const fetchUsers = async () => {
      try {
        const response = await users.get('/users');

        response.data.forEach((api) => {
          if (api['createdAt'] !== undefined) {
            isoToDate(api, 'createdAt');
          }
          if (api['updatedAt'] !== undefined) {
            isoToDate(api, 'updatedAt');
          }
        });
        setRows(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchCompanies = () => {
        axios.get('http://localhost:4005/companies', {
          headers: {"Access-Control-Allow-Origin" : "*"}
        })
        .then(res => console.log(res.data[0]))
    }

    fetchUsers();
    fetchCompanies();
  }, [columns]);

  /**
   * @param {int} rowIndex represents row index
   * @param {object} row represent object data from the api result
   * @param {object} column represent object data (have a header object which has an accessor needed it for key props) from the api result
   * @return {JSX} Table cell of object properties in that Table row
   */
  const customCellRender = (rowIndex, row, column) => {
    const columnAccessor = column.Accessor;
    if (columnAccessor === 'Actions') {
      return (
        <TableCell
          className={userTableClasses.actionsIconStyle}
          key={`${rowIndex} ${columnAccessor}`}
        >
          <IconButton
            aria-label='edit'
            size='small'
            edge='start'
            onClick={() =>
              props.history.push({
                pathname: `/client-api/edit/${row._id}`,
                state: row,
              })
            }
            color='default'
          >
            <EditIcon />
          </IconButton>
          <IconButton
            aria-label='delete'
            size='small'
            edge='start'
            onClick={() =>
              props.history.push({
                pathname: `/client-api/delete/${row._id}`,
                state: row,
              })
            }
            color='secondary'
          >
            <DeleteIcon />
          </IconButton>
        </TableCell>
      );
    }
    return (
      <TableCell key={`${rowIndex} ${columnAccessor}`}>
        {row[columnAccessor]}
      </TableCell>
    );
  };

  /**
   * @param {object} column represent object data regarding the api result
   * @return {string} provide table row with unique key props (required)
   */
  const customHeadColumnKeyProp = (column) => {
    return column.Accessor;
  };

  /**
   * @param {object} row represent object data regarding the api result
   * @return {string} provide table row with unique key props (required)
   */
  const customBodyRowKeyProp = (row) => {
    return row._id;
  };

  // Initially, we can start the table to order by First Name, ascending order
  const initialOrderBy = 'FirstName';

  /**
   * @return jsx object of create icon in child component's toolbar
   */
  const displayCreateUserIcon = () => {
    return (
      <MuiButton
        className={userTableClasses.createIconStyle}
        variant="outlined"
        color='default'
        onClick={() => props.history.push('/client-api/new')}
      >
      Add New
        <AddIcon fontSize='default' />
      </MuiButton>
    );
  };

  return (
    <StylesProvider injectFirst>
      <div className={userTableClasses.mediumContainer}>
        <div className={userTableClasses.header}>
          <Typography variant='h5'>Client API Interface</Typography>
        </div>
        <HelixTable
          displayCreateIcon={displayCreateUserIcon}
          initialOrderBy={initialOrderBy}
          columns={columns.slice(1)}
          rows={rows}
          customCellRender={customCellRender}
          customHeadColumnKeyProp={customHeadColumnKeyProp}
          customBodyRowKeyProp={customBodyRowKeyProp}
        />
      </div>
    </StylesProvider>
  );
};

export default withRouter(ApiTable);
