import React from 'react'
import { makeStyles, Typography, Card, CardActions, CardContent, Grid, InputAdornment } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import SaveIcon from '@material-ui/icons/Save'
import CancelIcon from '@material-ui/icons/Cancel'

import { HelixTextField, HelixButton } from 'helixmonorepo-lib'

import MappedKeyTransferList from './MappedKeyTransferList';

const performTestPageStyles = makeStyles(() => ({
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
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
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
        <div>
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
              text="Perform Test" />
        </div>
        
        
      )
    }

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

    const renderButtonActions = () => {
      return (
          <>
              <HelixButton 
              color="primary" 
              variant="contained" 
              type="submit" 
              size="medium"
              // onClick={handleSaveEntityConfiguration}
              startIcon={<SaveIcon />}
              text="Save" />
              <HelixButton
              color="default"
              variant="contained"
              type="cancel"
              size="medium"
              href="/entity"
              startIcon={<CancelIcon />}
              text="Cancel" />
          </>
      )
  }

  return (
    <div> 
     <Grid container>
      <Grid item xs='12'>{renderTestingActions()}</Grid>
      <Grid item xs='6'>{renderExternalSourceData()}</Grid>
      <Grid item xs='6'>{renderMappedResponseData()}</Grid>
      <Grid item xs='12'><MappedKeyTransferList/></Grid>
      <Grid item xs='12' className={performTestPageClasses.buttonStyle}>
          {renderButtonActions()}
        </Grid>
      </Grid>
    </div>
  

  )
}
