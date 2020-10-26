import React, { useMemo, useState, useEffect } from "react"
import { withRouter } from "react-router-dom"
import { makeStyles } from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab'
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
 * @return {JSX} EntityDiscrepancy site
 * routed at /EntityDiscrepancy
 */
const EntityDiscrepancy = (props) => {
  // Creates an object for styling. Any className that matches key in the entityDiscrepancyStyles object will have a corresponding styling
  const entitydiscrepancyClasses = entityDiscrepancyStyles();

  // data store fetchAggregatedSourceSystemsData GET Method API results
  const [data, setData] = useState([])

  // columns will store column header that we want to show in the front end
  const columns = useMemo(() => [], [])

  // rows will store all the row data
  const rows = useMemo(() => [], [])

  // entityData is api result array of row object that contains key_config, sourceSystem, values
  const [entityData, setEntityData] = useState([])

  // error is object contains err and message
  const [error, setError] = useState({ err: false, message: "" })
  
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
    if (columns.length === 0 && !error.err) {
      if (!data.ErrorMessage) {
        data.TableHeaders.forEach((header) => columns.push(header))
        data.TableData.forEach((entityField) => {
          const row = [entityField.key_config["display"]]
          const values = entityField.values.map((value) => {
            if (value !== null) {
              try {
                return value.value ? value.value.toString() : "Improper Mapping"
              }
              catch (e) {
                return e
              }
            } else {
              return "NULL"
            }
          })
          const newRow = row.concat(values)
          rows.push(newRow)
        })
        setEntityData(data.TableData)
      } else {
        setError({ err: true, message: "Borrower ID does not exist" })
      }
    }
  }

  const [counter, setCounter] = React.useState(3);

  useEffect(() => {
    if (error.err) {
      setTimeout(() => props.history.push("/entity"), 3000)
    }
  }, [error, props.history])

  /** 
   * @param {int} rowIndex the rowIndex represents index of the row 
   * @param {int} columnIndex the columnIndex represents index of the column
   * @param {bool} isEdited boolean represent whether cell is edited
   * @param {string} previousValue represents old value that was provided from table data cell (child component)
   * @param {string} value represents new value provided from table data cell (child component)
   * @param {string} matchesSoT represents boolean if matches to source of truth
   */
  const saveEntityData = (rowIndex, columnIndex, isEdited, previousValue, value, matchesSoT, source) => {
    if (isEdited) {
      const copySavedEntityData = [ ...entityData ]
      const modifiedData = { ...copySavedEntityData[rowIndex] }

      const modifiedValues = [ ...modifiedData.values ]

      const modifiedValueDatum = modifiedValues[columnIndex-1] 
      ? { ...modifiedValues[columnIndex-1] }
      : {}

      modifiedValueDatum["previousValue"] = previousValue
      modifiedValueDatum["value"] = value
      modifiedValueDatum["matchesSoT"] = matchesSoT

      if (source === columns[columnIndex].Accessor) {
        const modifiedSourceSystem = { ...modifiedData.sourceSystem }
        modifiedSourceSystem["source"] = source
        modifiedSourceSystem["trueValue"] = value
        modifiedData["sourceSystem"] = modifiedSourceSystem
      }

      modifiedValues.splice(columnIndex-1, 1, modifiedValueDatum)
      modifiedData["values"] = modifiedValues

      copySavedEntityData.splice(rowIndex, 1, modifiedData)
      setEntityData([ ...copySavedEntityData ])

    } else {
      const copySavedEntityData = [ ...entityData ]
      const modifiedData = { ...copySavedEntityData[rowIndex] }

      if (source === columns[columnIndex].Accessor) {
        const modifiedSourceSystem = { ...modifiedData.sourceSystem }
        modifiedSourceSystem["source"] = source
        modifiedSourceSystem["trueValue"] = previousValue
        modifiedData["sourceSystem"] = modifiedSourceSystem
      }

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
      setEntityData([ ...copySavedEntityData ])
    }
  }

  /**
   * @param {int} rowIndex the rowIndex represents index of the row 
   * @param {string} source the source is value of the column 
   * @param {string} trueValue the trueValue is value of the HelixTableCell selected
   */
  const saveRadioData = (rowIndex, source, trueValue) => {
    const copySavedEntityData = [ ...entityData ]
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
    setEntityData([ ...copySavedEntityData ])
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
      const sourceSystem = entityData[rowIndex].sourceSystem
      const source = sourceSystem.source.toString()
      const sourceTrueValue = sourceSystem.trueValue.toString()
      return (
        <HelixTableCell key={`Row-${rowIndex} ${columnAccessor}-${columnIndex}`} source={source} sourceTrueValue={sourceTrueValue} saveEntityData={saveEntityData} saveRadioData={saveRadioData} value={row[columnIndex]} rowIndex={rowIndex} columnIndex={columnIndex} columns={columns} editable={true}/>
      )
    }
  }
  
  // Go back to parent component
  const handleBackButton = () => {
    props.history.push("/entity")
  }

  // Passes entityData to the confirmation route
  const handleConfirmButton = async () => {
    const req = { savedChanges: entityData }
    await entities.post(`discrepancies/report/${props.location.state._id}`, req)
    props.history.push("/entity")
  }

  return (
    <div className={`container ${entitydiscrepancyClasses.medium}`}>
      {error.err ? 
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {`${error.message} `}<strong>Will redirect in {counter} seconds!</strong>
        </Alert>
      :
      <>
        <EntityCard
          RecordLabel={props.location.state.relationshipName}
          SystemOfRecord={detailedInfo.SystemOfRecord}
          ID={props.location.state._id}
          BorrowerName={props.location.state.borrowerName}
          RelationshipManager={props.location.state.relationshipManager}
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
      </>}
    </div>
  )
}

EntityDiscrepancy.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
}

export default withRouter(EntityDiscrepancy)
