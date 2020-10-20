import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { StylesProvider, makeStyles, TableCell } from '@material-ui/core';
import PageHeader from '../../layout/PageHeader';
import TelegramIcon from '@material-ui/icons/Telegram';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { HelixTable, HelixTableCell } from 'helixmonorepo-lib';
import { sortableExcludes, columnMetadata } from '../../config';
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
  },
  createIconStyle: {
    float: 'right',
    cursor: 'pointer',
    marginLeft: 'auto',
  },
  header: {
    paddingBottom: '2rem',
  },
  testButtonStyle: {
    color: '#00c200',
  },
}));

const BASE_URL = "http://localhost:5000"

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

  const customApiUrl = `${BASE_URL}/companies/${companyId}/customapi`;

  const getTestUrl = (requestId) => `${customApiUrl}/${requestId}/test`

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
    setLoading(true);
    try {
      const response = await axios.post(
        customApiUrl,
        newRow,
        {
          headers: { 'Access-Control-Allow-Origin': '*' },
        }
      );
      setCompanyData([ ...companyData, { ...newRow, _id: response.data._id }]);
    } catch(e) {
      console.error(e)
    }



    setLoading(false);
    handleCloseEditModal();
  };

  const handleEditRow = async (updatedRow) => {
    setLoading(true);
    const response = await axios.put(
      `http://localhost:5000/companies/${companyId}`,
      {
        CustomApiRequests: companyData.map((row) =>
          row._id === updatedRow._id ? updatedRow : row
        ),
      },
      {
        headers: { 'Access-Control-Allow-Origin': '*' },
      }
    );
    setCompanyData(response.data.CustomApiRequests);
    setLoading(false);
    handleCloseEditModal();
  };

  const handleDeleteRow = async (_id) => {
    try {
      await axios.delete(
        `${customApiUrl}/_id`,
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
   * @param {object} row the row is an object of data
   * @param {object} column the column is an object of the header with accessor and label props
   * @param {int} rowIndex the rowIndex represents index of the row
   * @param {int} columnIndex the columnIndex represents index of the column
   * @return {JSX} HelixTableCell of object properties in that Table row
   */
  const customCellRender = (row, column, rowIndex, columnIndex) => {
    const columnAccessor = column.Accessor;
    const displayActions = () => (
      <>
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
      </>
    )
    if (columnAccessor === 'Actions') {
      return (
        <HelixTableCell 
        key={`Row-${rowIndex} ${columnAccessor}-${columnIndex}`} 
        containActions={true} 
        displayActions={displayActions} />
      );
    }
    else {
      return (
      <HelixTableCell 
      key={`Row-${rowIndex} ${columnAccessor}-${columnIndex}`} 
      value={row[columnAccessor]} />
      );
    }
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
          toggleSearch={true}
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
        getTestUrl={getTestUrl}
      ></PerformTestDialog>
    </StylesProvider>
  );
};

//loading, onUpdate, onCreate, modalAction

export default withRouter(ApiTable);
