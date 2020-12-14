import React, {useState} from 'react';
import { makeStyles, Grid, Typography, Divider, Paper }  from '@material-ui/core'
import { HelixButton } from 'helixmonorepo-lib'
import { withRouter } from 'react-router-dom'
import SelectValuePopup from '../utils/SelectValuePopup'
import Select from '../utils/Select'
import MockCollectionData from '../utils/MockCollectionData'

const mockFields = [
  {id: "223bbac3-1569-4265-9ce5-92cf532534f9", fieldKey: "FirstName", tableKey: "firstname"},
  {id: "8df950da-8ad0-4c79-bd1b-b16264b04e01", fieldKey: "MasterID", tableKey: ""},
  {id: "88ef41a8-7b86-4db2-a80c-81a2b11af44c", fieldKey: "BorrowerId", tableKey: "borrowerId"},
]
const mockCollectionData= MockCollectionData

//Styling used for MaterialUI
const createMappingStyles = makeStyles((theme) => ({
  keyContainer: {
    justify:'center',
    alignItems: 'center'
  },
  pageHeader: {
    maringTop: '2rem'
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    minHeight: '2.75rem',
    '&:hover': {
      backgroundColor: '#add8e6',
    },
  },
  keyGrid: {
    marginBottom: '0.25rem',
    marginTop: '0.25rem'
  },
  gridHeader: {
    marginTop: '0.75rem'
  },
  buttonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    display:'flex',
    marginTop: '2rem'
},
backButton: {
  backgroundColor: "#42a5f5",
  color: "white",
  "&:hover": {
    backgroundColor: "#2196f3",
    color: "white",
  },
},
confirmButton: {
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
}))

const ReportCreateMapping = ({ fields = mockFields, initialCollections=mockCollectionData, setFields, activeStep, setActiveStep}) => {
  const mappingClasses = createMappingStyles()

  // State of SelectValuePopup (i.e. open or closed)
  const [openPopup, setOpenPopup] = useState(false)
  // Sets element for SelectValuePopup to anchor to
  const [anchorEl, setAnchorEl] = useState(null);
  // Keeps track of which field value is being edited
  const [fieldIdToChange ,setFieldIdToChange,]= useState('')
  // Keeps track of selected collection from the select dropdown via it's id
  const [collectionId, setCollectionId]=useState(initialCollections[0].id)
  // Array of objects containing collection data
  const [collectionsData, setCollectionsData] = useState(initialCollections)

  /**
   * Handles updating fields (array of objects passed down from parent component)
   * @param {String} newValue -Value to be added to specific field object in fields 
   */
  const handleUpdateValue = (newValue) =>{
    const updatedFields = fields.map((field) => {
      return (field.id === fieldIdToChange) ? {...field, tableKey: newValue} : field
    })
    setFields(updatedFields)
  }

  const handleBackButton = () => {
    let nextStep = activeStep -2;
    setActiveStep(nextStep)
  }

  /**
   * Handles opening of SelectValuePopup when clicking on a value 
   * @param {String} id unique field object id of value clicked on
   */
  const handleKeyClick = (event, id) => {
    setAnchorEl(event.target);
    setFieldIdToChange(id)
    setOpenPopup(true)
  }

  /**
   * Handles closing of SelectValuePopup
   * @param {String} newValue -Value to be added to specific field object in fields  
   */
  const handleClosePopup = (newValue) => {
    setAnchorEl(null)
    setOpenPopup(false)
    if (newValue){
     handleUpdateValue (newValue)
    }
    setFieldIdToChange('')
  }

  /**
   * Helper function to get Collection based of off current collectionId
   * @returns {Object} Current selected Collection object 
   */
  const getCollectionById = () => {
    const collectionObj = collectionsData.filter(collection => collection.id === collectionId)
    return ( collectionObj[0])
  }

   /**
   * Adds new Key to currently selected collection
   * @param {String} newKey -New Key to add
   */
  const addCollectionKey = (newKey) => {
    const collectionToUpdate = getCollectionById()
    const updatedCollectionKeys = collectionToUpdate.keys.concat(newKey)
    const updatedCollection = {...collectionToUpdate, keys: updatedCollectionKeys}
    setCollectionsData(collectionsData.map((collection) => {
       return (collection.id === collectionId ? updatedCollection : collection)
    }))
  }

  /**
   * Helper function 
   * @returns {String} key from source system
   */
  const getSourceKey = () => {
    return( fieldIdToChange ?
    fields.filter(field => field.id === fieldIdToChange)[0].fieldKey
    : '')
  }
 
  return (
    <div>
      <Grid item xs={12}> 
        <Typography variant="h5" gutterBottom className={mappingClasses.pageHeader}> Create Report Template </Typography> 
        <Typography variant="subtitle1"> Generating Fields for the current report </Typography> 
      </Grid>
      <Divider style={{marginBottom: '1rem'}} />
      <Grid container spacing={2} className={mappingClasses.keyContainer}>
        <Grid item xs ={4}>
          <Typography variant="h6" > Placeholder for Vertical Navigation Component</Typography>
        </Grid>
        <Grid container spacing={2} item xs={8}>
          <Grid item xs={7}> 
            <Typography variant="h6" className={mappingClasses.gridHeader} > Test Entity #1 Helix :</Typography>
          </Grid>
          <Grid item xs={4}>
            <Select
            label='Select Collection'
            options={collectionsData}
            width={true}
            value={collectionId}
            onChange={(e)=>setCollectionId(e.target.value)}
            hideNone
             />
          </Grid>
          <Grid item xs={5}>
            <Typography variant="subtitle1"> Report Field Keys: </Typography> 
          </Grid>
          <Grid item xs={5}>
            <Typography variant="subtitle1"> Normalized Table Keys: </Typography> 
          </Grid>
          {fields.map((field) => {
            return (
              <Grid container spacing={2} key={field.id}> 
                <Grid item xs={5} className={mappingClasses.keyGrid}>
                  <Paper className={mappingClasses.paper} elevation={2}> <Typography variant="subtitle1">{field.fieldKey}</Typography></Paper>     
                </Grid>
                <Grid item xs={5} className={mappingClasses.keyGrid}>
                  <Paper className={mappingClasses.paper} elevation={2} style={{cursor: 'pointer'}} onClick={(e)=>handleKeyClick(e,field.id)}> 
                    <Typography variant="subtitle1">{field.tableKey}</Typography>
                  </Paper>     
                </Grid>
              </Grid>
            ) 
          })}
        </Grid>
      </Grid>
      <SelectValuePopup
        open={openPopup}
        anchorEl={anchorEl}
        id={fieldIdToChange}
        title= {`Select Key from "${getCollectionById().title}" to Use for Report Field Key "${getSourceKey()}"`}
        addCollectionKey = {addCollectionKey}
        options={getCollectionById().keys.sort((a,b)=> a.toLowerCase().localeCompare(b.toLowerCase()))}
        onClose={handleClosePopup}> 
      </SelectValuePopup>
      <div className={mappingClasses.buttonStyle}>
        <HelixButton 
          className={mappingClasses.backButton}
          color="secondary" 
          variant="contained" 
          // type="submit" 
          type='button'
          size="small"
          onClick = {handleBackButton}
          text="Back" />
        <HelixButton 
          className={mappingClasses.confirmButton}
          color="primary" 
          variant="contained" 
          // type="submit" 
          type='button'
          size="small"
          onClick = {()=> console.log('implement submit form')}
          text="Confirm" />
        <HelixButton
          className={mappingClasses.cancelButton}
          color="default"
          variant="contained"
          type="cancel"
          size="small"
          href="/reporttemplates"
          text="Cancel" />
        </div>
    </div>
  )

}

export default withRouter(ReportCreateMapping)