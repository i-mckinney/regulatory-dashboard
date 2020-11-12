import React, { useState } from 'react'
import { Switch, FormLabel, FormControl, FormGroup, FormControlLabel } from '@material-ui/core'

const ReportPreference = (props) => {
    // preference is an object that contains boolean of key-value pair of entities, loan, and regulatory
    const [preference, setPreference] = useState(props.preference)

    /**
     * @param {object} event the event object
     */
    const handleChange = (event) => {
        const preferenceObj = { ...preference, [event.target.name]: event.target.checked }
        setPreference(preferenceObj)
        props.handlePreferenceChange(preferenceObj)
    }

    return (
    <FormControl component="fieldset">
        <FormLabel component="legend">Select Report Preference</FormLabel>
        <FormGroup>
            <FormControlLabel
            control={<Switch checked={preference.entities} onChange={handleChange} name="entities" />}
            label="Entities"
            />
            <FormControlLabel
            control={<Switch checked={preference.loan} onChange={handleChange} name="loan" />}
            label="Loan"
            />
            <FormControlLabel
            control={<Switch checked={preference.regulatory} onChange={handleChange} name="regulatory" />}
            label="Regulatory"
            />
        </FormGroup>
    </FormControl>
    )
}

export default ReportPreference