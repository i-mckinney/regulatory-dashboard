import React from 'react';
import DialogModalTemplate from '../DialogModalTemplate';
import { MODAL_ACTION_CREATE, MODAL_ACTION_UPDATE } from './constants';
import ApiTestUi from '../api-testing-ui/ApiTestUi';

const EditCustomApiRequestDialog = ({
  open,
  onClose,
  data,
  loading,
  onUpdate,
  onCreate,
  modalAction,
  collections
}) => {
  let handleClick, title;

  if (modalAction === MODAL_ACTION_CREATE) {
    handleClick = onCreate;
    title = 'Create a new API Request';
  } else if (modalAction === MODAL_ACTION_UPDATE) {
    handleClick = onUpdate;
    title = 'Update Existing API Request';
  }

  if (!open) {
    return null;
  }

  return (
    <DialogModalTemplate onClose={onClose} title={title} open={open}>
      <ApiTestUi data={data} onSave={handleClick} collections={collections}/>
    </DialogModalTemplate>
  );
};

export default EditCustomApiRequestDialog;
