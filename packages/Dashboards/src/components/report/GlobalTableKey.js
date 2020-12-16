import React , { useState } from 'react'
import { Divider, makeStyles, Typography, Tab, Container, Grid } from '@material-ui/core'
import { HelixButton, HelixTextField } from 'helixmonorepo-lib'
import HelixVerticalTab from '../utils/HelixVerticalTab'
import HelixTabPanel from '../utils/HelixTabPanel'
import HelixTableKeysRight from '../utils/helix-table-keys/HelixTableKeysRight'
import FormDialog from '../utils/helix-table-keys/FormDialog'

// Styling used for MaterialUI
const globalTableKeyStyles = makeStyles((theme) => ({
    container: {
        marginTop: '1rem',
        width: '90%',
        margin: 'auto',
    },
    header: {
        marginBottom: '24px',
    },
    addCollectionButton: {
        marginLeft: '24px',
    },
}));

const GlobalTableKey = () => {

    // Opens dialog to add new key dialog 
    const [ openDialog, setOpenDialog ] = useState(false)

    // New key item value captured by form input
    const [collection, setCollection] = useState('')

    // Mock data of list of tabs
    const [listOfTabs, setListOfTabs] = useState(["Entity #12", "Loan #16", "Report #20", "Loan #101"])
    
    // Mock data of list of panel tabs
    const [listOfPanelTabs, setListOfPanelTabs] = useState([<HelixTableKeysRight />, "Loans Global Table Key", "Report Global Table Key", "Loans #101"])

    // Creates an object for styling. Any className that matches key in the globalTableKeyStyles object will have a corresponding styling
    const globalTableKeyClasses = globalTableKeyStyles()

    // renderTabs return a list of Tab jsx object
    const renderTabs = () => {
        return listOfTabs.map((tab, tabIndex) => {
            return (
                <Tab key={tabIndex} label={tab} />
            )
        })
    }

    // renderHelixPanelTabs return a list of HelixTabPanel jsx object
    const renderHelixPanelTabs = (value) => {
        return listOfPanelTabs.map((panelTab, panelTabIndex) => {
            return (
                <HelixTabPanel value={value} index={panelTabIndex}>
                    {panelTab}
                </HelixTabPanel>
            )
        })
    }

    // renderAddCollection return a HelixButton jsx object
    const renderAddCollection = () => {
        return (
            <div className={globalTableKeyClasses.flexContainer}>
                <HelixButton text="Add Collections" color="primary" className={globalTableKeyClasses.addCollectionButton} onClick = {() => setOpenDialog(true)} />
            </div>
        )
    }

    // Dynamically add collection to list of collections and panel tab
    const handleAddCollection = () => {
        setListOfTabs([...listOfTabs, collection])
        setListOfPanelTabs([...listOfPanelTabs, <HelixTableKeysRight />])
        setOpenDialog(false)
    }

    // Renders form input and button controls for adding collection name
    const handleCollectionForm = () => {
      return (
        <Container>
            <Grid container 
            spacing={2}
            justify='center'
            alignItems='center'
            direction='column'>
                <Grid item md={12}>
                    <HelixTextField
                    fullWidth
                    name = 'collection'
                    label = 'Enter Collection Name'
                    onChange={(e) => setCollection(e.target.value)}
                    />
                </Grid>
                <Grid item md={12}>
                    <HelixButton
                    color='primary'
                    size='large'
                    variant='contained'
                    text='Add'
                    style={{width: '8em'}}
                    onClick={() => handleAddCollection()}/>
                    <HelixButton
                    color='secondary'
                    size='large'
                    variant='contained'
                    text='Cancel'
                    style={{width: '8em'}}
                    onClick={() => {setOpenDialog(false)}}/>
                </Grid>
            </Grid>
        </Container>
        )
    }

    return (
        <>
            <div className={globalTableKeyClasses.container}>
                <div className={globalTableKeyClasses.header}>
                    <Typography variant='h5'>
                        <b>Helix Table Keys</b>
                    </Typography>
                    <Typography variant='subtitle2'>
                        Create a global list of normalized that are allowed to be used in the system
                    </Typography>
                </div>
                <Divider />
                <HelixVerticalTab renderAddCollection={renderAddCollection} renderTabs={renderTabs} renderHelixPanelTabs={renderHelixPanelTabs}/>
                <FormDialog
                title = 'Add New Global Table Keys Collection'
                openDialog= { openDialog }
                setOpenDialog = { setOpenDialog }>
                    {handleCollectionForm()}
                </FormDialog>
            </div>
        </>
    )
}

export default GlobalTableKey