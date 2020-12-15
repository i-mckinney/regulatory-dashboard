import React from 'react'
import { Divider, makeStyles, Typography, Tab } from '@material-ui/core'
import HelixVerticalTab from '../utils/HelixVerticalTab'
import HelixTabPanel from '../utils/HelixTabPanel'
import HelixTableKeysRight from '../utils/helix-table-keys/HelixTableKeysRight'

const reportGlobalTableKeyStyles = makeStyles(() => ({
    container: {
        marginTop: '1rem',
        width: '90%',
        margin: 'auto',
    },
    collection: {
        backgroundColor: '#3f51b5',
        fontSize: '.8125rem',
        opacity: '1',
        minHeight: '35px',
        borderRadius: '4px',
    },
    header: {
      marginBottom: '48px',
    },
}));

const ReportGlobalTableKey = () => {
    const reportGlobalTableKeyClasses = reportGlobalTableKeyStyles()

    const renderTabs = () => {
        const tabs = [
            <Tab key={0} label="Add Collection" className={reportGlobalTableKeyClasses.collection} />,
            <Tab key={1} label="Entities"/>,
            <Tab key={2} label="Loans"/>,
            <Tab key={3} label="Reports"/>,
        ]
        return tabs
    }

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
            <div className={reportGlobalTableKeyClasses.container}>
                <div className={reportGlobalTableKeyClasses.header}>
                    <Typography variant='h5'>
                        <b>Helix Table Keys</b>
                    </Typography>
                    <Typography variant='subtitle2'>
                        Create a global list of normalized that are allowed to be used in the system
                    </Typography>
                </div>
                <Divider />
                <HelixVerticalTab renderTabs={renderTabs} renderHelixPanelTabs={renderHelixPanelTabs}/>
            </div>
        </>
    )
}

export default ReportGlobalTableKey