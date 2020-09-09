import React, { useState } from 'react';
import ApiCallForm from './ApiCallForm';
import PageHeader from '../../components/PageHeader';
import TelegramIcon from '@material-ui/icons/Telegram';
import {
  Paper,
  makeStyles,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
  InputAdornment,
} from '@material-ui/core';
import useTable from '../../components/useTable';
import * as apiCallService from '../../services/apiCallService';
import Controls from '../../components/controls/Controls';
import { Search } from '@material-ui/icons';
import AddIcon from '@material-ui/icons/Add';
import ModalDialog from '../../components/ModalDialog';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';

const useClientApiPageStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  searchInput: {
    width: '75%',
  },
  addButton: {
    position: 'absolute',
    right: '10px',
  },
}));

const headCells = [
  { id: 'apiMethod', label: 'METHOD' },
  { id: 'requestName', label: 'Request Name' },
  { id: 'requestUrl', label: 'Request URL' },
  { id: 'requestDescription', label: 'Description' },
  { id: 'actions', label: 'Actions', disableSorting: true },
];

/**
 * @return {JSX} returns the Client API Page
 */
export default function ClientApiPage() {
  const useClientApiPageClasses = useClientApiPageStyles();
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [records, setRecords] = useState(apiCallService.getAllApiCalls());
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  
  const [openModal, setOpenModal] = useState(false);

  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting,
  } = useTable(records, headCells, filterFn);

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value === '') return items;
        else
          return items.filter((x) =>
            x.requestDescription.toLowerCase().includes(target.value)
          );
      },
    });
  };

  const addOrEdit = (apiCall, resetForm) => {
    if (apiCall.id === 0) apiCallService.addNewApiCall(apiCall);
    else apiCallService.updateApiCall(apiCall);
    resetForm();
    setRecordForEdit(null);
    setOpenModal(false);
    setRecords(apiCallService.getAllApiCalls());
  };

  const openInPopup = (item) => {
    setRecordForEdit(item);
    setOpenModal(true);
  };

  return (
    <React.Fragment>
      <Paper className={useClientApiPageClasses.pageContent}>
        <PageHeader
          title='Client API Page'
          subTitle='Add new and edit existing API call requests'
          icon={<TelegramIcon fontSize='large' />}
        />
        <Toolbar>
          <Controls.Input
            label='Search API call list'
            className={useClientApiPageClasses.searchInput}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <Search />
                </InputAdornment>
              ),
            }}
            onChange={handleSearch}
          />
          <Controls.Button
            text='Add New'
            variant='outlined'
            startIcon={<AddIcon />}
            className={useClientApiPageClasses.addButton}
            onClick={() => {
              setOpenModal(true);
              setRecordForEdit(null);
            }}
          />
        </Toolbar>
        <TblContainer>
          <TblHead />
          <TableBody>
            {recordsAfterPagingAndSorting().map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.requestDescription}</TableCell>
                <TableCell>{item.requestName}</TableCell>
                <TableCell>{item.requestUrl}</TableCell>
                <TableCell>{item.apiMethod}</TableCell>
                <TableCell>
                  <Controls.ActionButton
                    color='primary'
                    onClick={() => {
                      openInPopup(item);
                    }}
                  >
                    <EditOutlinedIcon fontSize='small' />
                  </Controls.ActionButton>
                  <Controls.ActionButton color='secondary'>
                    <CloseIcon fontSize='small' />
                  </Controls.ActionButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TblContainer>
        <TblPagination />
      </Paper>
      <ModalDialog
        title='Client API Form'
        openModal={openModal}
        setOpenModal={setOpenModal}
      >
        <ApiCallForm recordForEdit={recordForEdit} addOrEdit={addOrEdit} />
      </ModalDialog>
    </React.Fragment>
  );
}