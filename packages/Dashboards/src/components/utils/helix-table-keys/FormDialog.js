import React, { useState } from 'react'
import { makeStyles, Container, Typography, Grid, Dialog, DialogTitle, DialogContent } from '@material-ui/core'
import { HelixButton, HelixTextField } from 'helixmonorepo-lib'

const useFormDialogStyles = makeStyles(theme =>({
  dialogWrapper: {
    padding: theme.spacing(6)
  },
  dialogTitle: {
  }
}))

const FormDialog = (props) => {
  const formDialogClasses = useFormDialogStyles()
  const {title, children, openDialog, setOpenDialog} = props

  return (
    <Dialog open={openDialog} classes={{ paper : formDialogClasses.dialogWrapper}}>
      <DialogTitle className={formDialogClasses.dialogTitle}>
        <div>
          <Typography variant='h6' component='div'>
            {title}
          </Typography>
        </div>
      </DialogTitle>
      <DialogContent dividers>
        {children}
      </DialogContent>
    </Dialog>
  )
}

export default FormDialog
