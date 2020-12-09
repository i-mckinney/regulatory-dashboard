import React from 'react'
import { makeStyles, Typography, Grid, Dialog, DialogTitle, DialogContent } from '@material-ui/core'
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
      <Grid 
      container
      direction='column'
      justify='center'
      alignItems='center'
      >
        <Grid item md={12}>
          <HelixButton
          color='primary'
          size='large'
          variant='contained'
          text='Add'
          style={{width: '8em'}}
          onClick={() => {setOpenDialog(false)}}/>
          <HelixButton
          color='secondary'
          size='large'
          variant='contained'
          text='Cancel'
          style={{width: '8em'}}
          onClick={() => {setOpenDialog(false)}}/>
        </Grid>
      </Grid>
    </Dialog>
  )
}

export default FormDialog
