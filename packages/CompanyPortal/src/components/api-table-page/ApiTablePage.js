import React, {useState, PropTypes} from 'react';
import { makeStyles, Grid } from '@material-ui/core';

import ApiTable from '../api-table/ApiTable'
import PageHeader from '../../layout/PageHeader';
import TelegramIcon from '@material-ui/icons/Telegram';

import { HelixButton } from 'helixmonorepo-lib';

import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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

export default function ControlledAccordions(props) {
  const customApiPageClasses = useCustomApiPageStyles();


  // const handleChange = (panel) => (event, isExpanded) => {
  //   setExpanded(isExpanded ? panel : false);
  // };

const {expanded, toggle} = props

  // TODO: Conditionally renders the ApiTable Component on click
  const renderEntitiesApiTableButton = () => {
      return (
          <>
          {expanded ? <ApiTable/> : ""}
              <HelixButton 
              className={customApiPageClasses.showEntitiesButton}
              color="primary" 
              variant="contained" 
              type="submit" 
              size="large"
              onClick = {toggle}
              aria-expanded = {expanded}
              endIcon={<ExpandMoreIcon />} // Need conditional that renders ExpandLessIcon based on state
              text="Entities Custom API Table" />
              {/* <ApiTable/> */}
          </>
      )
  }

  // TODO: Conditionally renders the ApiTable Component on click
  const renderLoansApiTableButton = () => {
      return (
          <>
              <HelixButton
              className={customApiPageClasses.showLoansButton}
              color="secondary" 
              variant="contained" 
              type="submit" 
              size="large"
              // onClick={() => {handleOpen();}}
              endIcon={<ExpandMoreIcon />} // Need conditional that renders ExpandLessIcon based on state
              text="Loans Custom API Table" />
          </>
      )
  }

  // function to handle table visibility?
  // const tableVisibilityControl = () => {
  //   const [showEntitiesApi, setShowEntitiesApi] = useState()
  // }
  
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

      {/* <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={customApiPageClasses.heading}>Entities Custom API</Typography>
          <Typography className={customApiPageClasses.secondaryHeading}>Click to expand and view Entities Custom API data table</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ApiTable/>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography className={customApiPageClasses.heading}>Loans Custom API</Typography>
          <Typography className={customApiPageClasses.secondaryHeading}>
            Click to expand and view Loans Custom API data table
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ApiTable/>
        </AccordionDetails>
      </Accordion> */}
    </div>
  );
}
