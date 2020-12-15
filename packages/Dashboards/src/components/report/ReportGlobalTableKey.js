import React , { useState } from 'react'
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

    const [listOfTabs, setListOfTabs] = useState(["Entity #12", "Loan #16", "Report #20"])
    
    const [listOfPanelTabs, setListOfPanelTabs] = useState([<HelixTableKeysRight />, "Loans Global Table Key", "Report Global Table Key"])

    const reportGlobalTableKeyClasses = reportGlobalTableKeyStyles()

    const renderTabs = () => {
        return listOfTabs.map((tab, tabIndex) => {
            return (
                <Tab key={tabIndex} label={tab} />
            )
        })
    }

    const renderHelixPanelTabs = (value) => {
        return listOfPanelTabs.map((panelTab, panelTabIndex) => {
            return (
                <HelixTabPanel value={value} index={panelTabIndex}>
                    {panelTab}
                </HelixTabPanel>
            )
        })
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