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
  },
  nextButton: {
    backgroundColor: "#1976d2",
    color: "white",
    "&:hover": {
      backgroundColor: "#1565c0",
      color: "white",
    }, 
  },
  cancelButton: {
    backgroundColor: "#F50057",
    color: "white",
    "&:hover": {
        backgroundColor: "#DF0350",
        color: "white",
    },
  },
  backButton: {
    backgroundColor: "#42a5f5",
    color: "white",
    "&:hover": {
      backgroundColor: "#2196f3",
      color: "white",
    },
  },
}));


const ReportTemplatePage = ({ activeStep, setActiveStep, reportTemplate, setReportTemplate, fields }) => {
  const reportTemplatePageClasses = useReportTemplatePageClasses()

  const handleBackButton = () => {
    let nextStep = activeStep -1;
    setActiveStep(nextStep)
  }

  const handleNextButton = () => {
    generateMappingObjects()
    let nextStep = activeStep+1
    setActiveStep(nextStep)
}

const generateInitialKeyiValues = () => {
  const extractedKeys = fields.map((fieldRow)=>(fieldRow.fieldKey))
  const initialKeyValues = extractedKeys.map((key)=> ( {[key]: ''} ))
  return initialKeyValues
}

const generateMappingObjects = () =>{
  const ReportMappingKeyValues = reportTemplate.selectedReportApiRequests.length !== 0 ? 
    reportTemplate.selectedReportApiRequests.reduce((a,b)=>(a[b]=generateInitialKeyiValues(),a),{}) : {}
  const EntityMappingKeyValues = reportTemplate.selectedEntityApiRequests.length !== 0 ?
    reportTemplate.selectedEntityApiRequests.reduce((a,b)=>(a[b]=generateInitialKeyiValues(),a),{}) : {}
  const LoanMappingKeyValues = reportTemplate.selectedLoanApiRequests.length !== 0 ? 
    reportTemplate.selectedLoanApiRequests.reduce((a,b)=>(a[b]=generateInitialKeyiValues(),a),{}) : {}

  setReportTemplate({ 
    ...reportTemplate, 
    responseMappedLoans: LoanMappingKeyValues,
    responseMappedEntity: EntityMappingKeyValues,
    responseMappedReport: ReportMappingKeyValues,
  })
}

const noApisSelected = ()=>{
  return (reportTemplate.selectedReportApiRequests.length + 
  reportTemplate.selectedEntityApiRequests.length +reportTemplate.selectedLoanApiRequests.length === 0 ? true : false)
}

  return (
    <>
    <Container>
      <PageHeader
        title='Create Report Template'
        icon={<LibraryBooksIcon fontSize='large' />}
      />
      <Grid container spacing={2}>
        <Grid item md={12}>
          <ExistingReport reportTemplate={reportTemplate} setReportTemplate= {setReportTemplate}/>
        </Grid>
        <Grid item md={12}>
          <h2>Select Report Template Preferences</h2>
          <EntitiesPreferences reportTemplate={reportTemplate} setReportTemplate= {setReportTemplate}/>
        </Grid>
        <Grid item md={12}>
          <LoansPreferences reportTemplate={reportTemplate} setReportTemplate= {setReportTemplate}/>
        </Grid>
        <Grid item xs={12}>
        <Grid container direction='row' justify='center' alignItems='flex-end' spacing={2}>
          <Grid item> 
            <MuiButton className={reportTemplatePageClasses.backButton}  variant='contained' size='medium' onClick={handleBackButton}
            >Back
            </MuiButton>
          </Grid>
          <Grid item>   
            <MuiButton 
            className={reportTemplatePageClasses.nextButton} 
            variant='contained' 
            size='medium'
           onClick={handleNextButton}
           disabled = {noApisSelected()}
            >Next
            </MuiButton>
          </Grid>
          <Grid item>   
            <MuiButton className={reportTemplatePageClasses.cancelButton} variant='contained' size='medium'  href="/reporttemplates" type="cancel"
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
      {/* {console.log('report template from step 2:', reportTemplate)} */}
    </>
  )
}

export default ReportTemplatePage
