import React from 'react'
import { makeStyles, Container, Grid } from '@material-ui/core'
import { HelixButton, HelixTextField } from 'helixmonorepo-lib'

const useNewKeyFormStyles = makeStyles(theme => ({
  addButton: {
    
  },
  cancelButton: {

  }
}))

const NewKeyForm = (props) => {
  const newKeyFormClasses = useNewKeyFormStyles()

  return (
    <Container>
      <Grid container 
      spacing={4}
      justify='center'
      alignItems='center'
      direction='column'>
        <Grid item md={12}>
          <HelixTextField
          name = 'newKey'
          label = 'Add Key'
          fullWidth
          style={{}}
          />
        </Grid>
      </Grid>
    </Container>
  )
}

export default NewKeyForm
