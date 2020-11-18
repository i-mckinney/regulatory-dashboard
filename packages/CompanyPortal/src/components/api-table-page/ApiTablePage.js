import React, {useState} from 'react';
import { makeStyles, Grid } from '@material-ui/core';

import ApiTable from '../api-table/ApiTable'
import LoansApiTable from './api-table-loans/LoansApiTable';
import PageHeader from '../../layout/PageHeader';
import TelegramIcon from '@material-ui/icons/Telegram';

import { HelixButton } from 'helixmonorepo-lib';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// CONTAINER PAGE FOR ALL CUSTOM API TABLES

const useCustomApiPageStyles = makeStyles(() => ({
  root: {
    paddingRight: '100px',
    paddingLeft: '100px'
  },
  showEntitiesButton: {
    width: '290px'
  },
  showLoansButton: {
    width: '290px'
  },
}));

export default function CustomApiPage(props) {
  const customApiPageClasses = useCustomApiPageStyles();
  // displayEntitiesApiTable and setDisplayEntitiesApiTable used to conditionally render the Entities API table on click
  const [displayEntitiesApiTable, setDisplayEntitiesApiTable] = useState(false)
  // displayLoansApiTable and setDisplayLoansApiTable used to conditionally render the Entities API table on click
  const [displayLoansApiTable, setDisplayLoansApiTable] = useState(false)

  /**
   * @return {jsx} returns a HelixButton with an onClick event to toggle any custom api table rendering
   */
  const renderEntitiesApiTableButton = () => {
      return (
          <>
              <HelixButton 
              className={customApiPageClasses.showEntitiesButton}
              color="primary" 
              variant="contained" 
              type="submit" 
              size="large"
              onClick = {()=>{setDisplayEntitiesApiTable(!displayEntitiesApiTable)}}
              endIcon={<ExpandMoreIcon />} // Need conditional that renders ExpandLessIcon based on state
              text="Entities Custom API Table" />
              {displayEntitiesApiTable && <ApiTable/>}
          </>
      )
  }

  /**
   * @return {jsx} returns a HelixButton with an onClick event to toggle any custom api table rendering
   */
  const renderLoansApiTableButton = () => {
      return (
          <>
              <HelixButton
              className={customApiPageClasses.showLoansButton}
              color="secondary" 
              variant="contained" 
              type="submit" 
              size="large"
              onClick = {()=>{setDisplayLoansApiTable(!displayLoansApiTable)}}
              endIcon={<ExpandMoreIcon />} // Need conditional that renders ExpandLessIcon based on state
              text="Loans Custom API Table" />
              {displayLoansApiTable && <LoansApiTable/>}
          </>
      )
  }
  
  return (
    <div className={customApiPageClasses.root}>
     <PageHeader
            title="Client API Interface"
            subTitle="Add new API requests or edit and test existing calls"
            icon={<TelegramIcon fontSize="large" />}
          />
         <Grid container spacing={6}>
          <Grid item xs='12'>{renderEntitiesApiTableButton()}</Grid>
          <Grid item xs='12'>{renderLoansApiTableButton()}</Grid>
         </Grid>
    </div>
  );
}
