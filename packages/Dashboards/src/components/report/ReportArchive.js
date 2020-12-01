import React from 'react'
import { makeStyles, FormLabel, Grid } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import PublishIcon from '@material-ui/icons/Publish'
import { HelixTextField } from 'helixmonorepo-lib'

// Styling used for MaterialUI
const reportArchiveStyles = makeStyles(() => ({
    title: {
        color: 'black',
        marginBottom: '12px',
        fontSize: '1.25rem',
    },
    textfield: {
        width: '105%',
    },
}))

const ReportArchive = () => {
    // Creates an object for styling. Any className that matches key in the reportArchiveStyles object will have a corresponding styling
    const reportArchiveStylesClasses = reportArchiveStyles()

    return (
        <div>
            <FormLabel className={reportArchiveStylesClasses.title} component="legend">Create Required Fields</FormLabel>
            <Grid 
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
            spacing={3}>
                <Grid item xs={6}>
                    <HelixTextField
                    className={reportArchiveStylesClasses.textfield}
                    name="htmlForm"
                    label="HTML Form"
                    value=""
                    />
                </Grid>
                <Grid item xs>
                    <IconButton>
                        <PublishIcon fontSize="large" />
                    </IconButton>
                </Grid>
                <Grid item xs={6}>
                    <HelixTextField
                    className={reportArchiveStylesClasses.textfield}
                    name="csvForm"
                    label="CSV Form"
                    value=""
                    />
                </Grid>
                <Grid item xs>
                    <IconButton>
                        <PublishIcon fontSize="large" />
                    </IconButton>
                </Grid>

            </Grid>
        </div>
    )
}

export default ReportArchive