import React, {useState} from 'react'
import { withRouter } from 'react-router-dom'
import ReportTemplateInputForm from './ReportTemplateInputForm'
import { columnFields } from './config'
import ReportTemplateCreateMapping from './ReportTemplateCreateMapping'
import ReportTemplatePage from './ReportTemplatePage'
import {initialReportTemplate, initialRowData, initialColumnData} from './InitialReportTemplate'
import { makeStyles }  from '@material-ui/core'
import { HelixButton } from 'helixmonorepo-lib'
import axios from "axios";
import { BACKEND_ENTITIES_HOST } from "../../config";

// initialReportTemplate with preset data
// const initialReportTemplate = {}
// columnFields.forEach((columnField) => {
//     if (columnField === 'preference') {
//         const preference = { entities: false, loan: false, regulatory: false }
//         initialReportTemplate[[columnField]] = preference
//     } else {
//         initialReportTemplate[[columnField]] = ""
//     }
// })

/**
 * @param {Object} props Using the history property to route next component with data state
 * @return {JSX} ReportCreate site with ReportInputForm provided for report creation
 * routed at /reporttemplates/new
 */
const ReportCreate = (props) => {
    const [activeStep, setActiveStep] = useState(0)
    const [fields, setFields] = useState([])
    const [reportTemplate, setReportTemplate] = useState(initialReportTemplate)
    
    let postURL = `${BACKEND_ENTITIES_HOST}/reporttemplate/new`
    console.log('reportTemplate from root of page:', reportTemplate)
    /**
     * @param {object} reportTemplate represent entity object with props values that it will create 
     */
    const createReportTemplate = async (event) => {
      event.preventDefault()
      const payload = {...reportTemplate}
      const response = await axios.post(postURL, payload)
      if(response.data.status === 200){
          props.history.push('/reporttemplates')
      }
    }

    let body;
    switch (activeStep) {
        case 0:
            body = (
                <ReportTemplateInputForm
                 header= "Create Report Template" 
                activeStep = {activeStep}
                setActiveStep={setActiveStep} 
                setFields={setFields}
                reportTemplate={reportTemplate}
                setReportTemplate={setReportTemplate}
                />
            );
            break;
        case 1:
            body = (
                <ReportTemplatePage
                activeStep = {activeStep}
                setActiveStep={setActiveStep}
                reportTemplate={reportTemplate}
                setReportTemplate={setReportTemplate}
                fields={fields}
                />
            );
            break
        case 2: 
            body = (
                <ReportTemplateCreateMapping 
                fields={fields}
                setFields={setFields}
                activeStep = {activeStep}
                setActiveStep={setActiveStep}
                reportTemplate={reportTemplate}
                setReportTemplate={setReportTemplate}
                handleSubmit = {createReportTemplate}
                />
            );
            break;
            default:
                return;
    }

    return (
    <div>
      <form autoComplete="off" onSubmit={createReportTemplate}>
      {/* <form autoComplete="off" onSubmit={()=>console.log('hello')}> */}
        {body}
      </form>  
    </div>
    )
}

export default withRouter(ReportCreate)
