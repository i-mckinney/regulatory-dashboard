import React, {useState} from 'react'
import { withRouter } from 'react-router-dom'
import ReportTemplateInputForm from './ReportTemplateInputForm'
import { columnFields } from './config'
import ReportTemplateCreateMapping from './ReportTemplateCreateMapping'
import ReportTemplatePage from './ReportTemplatePage'

// initialReportTemplate with preset data
const initialReportTemplate = {}
columnFields.forEach((columnField) => {
    if (columnField === 'preference') {
        const preference = { entities: false, loan: false, regulatory: false }
        initialReportTemplate[[columnField]] = preference
    } else {
        initialReportTemplate[[columnField]] = ""
    }
})

/**
 * @param {Object} props Using the history property to route next component with data state
 * @return {JSX} ReportCreate site with ReportInputForm provided for report creation
 * routed at /report/new
 */
const ReportCreate = (props) => {
    const [activeStep, setActiveStep] = useState(0)
    const [fields, setFields] = useState([])
    /**
     * @param {object} reportTemplate represent entity object with props values that it will create 
     */
    const createReportTemplate = async (reportTemplate) => {
        console.log('props.history:', props.history)
        props.history.push("/reporttemplates")
    }
    let body;
    switch (activeStep) {
        case 0:
            body = (
                <ReportTemplateInputForm
                 header= "Create Report Template" 
                initialReportTemplate={initialReportTemplate}
                onSubmit={createReportTemplate} 
                activeStep = {activeStep}
                setActiveStep={setActiveStep} 
                setFields={setFields}
                />
            );
            break;
        case 1:
            body = (
                <ReportTemplatePage
                activeStep = {activeStep}
                setActiveStep={setActiveStep}
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
                />
            );
            break;
            default:
                return;
    }

    return (
    <div>
        {body}
    </div>
    )
}

export default withRouter(ReportCreate)
