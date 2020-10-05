import React, { useMemo, useState } from "react"
import { withRouter } from "react-router-dom"
import { StylesProvider, makeStyles } from '@material-ui/core'
import PropTypes from "prop-types"
import EntityCard from "./EntityCard"
import { detailedInfo } from "../../../MockData/ReconcileDWMockData"
import HelixTableCell from "./HelixTableCell"
import { HelixButton } from 'helixmonorepo-lib'
import HelixTable from './HelixTable'
import entities from '../../../api/entities'

// Styling used for MaterialUI
const editEntityStyles = makeStyles(() => ({
  medium: {
    margin: 'auto',
    marginTop: '1rem',
    marginBottom: '1rem',
    '& table': {
      width: '100%',
      display: 'table',
      borderTopRightRadius: '4px',
      borderTopLeftRadius: '4px',
      borderCollapse: 'separate',
      boxSizing: 'border-box',
      borderSpacing: '2px',
      borderColor: 'grey',
      '& tr': {
        border: 'none',
        backgroundColor: 'white',
        '&:nth-child(even)': {
          backgroundColor: '#f2f2f2',
        },
        '&:hover': {
          backgroundColor: '#add8e6',
        },
        '&:last-child': {
          borderBottomRightRadius: '4px',
          borderBottomLeftRadius: '4px',
        }
      },
      '& th': {
        backgroundColor: '#2e353d',
        color: 'white',
        margin: '0',
        borderBottom: 'solid 1px #e0e4e8',
        padding: '8px',
      },
      '& td': {
        margin: '0',
        borderBottom: 'solid 1px #e0e4e8',
        padding: '8px',
      },
      '&:last-children': {
        borderBottom: 'none',
      },
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
 * @return {JSX} EditEntity site
 * routed at /EditEntity
 */
const EditEntity = (props) => {
  // Creates an object for styling. Any className that matches key in the editEntityClasses object will have a corresponding styling
  const editEntityClasses = editEntityStyles();

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

  const originalSourceData = useMemo(() => [], [])
  
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
    const response = await entities.get("/entities/d765dd56-203a-4206-98c7-ab2d374e842c/aggregated")
    setData(response.data)
  }

  if (data.length === 0) {
    fetchAggregatedSourceSystemsData()
  } else {
    if (columns.length === 0) {
      data.TableHeaders.forEach((header) => columns.push(header))
      data.TableData.forEach((entityField) => {
        const label = entityField.key_config["display"]
        const row = entityField.values.map((value, valueIndex) => {
          const accessor = columns[valueIndex]["Accessor"]
          if (valueIndex) {
            if (valueIndex === 1) {
              originalSourceData.push(value.toString())
            }
            entityData.push({
                FieldName: label,
                IsEdited: false,
                SystemOfRecord: accessor,
                PreviousValue: value,
                NewValue: "",
                SourceSystem: "",
              }
            )
          }
          return value.toString()
        })
        rows.push(row)
      })
    }
  }

  console.log(originalSourceData)

  // editEntityData is modified data needed to send to next component/pipeline
  const [editEntityData, setEditEntityData] = useState(entityData)

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
   * @param {object} row the row is an object of data
   * @param {object} column the column is an object of the header with accessor and label props
   * @param {int} columnIndex the columnIndex represents index of the column
   */
  const customCellRender = (rowIndex, row, column, columnIndex) => {
    const columnAccessor = column.Accessor
    if (columnIndex === 0) {
      return <HelixTableCell key={`${rowIndex} ${columnAccessor}`} value={row[columnIndex]} editable={false}/>
    }
    else {
      return (
        <HelixTableCell key={`${rowIndex} ${columnAccessor}`} originalValue={originalSourceData[rowIndex]} value={row[columnIndex]} columnAccessor={columnAccessor} columns={columns} rowIndex={rowIndex} editData={editData} editable={true}/>
      )
    }
  }

  // Go back to parent component
  const handleBackButton = () => {
    props.history.push("/entity")
  }

  // Passes editEntityData to the confirmation route
  const handleConfirmButton = () => {
    props.history.push({
      pathname: "/confirmation",
      state: { editEntityData },
    })
  }

  return (
    <StylesProvider injectFirst>
      <div className={`container ${editEntityClasses.medium}`}>
        <EntityCard
          RecordLabel={detailedInfo.RecordLabel}
          SystemOfRecord={detailedInfo.SystemOfRecord}
          ID={detailedInfo.HeaderInfo.ID}
          BorrowerName={detailedInfo.HeaderInfo.BorrowerName}
          RelationshipManager={detailedInfo.HeaderInfo.RelationshipManager}
        />
        <HelixTable 
        columns={columns} 
        rows={rows} 
        customCellRender={customCellRender} 
        customBodyRowKeyProp={customBodyRowKeyProp} 
        customHeadColumnKeyProp={customHeadColumnKeyProp} 
        />
        <div className={editEntityClasses.pageProgression}>
          <HelixButton
            className={editEntityClasses.cancelButton}
            onClick={handleBackButton}
            text="Back"
          />
          <HelixButton 
          className={editEntityClasses.confirmButton} 
          onClick={handleConfirmButton} 
          text="Confirm" />
        </div>
      </div>
    </StylesProvider>
  )
}

EditEntity.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
}

export default withRouter(EditEntity)
