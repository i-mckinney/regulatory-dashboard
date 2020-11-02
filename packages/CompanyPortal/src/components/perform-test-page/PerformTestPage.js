import React from 'react'
import { makeStyles, Typography, Card, CardActions, CardContent, Grid, InputAdornment } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import SaveIcon from '@material-ui/icons/Save'
import CancelIcon from '@material-ui/icons/Cancel'

import { HelixTextField, HelixButton } from 'helixmonorepo-lib'

import MappedKeyTransferList from './MappedKeyTransferList';

const performTestPageStyles = makeStyles(() => ({
    root:{
      marginTop: "100px",
      marginLeft: '100px',
      marginRight: '100px',

    },
    responseContainer: {
      paddingTop: '100px',
    
    },
    buttonStyle: {
      '& button': {
          marginTop: '16px',
          marginRight: '16px',
      },
      '& a': {
          marginTop: '16px',
          marginRight: '16px',
      }
    },
    cardStyle: {
      root: {
    minWidth: 275,
  },
    }
  }))
 
 
export default function PerformTestPage() {
  const performTestPageClasses = performTestPageStyles()
  
  /**
   * @return {jsx} return a HelixTextField and HelixButton for capturing id 
   */
    const renderTestingActions = () => {
      return (
        <div  >
        <HelixTextField
        label="Borrower ID"
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <SearchIcon />
            </InputAdornment>
          )
        }}
        />
          <HelixButton 
              color="secondary"
              variant="contained" 
              type="submit" 
              size="large"
              text="Perform Test"
              style={{marginLeft: '2em'}}
               />
              
        </div>
        
        
      )
    }

  /**
   * @return {jsx} returns UI card for displaying response data
   */
    const renderExternalSourceData = () => {
      return (
    <Card>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          External Source Data:
        </Typography>
        <Typography variant="body2" component="p">
          Source data object here
        </Typography>
      </CardContent>
    </Card>
  );
    }

  /**
   * @return {jsx} returns UI cards for displaying response data
   */
     const renderMappedResponseData = () => {
       return (
    <Card>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          Mapped Response:
        </Typography>
        <Typography variant="body2" component="p">
          Mapped response object here
        </Typography>
      </CardContent>
    </Card>
  );   
    }

  /**
   * @return {jsx} returns HelixButton component for save and cancel actions
   */
    const renderButtonActions = () => {
      return (
          <>
              <HelixButton 
              color="primary" 
              variant="contained" 
              type="submit" 
              size="large"
              href="/api-table"

              // onClick={handleSaveEntityConfiguration}
              startIcon={<SaveIcon />}
              text="Save" />
              <HelixButton
              color="default"
              variant="contained"
              type="cancel"
              size="large"
              href="/api-table"
              startIcon={<CancelIcon />}
              text="Cancel" />
          </>
      )
  }

  return (
    <div className={performTestPageClasses.root}> 
     <Grid container spacing={6}>
      <Grid item xs='12'>{renderTestingActions()}</Grid>
        <Grid item xs='6' className={performTestPageClasses.responseContainer}>{renderExternalSourceData()}</Grid>
        <Grid item xs='6'className={performTestPageClasses.responseContainer}>{renderMappedResponseData()}</Grid>
        <Grid item xs='12'><MappedKeyTransferList/></Grid>
        <Grid item xs='12' className={performTestPageClasses.buttonStyle} style={{textAlign: 'center'}}>
          {renderButtonActions()}
      </Grid>
     </Grid>
    </div>
  

  )
}
