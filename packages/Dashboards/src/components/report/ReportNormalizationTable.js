import React, { useMemo, useState, useEffect } from "react"
import { withRouter } from "react-router-dom"
import { makeStyles } from '@material-ui/core'
import PropTypes from "prop-types"
// import EntityCard from "./EntityCard"
// import { detailedInfo } from "../../MockData/ReconcileDWMockData"
import { HelixTable, HelixTableCell, HelixButton } from 'helixmonorepo-lib'

// Styling used for MaterialUI
const reportNormalizationTableStyles = makeStyles(() => ({
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
 * @param {Object} props Using the history property to route back ReportNormalizationTable site
 * @return {JSX} ReportNormalizationTable site
 * routed at /ReportNormalizationTable
 */
const ReportNormalizationTable = (props) => {
  // Creates an object for styling. Any className that matches key in the reportNormalizationTableStyles object will have a corresponding styling
  const reportNormalizationTableClasses = reportNormalizationTableStyles()

  // columns will store column header that we want to show in the front end
  const columns = useMemo(() => [], [])

  // rows will store all the row data
  const rows = useMemo(() => [], [])
  
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
    // else {
    //   const sourceSystem = entityTableData[rowIndex].sourceSystem

    //   const source = sourceSystem.source 
    //   ? sourceSystem.source.toString() 
    //   : setError({ err: true, message: "Source is undefined" })

    //   const sourceTrueValue = sourceSystem.trueValue 
    //   ? sourceSystem.trueValue.toString() 
    //   : setError({ err: true, message: "trueValue is undefined" })
    //   return (
    //     <HelixTableCell key={`Row-${rowIndex} ${columnAccessor}-${columnIndex}`} externalValues={externalValues} source={source} sourceTrueValue={sourceTrueValue} saveEntityData={saveEntityData} saveRadioData={saveRadioData} value={row[columnIndex]} rowIndex={rowIndex} columnIndex={columnIndex} columns={columns} editable={true}/>
    //   )
    // }
  }

  const render = () => {
    return (
      <>
        <HelixTable
        toggleSearch={false}
        columns={columns} 
        rows={rows} 
        customCellRender={customCellRender} 
        customBodyRowKeyProp={customBodyRowKeyProp} 
        customHeadColumnKeyProp={customHeadColumnKeyProp} 
        />
        <div className={reportNormalizationTableClasses.pageProgression}>
          <HelixButton
            className={reportNormalizationTableClasses.cancelButton}
            text="Back"
          />
          <HelixButton 
          className={reportNormalizationTableClasses.confirmButton} 
          text="Confirm" />
        </div>
      </>
    )
  }

  return (
    <div className={`container ${reportNormalizationTableClasses.medium}`}>
        {render()}
    </div>
  )
}

ReportNormalizationTable.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
}

export default withRouter(ReportNormalizationTable)
