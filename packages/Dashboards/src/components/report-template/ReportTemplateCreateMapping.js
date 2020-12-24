import React, {useState, useEffect} from 'react';
import { makeStyles, Grid, Typography, Divider, Paper, Tab }  from '@material-ui/core'
import { HelixButton } from 'helixmonorepo-lib'
import { withRouter } from 'react-router-dom'
import SelectValuePopup from '../utils/SelectValuePopup'
import Select from '../utils/Select'
import MockCollectionData from '../../MockData/MockCollectionData'
// import HelixVerticalTab from '../utils/HelixVerticalTab'
import HelixVerticalTab from '../utils/HelixVerticalTabV2'
import axios from "axios";
import { API_HOST } from "../../config";

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
addCollectionButton: {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  // marginLeft: '24px',
  },
  singleTab: {
    display: "flex",
  },
  singleTabIcon: {
    flexGrow: "2",
  },
},
}))

const ReportTemplateCreateMapping = ({ 
  fields = mockFields, 
  initialCollections=mockCollectionData, 
  setFields, 
  activeStep, 
  setActiveStep,
  reportTemplate,
  setReportTemplate,
  handleSubmit
}) => {
  const mappingClasses = createMappingStyles()

  // State of SelectValuePopup (i.e. open or closed)
  const [openPopup, setOpenPopup] = useState(false)
  // Sets element for SelectValuePopup to anchor to
  const [anchorEl, setAnchorEl] = useState(null);
  // Keeps track of which field value is being edited
  const [fieldIdToChange ,setFieldIdToChange,]= useState('')
  // Keeps track of selected collection from the select dropdown via it's id
  const [collectionId, setCollectionId]=useState(initialCollections[0].id)
  //const [collectionId, setCollectionId]=useState('')

  // Array of objects containing collection data
  const [collectionsData, setCollectionsData] = useState(initialCollections)
  //const [collectionsData, setCollectionsData] = useState([])

  const [fieldIdxToChange, setFieldIdxToChange] = useState(0)

  const [value, setValue] = useState(0);

  const companyId = '5f7e1bb2ab26a664b6e950c8'
  let collectionsURL = `${API_HOST}/companies/${companyId}/globalkeys` 
  // useEffect(() => {
  //   const fetchCollections = async () => {
  //     const response = await axios.get(collectionsURL)
  //     console.log('response.data', response.data)
  //     setCollectionsData(response.data)
  //     setCollectionId(response.data[0]._id)
  //   }
  //   fetchCollections()
  //   }, [collectionsURL])

  const generateListOfTabs = () => {
    //const reportTabs =reportTemplate.selectedReportApiRequests.length !== 0 ?  [`Report API: ${Object.keys(reportTemplate.responseMappedReport)}`] : []
    //const entityTabs = reportTemplate.selectedEntityApiRequests.length !== 0 ? [`Entity API: ${Object.keys(reportTemplate.responseMappedEntity)}`] : []
   // const loanTabs = reportTemplate.selectedLoanApiRequests.length !== 0 ? Object.keys(reportTemplate.responseMappedLoans).map((api)=>( `Loan API: ${api}`)) : []
    
   // const reportTabs =reportTemplate.selectedReportApiRequests.length !== 0 ?  [`Report API: ${Object.keys(reportTemplate.responseMappedReport)}`] : []
    // const entityTabs = reportTemplate.selectedEntityApiRequestsDisplay.length !== 0 ? [`Entity API: ${Object.keys(reportTemplate.responseMappedEntity)}`] : []
    const reportTabs = reportTemplate.selectedReportApiRequestsDisplay.length !== 0 ? [`Report API: ${reportTemplate.selectedReportApiRequestsDisplay}`] : []
    const entityTabs = reportTemplate.selectedEntityApiRequestsDisplay.length !== 0 ? [`Entity API: ${reportTemplate.selectedEntityApiRequestsDisplay}`] : []
    const loanTabs = reportTemplate.selectedLoanApiRequestsDisplay.length !== 0 ? (reportTemplate.selectedLoanApiRequestsDisplay).map((api)=>( `Loan API: ${api}`)) : []

    const listOfTabs = [...reportTabs, ...entityTabs, ...loanTabs]
    const listOfTabsHidden = [
      ...reportTemplate.selectedReportApiRequests, 
      ...reportTemplate.selectedEntityApiRequests,
      ...reportTemplate.selectedLoanApiRequests,
    ]
    return [listOfTabs, listOfTabsHidden]
  }
  
  const listOfTabs= generateListOfTabs()[0]
  const listOfTabsHidden=generateListOfTabs()[1]
  console.log('inside report create mapping,', reportTemplate)

  const getMappingGroup = ()=> {
    const currentApiTab = listOfTabs[value]
     let responseMappedGroup
      if(currentApiTab[0]==='R'){
        responseMappedGroup = 'responseMappedReport'
      } else if(currentApiTab[0]==='E'){
         responseMappedGroup = 'responseMappedEntity'
      } else {
        responseMappedGroup = 'responseMappedLoans'
      }
     return responseMappedGroup
  }

  /**
   * @param {object} event the event object
   * @param {int} newValue index value
   */
  const handleChange = (event, newValue) => {
     setValue(newValue);
  }

  // renderHelixTabs return a list of Tab jsx object
  const renderHelixTabs = () => {
    return  listOfTabs.map((tab, tabIndex) => {
        return (
            <Tab key={tabIndex} label={tab} />
        )
    })
  }

  /**
   * Handles updating fields (array of objects passed down from parent component)
   * @param {String} newValue -Value to be added to specific field object in fields 
   */
  const handleUpdateValue = (newValue) =>{
    const newKeyValObj =  {[getSourceKey()] :newValue}
    const currentApiTab = listOfTabs[value]
   // const apiRequest = currentApiTab.split('API: ').pop()
    const apiRequest = listOfTabsHidden[value]
    const updatedMappings = reportTemplate[getMappingGroup()][apiRequest].map((keyValObj,idx)=>{
      return (idx !==fieldIdxToChange ? keyValObj : newKeyValObj )
    })
    const updatedGroup = {...reportTemplate[getMappingGroup()], [apiRequest]: updatedMappings }

    setReportTemplate({
      ...reportTemplate, 
      [getMappingGroup()]:updatedGroup
     }) 
    //  const updatedFields = fields.map((field) => {
    //   return (field.id === fieldIdToChange) ? {...field, tableKey: newValue} : field
    // })
    //  setFields(updatedFields)
  }

  const handleBackButton = () => {
    let nextStep = activeStep -1;
    setActiveStep(nextStep)
  }

  /**
   * Handles opening of SelectValuePopup when clicking on a value 
   * @param {String} id unique field object id of value clicked on
   */
  const handleKeyClick = (event, id) => {
    setAnchorEl(event.target);
    setFieldIdToChange(id)
    setFieldIdxToChange(id)
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
    // return( fieldIdToChange ?
    // fields.filter(field => field.id === fieldIdToChange)[0].fieldKey
    // : '')
    return(fields[fieldIdxToChange].fieldKey)
  }

const renderMappings = () => {
  const currentApiTab = listOfTabs[value]
  // const apiRequest = currentApiTab.split('API: ').pop()
  const apiRequest = listOfTabsHidden[value]
  
  let responseMappedGroup =reportTemplate[getMappingGroup()]

  return responseMappedGroup[apiRequest].map((keyValObj,idx)=>{
      const keyEntry = Object.keys(keyValObj)[0]
      const valueEntry= Object.values(keyValObj)[0]
      return (
        <Grid container spacing={2} key={idx}> 
          <Grid item xs={5} className={mappingClasses.keyGrid}>
            <Paper className={mappingClasses.paper} elevation={2}> <Typography variant="subtitle1">{keyEntry}</Typography></Paper>     
          </Grid>
          <Grid item xs={5} className={mappingClasses.keyGrid}>
            <Paper className={mappingClasses.paper} elevation={2} style={{cursor: 'pointer'}} onClick={(e)=>handleKeyClick(e,idx)}> 
              <Typography variant="subtitle1">{valueEntry}</Typography>
            </Paper>     
          </Grid>
        </Grid>
      )
  })
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
          <Typography variant="h6" > Selected API Requests </Typography>
          <HelixVerticalTab handleChange={handleChange} value={value}  renderHelixTabs={renderHelixTabs} renderHelixPanelTabs={()=>null}/>
        </Grid>
        <Grid container spacing={2} item xs={8}>
          <Grid item xs={7}> 
            <Typography variant="h6" className={mappingClasses.gridHeader} > {listOfTabs[value]}: </Typography>
          </Grid>
          <Grid item xs={4}>
            <Select
            label='Select Collection'
            options={collectionsData}
            width={true}
            value={collectionId}
            onChange={(e)=>setCollectionId(e.target.value)}
            hideNone
           // propForMenu = "keyCollectionName"
             />
          </Grid>
          <Grid item xs={5}>
            <Typography variant="subtitle1"> Report Field Keys: </Typography> 
          </Grid>
          <Grid item xs={5}>
            <Typography variant="subtitle1"> Normalized Table Keys: </Typography> 
          </Grid>
          {renderMappings()}
        </Grid>
      </Grid>
      <SelectValuePopup
        open={openPopup}
        anchorEl={anchorEl}
        id={fieldIdxToChange}
        title= {`Select Key from "${getCollectionById().title}" to Use for Report Field Key "${getSourceKey()}"`}
        //title= {`Select Key from "${getCollectionById().keyCollectionName}" to Use for Report Field Key "${getSourceKey()}"`}
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
          type='submit'
         // href="/reporttemplates"
          size="small"
          onClick = {handleSubmit}
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

export default withRouter(ReportTemplateCreateMapping)