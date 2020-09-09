import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  makeStyles,
  Typography,
} from '@material-ui/core';
import Controls from './controls/Controls';
import CloseIcon from '@material-ui/icons/Close';

const useModalDialogStyles = makeStyles((theme) => ({
  dialogWrapper: {
    padding: theme.spacing(2),
    position: 'absolute',
    top: theme.spacing(5),
  },
  dialogTitle: {
    paddingRight: '0px',
  },
}));

export default function ModalDialog(props) {
  const { title, children, openPopup, setOpenPopup } = props;
  const modalDialogClasses = useModalDialogStyles();

  return (
    <Dialog
      open={openPopup}
      maxWidth='md'
      modalDialogClasses={{ paper: modalDialogClasses.dialogWrapper }}
    >
      <DialogTitle className={modalDialogClasses.dialogTitle}>
        <div style={{ display: 'flex' }}>
          <Typography variant='h6' component='div' style={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <Controls.ActionButton
            color='secondary'
            onClick={() => {
              setOpenPopup(false);
            }}
          >
            <CloseIcon />
          </Controls.ActionButton>
        </div>
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
    </Dialog>
  );
}
