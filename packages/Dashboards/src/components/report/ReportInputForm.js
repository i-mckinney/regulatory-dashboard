import React, { useState} from 'react'
import { makeStyles, Grid, Typography }  from '@material-ui/core'
import { HelixTextField, HelixButton } from 'helixmonorepo-lib'
import { columnFields, columnLabels } from './config'
import ReportArchive from './ReportArchive'
import ReportTemplateCreateTable from './ReportTemplateCreateTable'
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

// Styling used for MaterialUI
const reportInputFormStyles = makeStyles(() => ({
    reportInputFormStyle: {
        marginTop: '2rem',
        marginLeft: '4rem',
        width: '50%',
        margin: 'auto',
        boxShadow: '0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)',
        transition: 'box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1)',
        display: 'block',
        position: 'relative',
        padding: '30px',
        borderRadius: '4px',
    },
    hide: { 
        display: 'none',
    },
    buttonStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        display:'flex'
    },
    selectDropdown: {
        width: "30%",
        margin: "auto",
        marginTop: "0.25rem",
        paddingBottom: "3rem",
        '& p': {
            fontWeight: "bold",
            paddingBottom: "1rem",
            fontSize: "1rem",
            margin: "0",
            textAlign: "center"
        },  
    }
}));

//Used to perform error checks for validation
const reportError = {}
columnFields.forEach((columnField) => {
    reportError[[columnField]] = ""
})

/**
 * @param {object} initialReportTemplate represent preset empty report template data object
 * @param {string} header represent the header title of this form
 * @param {func} onSubmit represent a func from parent component pass down to child component to retrieve input form information
 * @return {JSX} ReportInputForm site with input form to fill in
 */
const ReportInputForm = ({ initialReportTemplate, header, onSubmit}) => {
    // Set reportTemplate with preset empty data for report template creation
    const [report, setReport] = useState(initialReportTemplate)
    // Perform error check for form validatation upon report template data
    const [error] = useState(reportError)
     // Row data to be passed to next component
    const [rowData, setRowData] = useState([])
     // Column data to be passed to next component
    const [colData, setColData] = useState([])
    // Creates an object for styling. Any className that matches key in the reportInputFormStyles object will have a corresponding styling
    const reportInputFormClasses = reportInputFormStyles()
    
    /**
     * @param {Object} event the event object
     * name: the name property on the target text field element
     * value: the value property on the target text field element as report template input text
     */
    const handleInputChange = (event) => {
        const { name, value } = event.target
        setReport({ ...report, [name]: value })
    }

    /**
     * @param {Object} event the event object 
     * Send the created report template back to parent component
     */
    const onSubmitForm = (event) => {
        event.preventDefault()
        onSubmit(report);
    }
    
    /**
     * @param {string} name the form control name 
     * @param {string} label the form control label
     * @param {string} placeholder a text in the textfield with default value as a placeholder
     * @param {bool} required the required toggles the required state to fill in the textfield
     * @return {jsx} return a jsx object of HelixTextField
     */
    const setHelixTextField = (name, label, placeholder = "", required = false) => {
        return (
            <HelixTextField
            error={error[[name]].length > 0}
            description={label}
            name={name}
            label={label}
            value={report[[name]]}
            placeholder={placeholder}
            helperText={error[[name]]}
            required={required}
            fullWidth 
            onChange={handleInputChange}
            />
        )
    }

    /**
     * @return {jsx} return a jsx object of HelixButtons 
     */
    const renderButtonActions = () => {
        return (
            <>
                <HelixButton 
                color="primary" 
                variant="contained" 
                type="submit" 
                size="small"
                text="Next" />
                <HelixButton
                color="default"
                variant="contained"
                type="cancel"
                size="small"
                href="/report"
                text="Cancel" />
            </>
        )
    }  
    
    return (
    <div>
        <form className={reportInputFormClasses.reportInputFormStyle} autoComplete="off" onSubmit={onSubmitForm}>
            <Grid container
                direction="row"
                justify="flex-end"
                alignItems="center"
                spacing={4}>
                <Grid item xs={12}> <Typography variant="h5">{header} </Typography> </Grid>
                {columnFields.map((fields, index) => {
                 if (fields === 'archive') {
                        return (
                            <Grid item xs={12} key={`${index} ${fields}`}>
                                <ReportArchive />
                            </Grid>
                        )
                    } else {
                        return (
                            <Grid item xs={12} key={`${index} ${fields}`}>
                                {setHelixTextField(fields, columnLabels[index+1], "", false)}
                            </Grid>
                        )
                    }
                })}
                <Grid className={reportInputFormClasses.hide}> {renderButtonActions()}</Grid> 
            </Grid>
        </form>
        <ReportTemplateCreateTable setColData = {setColData} setRowData = {setRowData} />
        <div className={reportInputFormClasses.selectDropdown}>
            <p> Select Report Field Name Column </p>
            <Autocomplete
                id = "ColumnSelection"
                options = {colData.slice(2,colData.length-1)}
                getOptionLabel = {(selectOption)=> selectOption.Label}
                renderInput={(params)=><TextField {...params} label="Select Column" variant = "outlined"/>}
             />
        </div>
        <div className={reportInputFormClasses.buttonStyle}>
            {renderButtonActions()}
        </div>
    </div>
    )
}

export default ReportInputForm