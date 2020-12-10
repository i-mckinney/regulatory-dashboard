import React, {useState} from 'react';
import { Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

import CancelIcon from '@material-ui/icons/Cancel';
import { v4 as uuidv4 } from 'uuid';

import Controls from '../../controls/Controls';

/**
* CUSTOM MAPPING Component
* UI that allows the user to set a mapping
* Intended to be displayed as a tab panel and is a child of the Custom Request tab group component
*/

/**
* Method generates an object used to store custom params, headers, and mappings set by the user when interacting with the custom request interface
* @param {Array} fields -Array of objects containing  Key Value mappings 
* @param {Func} onChange -Function to pass data to parent component 
* @param {Array} intialCollections - Array of objects containing collection data (currently using mockData file, not backend)
* @returns {Object} Returns a new field object with a generated unique ID, key and value pair. 
*/
const createNewField = () => ({ id: uuidv4(), key: '', value: '' });

export default function CustomMapping({ fields, onChange, initialCollections }) {
  // Keeps track of selected collection from the select dropdown via it's id
  const [collectionId, setCollectionId]=useState(initialCollections[0].id)
  // State of SelectValuePopup (i.e. open or closed)
  const [openPopup, setOpenPopup] = useState(false)
  // Sets element for SelectValuePopup to anchor to
  const [anchorEl, setAnchorEl] = useState(null);
  // Keeps track of which field value is being edited
  const [valueIdToChange ,setValueIdToChange,]= useState('')
  // Array of objects containing collection data
  const [collectionsData, setCollectionsData] = useState(initialCollections)

  /**
  * Spreads over the existing header fields object, and adds a newly created field property to the object 
  */
  const handleFieldIncrement = () => {
    onChange([...fields, createNewField()]);
  };

  /**
   * Handles updating fields (array of objects passed down from parent component)
   * @param {String} newValue -Value to be added to specific field object in fields 
   */
  const handleUpdateValue = (newValue) =>{
    const updatedFields = fields.map((field) => {
      return (field.id === valueIdToChange) ? {...field, value: newValue} : field
    })
    onChange(updatedFields)
  }

  /**
  * Removes field by targeting unique ID on click event
  * @param {String} id unique field object id generated on object creation
  */
  const removeField = (id) => {
    onChange(fields.filter((f) => f.id !== id));
  };

  /**
   * Handles opening of SelectValuePopup when clicking on a value 
   * @param {String} id unique field object id of value clicked on
   */
  const handleValueClick = (event, id) => {
    setAnchorEl(event.target);
    setValueIdToChange(id)
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
    setValueIdToChange('')
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
    return( valueIdToChange ?
    fields.filter(field => field.id === valueIdToChange)[0].key
    : '')
  }

  return (
    <div>
      <div style={{ marginBottom: '12px' }}>
       <Grid container spacing ={2}>
         <Grid item md={6}>
          <Typography>
            Use this tab to map data values from external sources
          </Typography>
         </Grid>
         <Grid item md={4}>
          <Controls.Select
            label='Select Collection'
            options={collectionsData}
            width={true}
            value={collectionId}
            onChange={(e) => setCollectionId(e.target.value)}
            hideNone
          />
         </Grid>
       </Grid>
        <Grid container spacing={0}>
          <Grid item md={5}>
            <h4>Key From Source System:</h4>
          </Grid>
          <Grid item md={5}>
            <h4>Key in Discrepancy Table:</h4>
          </Grid>
        </Grid>

        {fields.map((f, i) => {
          const onFieldChange = (fieldName) => (e) =>
            onChange(
              fields.map((otherField) =>
                otherField.id === f.id
                  ? { ...otherField, [fieldName]: e.target.value }
                  : otherField
              )
            );
          return (
            <Grid container spacing={2} key={f.id}>
              <Grid item md={5}>
                <Controls.Input
                  label='Key'
                  defaultValue='Default Value'
                  width={true}
                  value={f.key}
                  onChange={onFieldChange('key')}
                  InputProps={{readOnly: true}}
                ></Controls.Input>
              </Grid>
              <Grid item md={5}>
                <Controls.Input
                  label='Value'
                  defaultValue='Default Value'
                  width={true}
                  value={f.value}
                  onChange={onFieldChange('value')}
                  InputProps={{
                    readOnly: true,
                    onClick: (e) => handleValueClick(e, f.id)
                    }}
                ></Controls.Input>
              </Grid>
              <Grid style={{ display: 'flex', alignItems: 'center' }}>
                <CancelIcon onClick={() => removeField(f.id)} />
              </Grid>
            </Grid>
          )
        })}
      </div>
      <Controls.SelectValuePopup
        options = {getCollectionById().keys.sort((a,b)=> a.toLowerCase().localeCompare(b.toLowerCase()))}
        addCollectionKey = {addCollectionKey}
        id={valueIdToChange}
        open={openPopup}
        onClose={handleClosePopup}
        title= {`Select Key Value from "${getCollectionById().title}" to Use for Source Key "${getSourceKey()}"`}
        anchorEl={anchorEl}>
      </Controls.SelectValuePopup>
      <Controls.Button
        text='Add Item'
        size='medium'
        onClick={handleFieldIncrement}
      />
    </div>
  );
}
