import React, { useMemo, useState, useEffect } from "react"
import { withRouter } from "react-router-dom"
import { makeStyles } from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab'
import PropTypes from "prop-types"
import EntityCard from "./EntityCard"
import { detailedInfo } from "../../MockData/ReconcileDWMockData"
import { HelixTable, HelixTableCell, HelixButton } from 'helixmonorepo-lib'
import entities from '../apis/entities'
import HelixLinearProgress from '../utils/HelixLinearProgress'

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
  visuallyHidden: {
    position: 'absolute',
  },
  alert: {
    marginBottom: '1rem',
  }
}))

/**
 * @param {Object} props Using the history property to route back Entity site
 * @return {JSX} EntityDiscrepancy site
 * routed at /EntityDiscrepancy
 */
const EntityDiscrepancy = (props) => {
  // Creates an object for styling. Any className that matches key in the entityDiscrepancyStyles object will have a corresponding styling
  const entitydiscrepancyClasses = entityDiscrepancyStyles()

  // data store fetchAggregatedSourceSystemsData GET Method API results
  const [data, setData] = useState([])

  // columns will store column header that we want to show in the front end
  const columns = useMemo(() => [], [])

  // rows will store all the row data
  const rows = useMemo(() => [], [])

  // entityTableData is api result array of row object that contains key_config, sourceSystem, values
  const [entityTableData, setEntityTableData] = useState([])

  // error is object contains err and message
  const [error, setError] = useState({ err: false, message: "" })

  // externalValues will stores all the external values of each of the source system
  const externalValues = useMemo(() => [], [])

  const discrepancyData = useMemo(() => [], [])
  
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
    if (props.location.state.borrowerID) {
      const response = await entities.get(`discrepancies/${props.location.state.company_id}/${props.location.state.borrowerID}/report/${props.location.state._id}`)
      setData(response.data)
    } else {
      setError({ err: true, message: "Borrower ID is empty" })
      setData({ ErrorMessage: error.message})
    }
  }

  if (data.length === 0) {
    fetchAggregatedSourceSystemsData()
  } else {
    if (columns.length === 0 && !error.err) {
      if (!data.ErrorMessage) {
        data.TableHeaders.forEach((header) => columns.push(header))
        data.TableData.forEach((entityField) => {
          const row = [entityField.key_config["display"]]
          const tempExternalValues = []
          const values = entityField.values.map((value) => {
            if (value !== null) {
              try {
                if (value.currentValue) {
                  tempExternalValues.push(value.externalValue ? value.externalValue.toString() : "")
                  return value.currentValue.toString()
                } else if (value.externalValue) {
                  tempExternalValues.push(value.externalValue.toString())
                  return value.externalValue.toString()
                } else if (value.externalValue === null) {
                  tempExternalValues.push("")
                  return "NULL"
                } else {
                  return "Error: Improper Mapping"
                }
              }
              catch (e) {
                return e
              }
            } else {
              tempExternalValues.push("")
              return "NULL"
            }
          })
          const newRow = row.concat(values)
          rows.push(newRow)
          externalValues.push(tempExternalValues)
        })
        setEntityTableData(data.TableData)
      } else {
        setError({ err: true, message: `${data.ErrorMessage}/Borrower ID does not exist` })
      }
    }
  }

  // counter acts as a count down timer to redirect to new site
  const [counter, setCounter] = React.useState(3);

  useEffect(() => {
    if(error.err) {
      if (counter > 0) {
        setTimeout(() => setCounter(counter - 1), 1500)
      } else {
        props.history.push("/entity")
      }
    }
  }, [error, counter, props.history])

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
      const copySavedEntityTableData = [ ...entityTableData ]
      const modifiedData = { ...copySavedEntityTableData[rowIndex] }

      const modifiedValues = [ ...modifiedData.values ]

      const modifiedValueDatum = modifiedValues[columnIndex-1] 
      ? { ...modifiedValues[columnIndex-1] }
      : {}

      if (source === columns[columnIndex].customApiId) {
        const modifiedSourceSystem = { ...modifiedData.sourceSystem }
        modifiedSourceSystem["source"] = source
        modifiedSourceSystem["trueValue"] = value
        modifiedSourceSystem["isEdited"] = true
        modifiedData["sourceSystem"] = modifiedSourceSystem
      }

      modifiedValueDatum["currentValue"] = value
      modifiedValueDatum["matchesSoT"] = modifiedData["sourceSystem"]["trueValue"] === value
      modifiedValueDatum["isEdited"] = true

      modifiedValues.splice(columnIndex-1, 1, modifiedValueDatum)

      modifiedValues.forEach((value) => {
        if (value) {
          if (value.currentValue) {
            value["matchesSoT"] = value.currentValue === modifiedData["sourceSystem"]["trueValue"]
          } else if (value.externalValue) {
            value["matchesSoT"] = value.externalValue === modifiedData["sourceSystem"]["trueValue"]
          }
        }
      })

      modifiedData["values"] = modifiedValues

      copySavedEntityTableData.splice(rowIndex, 1, modifiedData)
      setEntityTableData([ ...copySavedEntityTableData ])

    } else {
      const copySavedEntityTableData = [ ...entityTableData ]
      const modifiedData = { ...copySavedEntityTableData[rowIndex] }

      if (source === columns[columnIndex].customApiId) {
        const modifiedSourceSystem = { ...modifiedData.sourceSystem }
        delete modifiedSourceSystem.isEdited
        modifiedSourceSystem["source"] = source
        modifiedSourceSystem["trueValue"] = previousValue
        modifiedData["sourceSystem"] = modifiedSourceSystem
      }

      const modifiedValues = [ ...modifiedData.values ]
      const modifiedValueDatum = modifiedValues[columnIndex-1]["externalValue"] 
      ? { ...modifiedValues[columnIndex-1] } 
      : null

      if (modifiedValueDatum && modifiedValueDatum["currentValue"]) {
        delete modifiedValueDatum.currentValue
        delete modifiedValueDatum.isEdited
        modifiedValueDatum["matchesSoT"] = matchesSoT
      }

      modifiedValues.splice(columnIndex-1, 1, modifiedValueDatum)

      modifiedValues.forEach((value) => {
        if (value) {
          if (value.currentValue) {
            value["matchesSoT"] = value.currentValue === modifiedData["sourceSystem"]["trueValue"]
          } else if (value.externalValue) {
            value["matchesSoT"] = value.externalValue === modifiedData["sourceSystem"]["trueValue"]
          }
        }
      })

      modifiedData["values"] = modifiedValues

      copySavedEntityTableData.splice(rowIndex, 1, modifiedData)
      setEntityTableData([ ...copySavedEntityTableData ])
    }
  }

  /**
   * @param {int} rowIndex the rowIndex represents index of the row 
   * @param {string} source the source is value of the column 
   * @param {string} trueValue the trueValue is value of the HelixTableCell selected
   */
  const saveRadioData = (rowIndex, source, trueValue) => {
    const copySavedEntityTableData = [ ...entityTableData ]
    const modifiedData = { ...copySavedEntityTableData[rowIndex] }
    
    const modifiedSourceSystem = { ...modifiedData.sourceSystem }
    modifiedSourceSystem["source"] = source
    modifiedSourceSystem["trueValue"] = trueValue
    modifiedSourceSystem["isEdited"] = true

    const modifiedValues = [ ...modifiedData.values ] 
    
    modifiedValues.forEach((value) => {
      if (value) {
        if (value.currentValue) {
          value["matchesSoT"] = value.currentValue === trueValue
        } else if (value.externalValue) {
          value["matchesSoT"] = value.externalValue === trueValue
        }
      }
    })

    modifiedData["sourceSystem"] = modifiedSourceSystem

    copySavedEntityTableData.splice(rowIndex, 1, modifiedData)
    setEntityTableData([ ...copySavedEntityTableData ])
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
      const sourceSystem = entityTableData[rowIndex].sourceSystem

      const source = sourceSystem.source 
      ? sourceSystem.source.toString() 
      : setError({ err: true, message: "Source is undefined" })

      const sourceTrueValue = sourceSystem.trueValue 
      ? sourceSystem.trueValue.toString() 
      : setError({ err: true, message: "trueValue is undefined" })
      return (
        <HelixTableCell key={`Row-${rowIndex} ${columnAccessor}-${columnIndex}`} externalValues={externalValues} source={source} sourceTrueValue={sourceTrueValue} saveEntityData={saveEntityData} saveRadioData={saveRadioData} value={row[columnIndex]} rowIndex={rowIndex} columnIndex={columnIndex} columns={columns} editable={true}/>
      )
    }
  }
  
  // Go back to parent component
  const handleBackButton = () => {
    props.history.push("/entity")
  }

  // Passes entityTableData to the confirmation route
  const handleConfirmButton = async () => {
    entityTableData.forEach((row) => {
      row.values.forEach((cell, index) => {
        if (cell) {
          const containsCustomApiId = Object.keys(discrepancyData).includes(columns[index+1].customApiId)
          const key = row.key_config["key"]
          const source = columns[index+1].Label
          const sourceOfTruth = row.sourceSystem.source === columns[index+1].customApiId ? true : false
          const obj = { [key]: { "CurrentValue": cell.currentValue || cell.externalValue, "ExternalValue": cell.externalValue, "ExternalSource": source, "SourceOfTruth": sourceOfTruth } }
          if (cell.isEdited || (row.sourceSystem.isEdited && row.sourceSystem.source === columns[index+1].customApiId) ) {
            if (!containsCustomApiId) {
              discrepancyData[columns[index+1].customApiId] = { ...obj }
            } else {
              discrepancyData[columns[index+1].customApiId] = { ...discrepancyData[columns[index+1].customApiId], ...obj }
            }
          }
        }
      })
    })
    const req = { savedChanges: { ...discrepancyData } }
    console.log(`Line 346 - ${handleConfirmButton.name} -`, req)
    await entities.post(`discrepancies/${props.location.state.company_id}/report/${props.location.state._id}`, req)
    props.history.push("/entity")
  }

  /**
   * @return a string instances/declartive contains described styles
   */
  const hiddenAlert = () => {
    if (error.err) return ""
    else return entitydiscrepancyClasses.visuallyHidden
  }

  /**
   * @return a jsx object of alert component
   */
  const displayAlert = () => {
    return (
      <span className={hiddenAlert()}>
        <Alert severity="error" className={entitydiscrepancyClasses.alert}>
          <AlertTitle>Error</AlertTitle>
          {`${error.message} `}<strong>Will redirect in {counter} seconds!</strong>
        </Alert>
      </span>
    )
  }

  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if(!loading) {
      if (progress < 100) {
        const timer = setInterval(() => setProgress(progress + 25), 500)
        return () => clearInterval(timer)
      } else {
        setLoading(true)
      }
    }
  }, [progress, loading])

  const render = () => {
    return (
      error.err ? 
        displayAlert()
      :
      <>
        {displayAlert()}
        <EntityCard
          RecordLabel={props.location.state.relationshipName}
          SystemOfRecord={detailedInfo.SystemOfRecord}
          BorrowerID={props.location.state.borrowerID}
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
      </>
    )
  }

  return (
    <div className={`container ${entitydiscrepancyClasses.medium}`}>
      {loading 
      ? render() 
      : <div className={entitydiscrepancyClasses.loading}>
          <HelixLinearProgress value={progress} />
        </div>
      }
    </div>
  )
}

EntityDiscrepancy.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
}

export default withRouter(EntityDiscrepancy)
