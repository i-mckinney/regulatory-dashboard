import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {Container, Grid, Button as MuiButton} from '@material-ui/core'
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import PageHeader from '../../Layout/PageHeader'
import ExistingReport from "./ExistingReport";
import EntitiesPreferences from "./EntitiesPreferences";
import LoansPreferences from "./LoansPreferences";

const useReportTemplatePageClasses = makeStyles((theme) => ({
  spacer: {
    height : 250
  },
  buttonSize:{
    width: 150,
    marginTop: 100
  }
}
));


const ReportTemplatePage = ({ activeStep, setActiveStep }) => {
  const reportTemplatePageClasses = useReportTemplatePageClasses()

  const handleBackButton = () => {
    let nextStep = activeStep -1;
    setActiveStep(nextStep)
  }

  const handleNextButton = () => {
    let nextStep = activeStep+1
    setActiveStep(nextStep)
}

  return (
    <>
    <Container>
      <PageHeader
        title='Create CCAR Report Template'
        icon={<LibraryBooksIcon fontSize='large' />}
      />
      <Grid container spacing={2}>
        <Grid item md={12}>
          <ExistingReport/>
        </Grid>
        <Grid item md={12}>
          <h2>Select Report Template Preferences</h2>
          <EntitiesPreferences/>
        </Grid>
        <Grid item md={12}>
          <LoansPreferences/>
        </Grid>
        <Grid item xs={12}>
        <Grid container direction='row' justify='center' alignItems='flex-end' spacing={2}>
          <Grid item> 
            <MuiButton className={reportTemplatePageClasses.buttonSize} color='primary' variant='contained' size='large' onClick={handleBackButton}
            >Back
            </MuiButton>
          </Grid>
          <Grid item>   
            <MuiButton className={reportTemplatePageClasses.buttonSize} color='default' variant='contained' size='large' onClick={handleNextButton}
            >Next
            </MuiButton>
          </Grid>
          <Grid item>   
            <MuiButton className={reportTemplatePageClasses.buttonSize} color='secondary' variant='contained' size='large'  href="/reporttemplates" type="cancel"
            >Cancel
            </MuiButton>
          </Grid>
     </Grid>
    </Grid>
        <Grid item md={12}>
          <div className={reportTemplatePageClasses.spacer}></div>
        </Grid>
      </Grid>
      </Container>
    </>
  )
}

export default ReportTemplatePage
