import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {Container, Grid} from '@material-ui/core'
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import PageHeader from '../../Layout/PageHeader'
import ExistingReport from "./ExistingReport";
import EntitiesPreferences from "./EntitiesPreferences";
import LoansPreferences from "./LoansPreferences";

const useReportTemplatePageClasses = makeStyles((theme) => ({
  spacer: {
    height : 250
  },
}
));


const ReportTemplatePage = () => {
  const reportTemplatePageClasses = useReportTemplatePageClasses()
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
        <Grid item md={12}>
          <div className={reportTemplatePageClasses.spacer}></div>
        </Grid>
      </Grid>
      </Container>
    </>
  )
}

export default ReportTemplatePage
