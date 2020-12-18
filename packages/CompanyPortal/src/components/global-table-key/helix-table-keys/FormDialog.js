import React from 'react'
import { makeStyles, Typography, Dialog, DialogTitle, DialogContent } from '@material-ui/core'

const useFormDialogStyles = makeStyles(theme =>({
  dialogWrapper: {
    padding: theme.spacing(6)
  },
  dialogTitle: {
  }
}))

const FormDialog = (props) => {
  const formDialogClasses = useFormDialogStyles()
  const {title, children, openDialog} = props

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
