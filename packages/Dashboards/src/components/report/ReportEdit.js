import React from 'react'
import { withRouter } from 'react-router-dom'
import ReportInputForm from './ReportInputForm'

/**
 * @param {Object} props Using the history property to route next component with data state and location for state object
 * @return {JSX} ReportEdit site with ReportInputForm provided for edit entity
 * routed at /report/edit/:id
 */
const ReportEdit = (props) => {
    const reportTemplate = { ...props.location.state }
    const id = reportTemplate._id
    delete reportTemplate._id

    /**
     * @param {object} editedReportTemplate represent object with edited entity props values
     */
    const editReportTemplate = async (editedReportTemplate) => {
        console.log(editedReportTemplate)
        props.history.push("/report")
    }

    return (
    <div>
        <ReportInputForm header="Edit Report Template" initialReportTemplate={reportTemplate} onSubmit={editReportTemplate} />
    </div>
    )
}

export default withRouter(ReportEdit)
