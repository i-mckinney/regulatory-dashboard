import React, { useState } from "react"
import { withRouter } from "react-router-dom"
import { makeStyles } from '@material-ui/core'
import PropTypes from "prop-types"
import EntityCard from "../entity/EntityCard"
// import { detailedInfo } from "../../MockData/ReconcileDWMockData"
import { HelixTable } from 'helixmonorepo-lib'
import HelixNormalizationTableCell from '../table/HelixNormalizationTableCell'
import { columns, rows, data, externalValues } from './ReportNormTableMockData'

// Styling used for MaterialUI
const reportNormalizationTableStyles = makeStyles(() => ({
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
 * @param {Object} props Using the history property to route back ReportNormalizationTable site
 * @return {JSX} ReportNormalizationTable site
 * routed at /ReportNormalizationTable
 */
const ReportNormalizationTable = (props) => {
  // Creates an object for styling. Any className that matches key in the reportNormalizationTableStyles object will have a corresponding styling
  const reportNormalizationTableClasses = reportNormalizationTableStyles()

  // columns will store column header that we want to show in the front end
//   const columns = useMemo(() => [], [])

//   // rows will store all the row data
//   const rows = useMemo(() => [], [])

  const [normalizationTableData, setNormalizationTableData] = useState(data)
  
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

  const saveEntityData = () => null
  
    /**
   * @param {int} rowIndex the rowIndex represents index of the row 
   * @param {string} source the source is value of the column 
   * @param {string} trueValue the trueValue is value of the HelixTableCell selected
   */
  const saveRadioData = (rowIndex, source, trueValue) => {
    const copySavednormalizationTableData = [ ...normalizationTableData ]
    const modifiedData = { ...copySavednormalizationTableData[rowIndex] }
    
    const modifiedSourceSystem = { ...modifiedData.sourceSystem }
    modifiedSourceSystem["source"] = source
    modifiedSourceSystem["trueValue"] = trueValue
    modifiedSourceSystem["isEdited"] = true

    console.log(modifiedSourceSystem)

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

    copySavednormalizationTableData.splice(rowIndex, 1, modifiedData)
    setNormalizationTableData([ ...copySavednormalizationTableData ])
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
    if (columnIndex === 0 || columnIndex === 1) {
      return <HelixNormalizationTableCell key={`Row-${rowIndex} ${columnAccessor}-${columnIndex}`} value={row[columnIndex]}/>
    } else {
      const sourceSystem = normalizationTableData[rowIndex].sourceSystem

      const source = sourceSystem.source ? sourceSystem.source.toString() : ""
     
      const sourceTrueValue = sourceSystem.trueValue ? sourceSystem.trueValue.toString() : "" 

      if (columnAccessor === "InputInformation") {
        return (
          <HelixNormalizationTableCell key={`Row-${rowIndex} ${columnAccessor}-${columnIndex}`} externalValues={externalValues} source={source} sourceTrueValue={sourceTrueValue} saveEntityData={saveEntityData} saveRadioData={saveRadioData} value={row[columnIndex]} rowIndex={rowIndex} columnIndex={columnIndex} columns={columns} selectable={true} editable={true}/>
        )
      } else {
        return (
          <HelixNormalizationTableCell key={`Row-${rowIndex} ${columnAccessor}-${columnIndex}`} externalValues={externalValues} source={source} sourceTrueValue={sourceTrueValue} saveEntityData={saveEntityData} saveRadioData={saveRadioData} value={row[columnIndex]} rowIndex={rowIndex} columnIndex={columnIndex} columns={columns} selectable={true}/>
        )
      }
    }
  }

  const render = () => {
    return (
      <>
        <EntityCard
        RecordLabel={props.header}
        BorrowerID='1a'
        BorrowerName='Rey'
        />
        <HelixTable
        toggleSearch={false}
        columns={columns} 
        rows={rows} 
        customCellRender={customCellRender} 
        customBodyRowKeyProp={customBodyRowKeyProp} 
        customHeadColumnKeyProp={customHeadColumnKeyProp} 
        />
      </>
    )
  }

  return (
    <div className={`container`}>
        {render()}
    </div>
  )
}

ReportNormalizationTable.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
}

export default withRouter(ReportNormalizationTable)
