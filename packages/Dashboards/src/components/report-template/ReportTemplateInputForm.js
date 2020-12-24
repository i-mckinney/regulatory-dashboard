import React, { useState} from 'react'
import { makeStyles, Grid, Typography }  from '@material-ui/core'
import { HelixTextField, HelixButton } from 'helixmonorepo-lib'
import ReportTemplateRequiredFields from './ReportTemplateRequiredFields'
import ReportTemplateCreateTable from './ReportTemplateCreateTable'
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

// Styling used for MaterialUI
const reportInputFormStyles = makeStyles(() => ({
    divContainer: {
        width: '80%',
        margin: 'auto',
        marginTop: '3rem',
        paddingBottom: '3rem',
        boxShadow: '2px 2px 2px -2px rgba(0, 0, 0, 0.2), 2px 2px 2px 2px rgba(0, 0, 0, 0.14), 2px 2px 2px 2px rgba(0, 0, 0, 0.12)',
    },
    hide: { 
        display: 'none',
    },
    buttonStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        display:'flex'
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

/**
 * @param {object} initialReportTemplate represent preset empty report template data object
 * @param {string} header represent the header title of this form
 * @param {func} onSubmit represent a func from parent component pass down to child component to retrieve input form information
 * @return {JSX} ReportInputForm site with input form to fill in
 */
const ReportTemplateInputForm = ({ 
    header, 
    activeStep, 
    setActiveStep, 
    setFields, 
    reportTemplate,
    setReportTemplate
    }) => {
     // Row data to be passed to next component
    const [rowData, setRowData] = useState([])
     // Column data to be passed to next component
    const [colData, setColData] = useState([])
    // // Selected column to grab field keys from in table
    const [selectedReportColumn, setSelectedReportColumn] = useState(null)

    // Creates an object for styling. Any className that matches key in the reportInputFormStyles object will have a corresponding styling
    const reportInputFormClasses = reportInputFormStyles()

    /**
     * @param {Object} event the event object
     * name: the name property on the target text field element
     * value: the value property on the target text field element as report template input text
     */
    const handleInputChange = (event) => {
        const {value } = event.target
        setReportTemplate({...reportTemplate, reportTemplateName: value})
    }

    const generateReportFieldKeys = () => {
        const reportKeys = rowData.map((row) => (    
            {   
                id: row._id,
                fieldKey: row[selectedReportColumn.Accessor],
                tableKey: ""
            }
        ))
        return reportKeys
    }

    const generateReportTemplateFields = () => {
        const reportFields = rowData.map(({_id,Row,Actions, ...rest})=> rest)
    return reportFields
    }

    const handleNext = () => {
        const columnOrder = colData.map((column)=>column.Accessor).slice(2,colData.length-1)
        setFields(generateReportFieldKeys())
        setReportTemplate({
            ...reportTemplate,
             selectedReportColumn: selectedReportColumn.Accessor,
              columnOrder: columnOrder,
              reportTemplateFields: generateReportTemplateFields()
            })
        let nextStep = activeStep+1
        setActiveStep(nextStep)
    }

    /**
     * @return {jsx} return a jsx object of HelixButtons 
     */
    const renderButtonActions = () => {
        return (
            <>
                <HelixButton 
                className={reportInputFormClasses.nextButton}
                color="primary" 
                variant="contained" 
                type='button'
                size="medium"
                disabled = {selectedReportColumn === null}
                onClick = {handleNext}
                text="Next" />
                <HelixButton
                className={reportInputFormClasses.cancelButton}
                color="default"
                variant="contained"
                type="cancel"
                size="medium"
                href="/reporttemplates"
                text="Cancel" />
            </>
        )
    }  
    
    return (
    <div>
        <div className={reportInputFormClasses.divContainer}> 
            <Grid container
                item xs ={8}
                direction="row"
                style ={{paddingLeft: '1rem'}}
                spacing={4}>
                <Grid item xs={12}> <Typography variant="h5">{header} </Typography> </Grid>
                <Grid item xs={12}>
                    <HelixTextField 
                    name='Report Name'
                    label='Report Name' 
                    placeholder='' 
                    fullWidth 
                    onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={12} >
                    <ReportTemplateRequiredFields />
                </Grid>
                <Grid className={reportInputFormClasses.hide}> <HelixButton /> kept in b/c of a weird bug w/ helix button Styling </Grid> 
            </Grid>
        </div>
        <ReportTemplateCreateTable setColData = {setColData} setRowData = {setRowData} />
        <div className={reportInputFormClasses.selectDropdown}>
            <p> Select Report Field Name Column </p>
            <Autocomplete
                id = "ColumnSelection"
                value={selectedReportColumn}
                onChange= {(event, newValue) => { setSelectedReportColumn(newValue)}}
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

export default ReportTemplateInputForm