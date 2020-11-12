import React from 'react'
import { withRouter } from 'react-router-dom'
import ReportInputForm from './ReportInputForm'
import { columnFields } from './config'

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
    /**
     * @param {object} reportTemplate represent entity object with props values that it will create 
     */
    const createReportTemplate = async (reportTemplate) => {
        console.log(reportTemplate)
        props.history.push("/report")
    }

    return (
    <div>
        <ReportInputForm header="Create Report Template" initialReportTemplate={initialReportTemplate} onSubmit={createReportTemplate} />
    </div>
    )
}

export default withRouter(ReportCreate)
