import React, { useState } from 'react'
import { Switch, FormLabel, FormControl, FormGroup, FormControlLabel } from '@material-ui/core'

const ReportPreference = (props) => {
    const [preference, setPreference] = useState(props.preference)

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