import React, { useState, useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core';
import DialogModalTemplate from '../DialogModalTemplate';
import { MODAL_ACTION_CREATE, MODAL_ACTION_UPDATE } from './constants';

const useStyles = makeStyles((theme) => ({
  fieldContainer: {
    display: 'flex',
    flexDirection: 'column',
    '& div': {
      marginBottom: '5px',
      marginTop: '5px',
      marginLeft: '25px',
      marginRight: '25px',
    },
  },
}));

const EditCustomApiRequestDialog = ({
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
  const [requestUrl, setRequestURL] = useState(data.requestUrl);
  let handleClick, title, buttonText;

  if (modalAction === MODAL_ACTION_CREATE) {
    handleClick = onCreate;
    title = 'Create a new API Request';
    buttonText = 'ADD';
  } else if (modalAction === MODAL_ACTION_UPDATE) {
    handleClick = onUpdate;
    title = 'Update Existing API Request';
    buttonText = 'Save';
  }

  useEffect(() => {
    setRequestName(data.requestName);
    setRequestMethod(data.requestMethod);
    setRequestURL(data.requestUrl);
  }, [data]);

  if (!open) {
    return null;
  }

  return (
    <DialogModalTemplate onClose={onClose} title={title} open={open}>
      <div className={classes.fieldContainer}>
        <TextField
          variant='outlined'
          label='Request Name'
          value={requestName}
          onChange={(e) => setRequestName(e.target.value)}
        />
        <TextField
          variant='outlined'
          label='Request Method'
          value={requestMethod}
          onChange={(e) => setRequestMethod(e.target.value)}
        />
        <TextField
          variant='outlined'
          label='Request URL'
          value={requestUrl}
          onChange={(e) => setRequestURL(e.target.value)}
        />
        <Button
          variant='contained'
          disabled={loading}
          onClick={() =>
            handleClick({ ...data, requestName, requestMethod, requestUrl })
          }
        >
          {buttonText}
          {` `}
          {loading ? <CircularProgress /> : null}
        </Button>
      </div>
    </DialogModalTemplate>
  );
};

export default EditCustomApiRequestDialog;
