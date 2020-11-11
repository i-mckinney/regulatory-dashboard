import React, { useState } from 'react'
import { Switch, FormLabel, FormControl, FormGroup, FormControlLabel } from '@material-ui/core'

const ReportPreference = () => {
    const [preference, setPreference] = useState({
        entities: false,
        loan: false,
        regulatory: false,
    })
    
    const handleChange = (event) => {
        setPreference({ ...preference, [event.target.name]: event.target.checked });
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