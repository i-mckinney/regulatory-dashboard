import React, { useMemo, useState } from "react"
import { withRouter } from "react-router-dom"
import { makeStyles } from '@material-ui/core'
import PropTypes from "prop-types"
import EntityCard from "./EntityCard"
import { detailedInfo } from "../../MockData/ReconcileDWMockData"
import { HelixButton } from 'helixmonorepo-lib'
import HelixTable from '../table/HelixTable'
import HelixTableCell from '../table/HelixTableCell'
import entities from '../apis/entities'

// Styling used for MaterialUI
const entityDiscrepancyStyles = makeStyles(() => ({
  medium: {
    width: '80%',
    margin: 'auto',
    marginTop: '3rem',
    paddingBottom: '3rem',
    '& table': {
      borderCollapse: 'separate',
    },
  },
  cancelButton: {
    backgroundColor: "#42a5f5",
    color: "white",
    "&:hover": {
      backgroundColor: "#2196f3",
      color: "white",
    },
  },
  confirmButton: {
    marginLeft: "15px",
    backgroundColor: "#1976d2",
    color: "white",
    "&:hover": {
      backgroundColor: "#1565c0",
      color: "white",
    },
  },
  pageProgression: {
    display: "flex",
    justifyContent: "center",
    marginTop: "48px",
  },
  loading: {
    position: 'absolute', 
    left: '50%', 
    top: '50%',
  },
}))

/**
 * @param {Object} props Using the history property to route back Entity site
 * @return {JSX} Discrepancy site
 * routed at /Discrepancy
 */
const EntityDiscrepancy = (props) => {
  // Creates an object for styling. Any className that matches key in the entityDiscrepancyStyles object will have a corresponding styling
  const entitydiscrepancyClasses = entityDiscrepancyStyles();

  // columns will store column header that we want to show in the front end
  const columns = useMemo(() => [], [])

  // rows will store all the row data
  const rows = useMemo(() => [], [])

  // data store fetchAggregatedSourceSystemsData GET Method API results
  const [data, setData] = useState([])

  /**
   * {
   * FieldName: string
   * IsEdited: boolean
   * SystemOfRecord: string
   * PreviousValue: string
   * NewValue: string
   * SourceSystem: string
   * }
   * Stores array of entity data objects
   */
  // const entityData = []
  const entityData = useMemo(() => [], [])

  // sourceOfTruthData stores object of sources of truth e.g. { source: 'FIS', truthValue: 'John Doe'}
  const sourceOfTruthData = useMemo(() => [], [])

  // matchesToSoT is 2D array with boolean values that determines whether it matches to source of truth
  const matchesToSoT = useMemo(() => [], [])

  const [saveEntityData, setSaveEntityData] = useState([])
  
  /**
   * @param {object} column represent object data regarding the api result  
   * @return {string} provide table row with unique key props (required)
   */
  const customHeadColumnKeyProp = (column) => {
    return column.Accessor
  }

  /**
   * @param {object} row represent object data regarding the api result 
   * @return {string} provide table row with unique key props (required)
   */
  const customBodyRowKeyProp = (row) => {
    return row[0]
  }

  // fetchAggregatedSourceSystemsData calls backend api through get protocol to get all the aggregated source system data
  const fetchAggregatedSourceSystemsData = async () => {
    const response = await entities.get(`discrepancies/5f7e1bb2ab26a664b6e950c8/${props.location.state.borrowerID}/report/${props.location.state._id}`)
    setData(response.data)
  }

  if (data.length === 0) {
    fetchAggregatedSourceSystemsData()
  } else {
    if (columns.length === 0) {
      data.TableHeaders.forEach((header) => columns.push(header))
      data.TableData.forEach((entityField) => {
        const row = [entityField.key_config["display"]]
        sourceOfTruthData.push(entityField.sourceSystem)
        rows.push(row)
      })
      data.TableData.forEach((entityField, entityFieldIndex) => {
        const row = rows[entityFieldIndex]
        const rowSoT = []
        const values = entityField.values.map((value) => {
          if (value !== null) {
            try {
              const cleanValue = value.value ? value.value.toString() : "Error"
              rowSoT.push(cleanValue)
              return value.value ? value.value.toString() : "Error"
            }
            catch (e) {
              return e
            }
          } else {
            rowSoT.push("")
            return ""
          }
        })
        matchesToSoT.push(rowSoT)

        const newRow = row.concat(values)
        rows[entityFieldIndex] = newRow
      })

      setSaveEntityData(data.TableData)
    }
  }

  // editEntityData is modified data needed to send to next component/pipeline
  const [editEntityData, setEditEntityData] = useState(entityData)

  // savedSourceOfTruthData is a storage of saved new source of truth data 
  const [savedSourceOfTruthData, setSavedSourceOfTruthData] = useState(sourceOfTruthData)

  /**
   * @param {int} index table cell index in 1-dimension array
   * @param {boolean} isEdited boolean represent whether cell is edited
   * @param {string} editedValue represents new value provided from table data cell (child component)
   */
  const editData = (index, isEdited, editedValue) => {
    const copyEditEntityData = [ ...editEntityData ]
    const modifiedData = { ...copyEditEntityData[index] }
    modifiedData["IsEdited"] = isEdited
    modifiedData["NewValue"] = editedValue
    
    // Removes 1 object at index and adds 1 object at index
    copyEditEntityData.splice(index, 1, modifiedData)
    setEditEntityData([...copyEditEntityData])
  }
  
  /** 
   * @param {int} rowIndex the rowIndex represents index of the row 
   * @param isEdited boolean represent whether cell is edited
   * @param {*} previousValue represents old value that was provided from table data cell (child component)
   * @param {*} value represents new value provided from table data cell (child component)
   */
  const saveData = (rowIndex, columnIndex, isEdited, previousValue, value, matchesSoT) => {
    if (isEdited) {
      const copySavedEntityData = [ ...saveEntityData ]
      const modifiedData = { ...copySavedEntityData[rowIndex] }

      const modifiedValues = [ ...modifiedData.values ]

      const modifiedValueDatum = modifiedValues[columnIndex-1] 
      ? { ...modifiedValues[columnIndex-1] }
      : {}

      modifiedValueDatum["previousValue"] = previousValue
      modifiedValueDatum["value"] = value
      modifiedValueDatum["matchesSoT"] = matchesSoT

      modifiedValues.splice(columnIndex-1, 1, modifiedValueDatum)
      modifiedData["values"] = modifiedValues

      copySavedEntityData.splice(rowIndex, 1, modifiedData)
      setSaveEntityData([ ...copySavedEntityData ])

    } else {
      const copySavedEntityData = [ ...saveEntityData ]
      const modifiedData = { ...copySavedEntityData[rowIndex] }

      const modifiedValues = [ ...modifiedData.values ]
      const modifiedValueDatum = modifiedValues[columnIndex-1]["previousValue"] 
      ? { ...modifiedValues[columnIndex-1] } 
      : null

      if (modifiedValueDatum && modifiedValueDatum["previousValue"]) {
        delete modifiedValueDatum.previousValue
        modifiedValueDatum["value"] = previousValue
        modifiedValueDatum["matchesSoT"] = matchesSoT
      }

      modifiedValues.splice(columnIndex-1, 1, modifiedValueDatum)
      modifiedData["values"] = modifiedValues

      copySavedEntityData.splice(rowIndex, 1, modifiedData)
      setSaveEntityData([ ...copySavedEntityData ])
    }
  }

  /**
   * @param {int} rowIndex the rowIndex represents index of the row 
   * @param {string} source the source is value of the column 
   * @param {string} trueValue the trueValue is value of the HelixTableCell selected
   */
  const saveRadioData = (rowIndex, source, trueValue) => {
    const copySavedEntityData = [ ...saveEntityData ]
    const modifiedData = { ...copySavedEntityData[rowIndex] }
    
    const modifiedSourceSystem = { ...modifiedData.sourceSystem }
    modifiedSourceSystem["source"] = source
    modifiedSourceSystem["trueValue"] = trueValue

    const modifiedValues = [ ...modifiedData.values ] 
    
    modifiedValues.forEach((value) => {
      if (value) {
        value["matchesSoT"] = value.value === trueValue
      }
    })

    modifiedData["sourceSystem"] = modifiedSourceSystem

    copySavedEntityData.splice(rowIndex, 1, modifiedData)
    setSaveEntityData([ ...copySavedEntityData ])
  }
  
  console.log(saveEntityData)

  /**
   * @param {int} rowIndex the rowIndex represents index of the row 
   * @param {string} newSourceValue the newSourceValue is the new selected the source of truth 
   * @param {string} newTrueValue 
   */
  const handleSourceOfTruth = (rowIndex, newSourceValue, newTrueValue) => {
    const copySavedSourceOfTruthData = [ ...savedSourceOfTruthData ]
    const modifiedSavedSourceOfTruthData = { ...copySavedSourceOfTruthData[rowIndex] }

    modifiedSavedSourceOfTruthData["source"] = newSourceValue
    modifiedSavedSourceOfTruthData["trueValue"] = newTrueValue

    copySavedSourceOfTruthData.splice(rowIndex, 1, modifiedSavedSourceOfTruthData)
    setSavedSourceOfTruthData([ ...copySavedSourceOfTruthData ])
  }

  /**
   * @param {object} row the row is an object of data
   * @param {object} column the column is an object of the header with accessor and label props
   * @param {int} rowIndex the rowIndex represents index of the row
   * @param {int} columnIndex the columnIndex represents index of the column
   * @return {JSX} HelixTableCell of object properties in that Table row
   */
  const customCellRender = (row, column, rowIndex, columnIndex) => {
    const columnAccessor = column.Accessor
    if (columnIndex === 0) {
      return <HelixTableCell key={`Row-${rowIndex} ${columnAccessor}-${columnIndex}`} value={row[columnIndex]}/>
    }
    else {
      return (
        <HelixTableCell key={`Row-${rowIndex} ${columnAccessor}-${columnIndex}`} saveData={saveData} saveRadioData={saveRadioData} handleSourceOfTruth={handleSourceOfTruth} matchesToSoT={matchesToSoT} sourceOfTruthData={savedSourceOfTruthData} value={row[columnIndex]} rowIndex={rowIndex} columnIndex={columnIndex} columns={columns} editData={editData} editable={true}/>
      )
    }
  }
  
  // Go back to parent component
  const handleBackButton = () => {
    props.history.push("/entity")
  }

  // Passes editEntityData to the confirmation route
  const handleConfirmButton = async () => {
    const req = { savedChanges: saveEntityData }
    await entities.post(`discrepancies/report/${props.location.state._id}`, req)
    props.history.push("/entity")
  }

  return (
    <div className={`container ${entitydiscrepancyClasses.medium}`}>
      <EntityCard
        RecordLabel={detailedInfo.RecordLabel}
        SystemOfRecord={detailedInfo.SystemOfRecord}
        ID={detailedInfo.HeaderInfo.ID}
        BorrowerName={detailedInfo.HeaderInfo.BorrowerName}
        RelationshipManager={detailedInfo.HeaderInfo.RelationshipManager}
      />
      <HelixTable
      toggleSearch={false}
      columns={columns} 
      rows={rows} 
      customCellRender={customCellRender} 
      customBodyRowKeyProp={customBodyRowKeyProp} 
      customHeadColumnKeyProp={customHeadColumnKeyProp} 
      />
      <div className={entitydiscrepancyClasses.pageProgression}>
        <HelixButton
          className={entitydiscrepancyClasses.cancelButton}
          onClick={handleBackButton}
          text="Back"
        />
        <HelixButton 
        className={entitydiscrepancyClasses.confirmButton} 
        onClick={handleConfirmButton} 
        text="Confirm" />
      </div>
    </div>
  )
}

EntityDiscrepancy.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
}

export default withRouter(EntityDiscrepancy)
