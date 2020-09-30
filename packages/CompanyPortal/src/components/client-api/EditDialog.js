import React, { useState, useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core';
import BaseDialog from '../BaseDialog';
import { MODAL_ACTION_CREATE, MODAL_ACTION_UPDATE } from './constants';

const useStyles = makeStyles((theme) => ({
  fieldContainer: {
    display: 'flex',
    flexDirection: 'column',
    '& div': {
      marginBottom: '5px',
    },
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
  const classes = useStyles();
  const [requestName, setRequestName] = useState(data.requestName);
  const [requestMethod, setRequestMethod] = useState(data.requestMethod);
  const [requestURL, setrequestURL] = useState(data.requestUrl);
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
    setrequestURL(data.requestUrl);
  }, [data]);

  if (!open) {
    return null;
  }

  return (
    <BaseDialog onClose={onClose} title={title} open={open}>
      <div className={classes.fieldContainer}>
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
      </div>
    </BaseDialog>
  );
};

export default EditDialog;
