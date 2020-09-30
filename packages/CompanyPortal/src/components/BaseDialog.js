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

/**
 * @return {JSX} returns a reusable Modal Dialog component
 */
export default function BaseDialog(props) {
  /** 
   title: the title displayed at the top of the modal
   children: stores any children components rendered inside the material ui Popup component
   openModal: state variable 
   setOpenModal: set function
  */
  const { title, children, open, onClose } = props;
  const modalDialogClasses = useModalDialogStyles();

  return (
    <Dialog
      open={open}
      maxWidth='md'
      className={modalDialogClasses.dialogWrapper}
      onClose={onClose}
    >
      <DialogTitle className={modalDialogClasses.dialogTitle}>
        <div style={{ display: 'flex' }}>
          <Typography variant='h6' component='div' style={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <Controls.ActionButton color='secondary' onClick={onClose}>
            <CloseIcon />
          </Controls.ActionButton>
        </div>
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
    </Dialog>
  );
}
