import React, { useState, useEffect, useMemo } from 'react';
import { withRouter } from 'react-router-dom';
import {
  StylesProvider,
  makeStyles,
  Typography,
  TableCell,
  Dialog,
  TextField,
  Button,
  DialogTitle,
  CircularProgress,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { HelixTable } from 'helixmonorepo-lib';
import { sortableExcludes, columnExcludes, columnLabels } from '../../config';
import PerformTestModalDialog from '../../components/PerformTestModalDialog';
import ApiCallForm from './ApiCallForm';


import { Button as MuiButton } from '@material-ui/core';
import axios from 'axios';

const MODAL_ACTION_CREATE = 'MODAL_ACTION_CREATE';
const MODAL_ACTION_UPDATE = 'MODAL_ACTION_UPDATE';

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

const EditDialog = ({
  open,
  onClose,
  data,
  loading,
  onUpdate,
  onCreate,
  modalAction,
}) => {
  const [requestName, setRequestName] = useState(data.requestName);
  const [requestMethod, setRequestMethod] = useState(data.requestMethod);
  const [requestURL, setrequestURL] = useState(data.requestURL);
  let handleClick, title, buttonText;

  if (modalAction === MODAL_ACTION_CREATE) {
    handleClick = onCreate;
    title = 'Create row';
    buttonText = 'ADD';
  } else if (modalAction === MODAL_ACTION_UPDATE) {
    handleClick = onUpdate;
    title = 'Update row';
    buttonText = 'Save';
  }

  useEffect(() => {
    setRequestName(data.requestName);
    setRequestMethod(data.requestMethod);
    setrequestURL(data.requestURL);
  }, [data]);

  return (
    <Dialog onClose={onClose} aria-labelledby='simple-dialog-title' open={open}>
      <DialogTitle id='simple-dialog-title'>{title}</DialogTitle>
      <TextField
        label='Request Name'
        value={requestName}
        onChange={(e) => setRequestName(e.target.value)}
      />
      <TextField
        label='Request Method'
        value={requestMethod}
        onChange={(e) => setRequestMethod(e.target.value)}
      />
      <TextField
        label='Request URL'
        value={requestURL}
        onChange={(e) => setrequestURL(e.target.value)}
      />
      <Button
        variant='contained'
        disabled={loading}
        onClick={() =>
          handleClick({ ...data, requestName, requestMethod, requestURL })
        }
      >
        {buttonText}
        {` `}
        {loading ? <CircularProgress /> : null}
      </Button>
    </Dialog>
  );
};

/**
 * @param {Object} props Using the history location to route next component with data state
 * @return {JSX} ApiTable of the client's custom APIs
 * routed at /
 */
const ApiTable = (props) => {
  // Creates an object for styling. Any className that matches key in the userTableStyles object will have a corresponding styling
  const userTableClasses = userTableStyles();

  const [openModal, setOpenModal] = useState(false);

  const [companyData, setCompanyData] = useState({});

  const [openEditModal, setOpenEditModal] = React.useState(false);

  const [editModalData, setEditModalData] = useState({});

  const [modalAction, setModalAction] = useState(MODAL_ACTION_CREATE);

  const [loading, setLoading] = useState(false);

  const handleOpenEditModal = (_id) => {
    if (!!_id) {
      setModalAction(MODAL_ACTION_UPDATE);
      setEditModalData({
        ...companyData.CustomApiRequests.find((item) => item._id === _id),
      });
    } else {
      setModalAction(MODAL_ACTION_CREATE);
      setEditModalData({
        _id: new Date().getTime(),
        requestName: '',
        requestMethod: '',
        requestURL: '',
      });
    }
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setEditModalData({});
  };

  // columns will store column header that we want to show in the front end
  const columns = [];

  const rows = companyData.CustomApiRequests || [];

  if (rows.length !== 0) {
    const headerColumns = Object.keys(rows[0]);
    headerColumns.forEach((key, index) => {
      if (!columnExcludes.includes(key)) {
        console.log('keys', key);
        columns.push({
          Label: columnLabels[index],
          Accessor: key,
          Sortable: sortableExcludes.includes(key) ? false : true,
        });
      }
    });
    columns.push({
      Label: 'Actions',
      Accessor: 'Actions',
      Sortable: false,
    });
  }

  /**
   * @param {object} api represent object of api with particular props
   * @param {string} accessor represents the accessor which api with accessor can access the property value
   */
  const isoToDate = (api, accessor) => {
    const strDate = api[accessor];
    api[accessor] = strDate.substring(0, 10);
  };

  console.log('companyData:', companyData);

  const handleCreateRow = async (newRow) => {
    setLoading(true);
    const response = await axios.put(
      `http://localhost:4005/companies/${companyData._id}`,
      {
        CustomApiRequests: [...rows, newRow],
      },
      {
        headers: { 'Access-Control-Allow-Origin': '*' },
      }
    );
    setCompanyData(response.data);
    setLoading(false);
    handleCloseEditModal();
  };

  const handleEditRow = async (updatedRow) => {
    setLoading(true);
    const response = await axios.put(
      `http://localhost:4005/companies/${companyData._id}`,
      {
        CustomApiRequests: rows.map((row) =>
          row._id === updatedRow._id ? updatedRow : row
        ),
      },
      {
        headers: { 'Access-Control-Allow-Origin': '*' },
      }
    );
    setCompanyData(response.data);
    setLoading(false);
    handleCloseEditModal();
  };

  const handleDeleteRow = async (_id) => {
    const response = await axios.put(
      `http://localhost:4005/companies/${companyData._id}`,
      {
        CustomApiRequests: rows.filter((row) => row._id !== _id),
      },
      {
        headers: { 'Access-Control-Allow-Origin': '*' },
      }
    );
    setCompanyData(response.data);
  };

  /**
   * Renders only when it is mounted at first
   * It will fetchUsers whenever ApiTable loads
   */
  useEffect(() => {
    const fetchCompanies = () => {
      axios
        .get('http://localhost:4005/companies', {
          headers: { 'Access-Control-Allow-Origin': '*' },
        })
        .then((res) => {
          // console.log('res', res.data[0].CustomApiRequests);
          // setRows(res.data[0].CustomApiRequests);
          setCompanyData(res.data[0]);
        });
    };

    fetchCompanies();
  }, []);

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
              setOpenModal(true);
            }}
          >
            Perform Test
          </MuiButton>
          <IconButton
            aria-label='edit'
            size='small'
            edge='start'
            onClick={() => handleOpenEditModal(row._id)}
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
      <EditDialog
        open={openEditModal}
        onClose={handleCloseEditModal}
        data={editModalData}
        loading={loading}
        onUpdate={handleEditRow}
        onCreate={handleCreateRow}
        modalAction={modalAction}
      />
      <PerformTestModalDialog
        title='Perform an API request test'
        openModal={openModal}
        setOpenModal={setOpenModal}
      >
        <ApiCallForm />
      </PerformTestModalDialog>
    </StylesProvider>
  );
};

//loading, onUpdate, onCreate, modalAction

export default withRouter(ApiTable);
