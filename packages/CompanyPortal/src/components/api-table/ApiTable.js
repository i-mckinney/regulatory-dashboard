import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { StylesProvider, makeStyles, TableCell } from '@material-ui/core';
import PageHeader from '../../layout/PageHeader';
import TelegramIcon from '@material-ui/icons/Telegram';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { HelixTable } from 'helixmonorepo-lib';
import { sortableExcludes, columnMetadata, API_HOST } from '../../config';
import PerformTestDialog from './PerformTestDialog';
import { MODAL_ACTION_CREATE, MODAL_ACTION_UPDATE } from './constants';
import EditCustomApiRequestDialog from './EditCustomApiRequestDialog';

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
  testButtonStyle: {
    color: '#00c200',
  },
}));

/**
 * @param {Object} props Using the history location to route next component with data state
 * @return {JSX} ApiTable of the client's custom APIs
 * routed at /
 */
const ApiTable = (props) => {
  // TODO: replace this static id with a dynamic prop
  const companyId = '5f7e1bb2ab26a664b6e950c8';
  // Creates an object for styling. Any className that matches key in the userTableStyles object will have a corresponding styling
  const userTableClasses = userTableStyles();

  const [openTestRequestModal, setOpenTestRequestModal] = useState(false);

  const [companyData, setCompanyData] = useState([]);

  const [openEditModal, setOpenEditModal] = React.useState(false);

  const [requestData, setRequestData] = useState({});

  const [modalAction, setModalAction] = useState(MODAL_ACTION_CREATE);

  const [loading, setLoading] = useState(false);

  const customApiUrl = `${API_HOST}/companies/${companyId}/customapi`;

  /**
   * Renders only when it is mounted at first
   * It will fetchUsers whenever ApiTable loads
   */
  useEffect(() => {
    const fetchCompanies = () => {
      axios
        .get(customApiUrl, {
          headers: { 'Access-Control-Allow-Origin': '*' },
        })
        .then((res) => {
          // console.log('res', res.data[0].CustomApiRequests);
          // setRows(res.data[0].CustomApiRequests);
          setCompanyData(res.data);
        });
    };

    fetchCompanies();
  }, [customApiUrl]);

  const handleOpenEditModal = (requestData) => {
    if (!!requestData) {
      setModalAction(MODAL_ACTION_UPDATE);
      setRequestData({
        ...requestData,
      });
    } else {
      setModalAction(MODAL_ACTION_CREATE);
      setRequestData({
        _id: new Date().getTime(),
        requestName: '',
        requestType: '',
        requestURL: '',
      });
    }
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setRequestData({});
  };

  // columns will store column header that we want to show in the front end
  let columns = [];

  columns = columnMetadata.map(({ key, label }) => ({
    Label: label,
    Accessor: key,
    Sortable: sortableExcludes.includes(key) ? false : true,
  }));
  columns.push({
    Label: 'Actions',
    Accessor: 'Actions',
    Sortable: false,
  });
  //}

  const handleCreateRow = async (newRow) => {
    const payload = { ...newRow }
    delete payload._id
    setLoading(true);
    try {
      const response = await axios.post(
        customApiUrl,
        payload,
        {
          headers: { 'Access-Control-Allow-Origin': '*' },
        }
      );
      setCompanyData([ ...companyData, response.data]);
    } catch(e) {
      console.error(e)
    }
    

    
    setLoading(false);
    handleCloseEditModal();
  };

  const handleEditRow = async (updatedRow) => {
    const payload = { ...updatedRow }
    delete payload._id
    delete payload.company_id
    setLoading(true);
    try {
      const response = await axios.put(
        `${customApiUrl}/${updatedRow._id}`,
        payload,
        {
          headers: { 'Access-Control-Allow-Origin': '*' },
        }
      );
      setCompanyData(companyData.map(d => d._id === updatedRow._id ? response.data : d));
    } catch(e) {
      console.error(e)
    }
    setLoading(false);
    handleCloseEditModal();
  };

  const handleDeleteRow = async (_id) => {
    try {
      await axios.delete(
        `${customApiUrl}/${_id}`,
        {
          headers: { 'Access-Control-Allow-Origin': '*' },
        }
      );
      setCompanyData(companyData.filter(d => d._id !== _id));
    } catch(e) {
      console.error(e)
    }
    
  };

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
          <MuiButton
            className={userTableClasses.testButtonStyle}
            variant='outlined'
            color='default'
            onClick={() => {
              setOpenTestRequestModal(true);
              setRequestData(row);
            }}
          >
            Perform Test
          </MuiButton>
          <IconButton
            aria-label='edit'
            size='small'
            edge='start'
            onClick={() => handleOpenEditModal(row)}
            color='default'
          >
            <EditIcon />
          </IconButton>
          <IconButton
            aria-label='delete'
            size='small'
            edge='start'
            onClick={() => handleDeleteRow(row._id)}
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
        variant='outlined'
        color='default'
        onClick={() => handleOpenEditModal()}
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
          <PageHeader
            title='Client API Interface'
            subTitle='Add new API requests or edit and test existing calls'
            icon={<TelegramIcon fontSize='large' />}
          />
        </div>

        <HelixTable
          displayCreateIcon={displayCreateUserIcon}
          initialOrderBy={initialOrderBy}
          columns={columns}
          rows={companyData}
          customCellRender={customCellRender}
          customHeadColumnKeyProp={customHeadColumnKeyProp}
          customBodyRowKeyProp={customBodyRowKeyProp}
        />
      </div>
      <EditCustomApiRequestDialog
        open={openEditModal}
        onClose={handleCloseEditModal}
        data={requestData}
        loading={loading}
        onUpdate={handleEditRow}
        onCreate={handleCreateRow}
        modalAction={modalAction}
      />
      <PerformTestDialog
        open={openTestRequestModal}
        onClose={() => setOpenTestRequestModal(false)}
        requestData={requestData}
        companyId={companyId}
      ></PerformTestDialog>
    </StylesProvider>
  );
};

//loading, onUpdate, onCreate, modalAction

export default withRouter(ApiTable);
