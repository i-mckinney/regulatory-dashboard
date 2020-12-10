import React from 'react'
import { Divider, makeStyles, Typography } from '@material-ui/core'
import HelixVerticalTab from '../utils/HelixVerticalTab'
import HelixTabPanel from '../utils/HelixTabPanel'
import HelixTableKeysRight from '../utils/helix-table-keys/HelixTableKeysRight'

const reportGlobalTableKeyStyles = makeStyles(() => ({
    header: {
      marginBottom: '48px',
    },
}));

const ReportGlobalTableKey = () => {
    const reportGlobalTableKeyClasses = reportGlobalTableKeyStyles()

    const renderHelixPanelTabs = (value) => {
        return (
            <>
                <HelixTabPanel value={value} index={1}>
                    <HelixTableKeysRight />
                </HelixTabPanel>
                <HelixTabPanel value={value} index={2}>
                    Loans Content
                </HelixTabPanel>
                <HelixTabPanel value={value} index={3}>
                    Reports Content
                </HelixTabPanel>
            </>
        )
    }


    return (
        <>
            <div className={reportGlobalTableKeyClasses.header}>
                <Typography variant='h5'>
                    <b>Helix Table Keys</b>
                </Typography>
                <Typography variant='subtitle2'>
                    Create a global list of normalized that are allowed to be used in the system
                </Typography>
            </div>
            <Divider />
            <HelixVerticalTab renderHelixPanelTabs={renderHelixPanelTabs}/>
        </>
    )
}

export default ReportGlobalTableKey