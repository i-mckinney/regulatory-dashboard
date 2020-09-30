import React, { useMemo, useState, useEffect } from "react"
import { withRouter } from "react-router-dom"
import { makeStyles } from '@material-ui/core'
import PropTypes from "prop-types"
import EntityCard from "./EntityCard"
import { detailedInfo } from "../MockData/ReconcileDWMockData"
import EntityTableCell from "./EntityTableCell"
import { HelixButton } from 'helixmonorepo-lib'
import HelixTable from './HelixTable'
import entities from '../api/entities'

// Styling used for MaterialUI
const editEntityStyles = makeStyles(() => ({
  medium: {
    margin: 'auto',
    marginTop: '5rem',
    marginBottom: '5rem',
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
  const columns = React.useMemo(() => [
    {
      Header: "Field Name",
      Accessor: "FieldName",
    },
  ])

  const columns2 = useMemo(() => [], [])
  const rows2 = useMemo(() => [], [])
  const [data2, setData2] = useState([])

  detailedInfo.TableHeaders.forEach((header) => {
    columns.push({
      Header: header.DataWarehouseName,
      Accessor: header.DataWarehouseName,
    })
  })

  // data[row][column] = data[FieldNames][DataWareHouse]
  const data = detailedInfo.Fields.map((entityField) => {
    return { FieldName: entityField.Label }
  })

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
  const entityData = []
  const entityData2 = []

  detailedInfo.Fields.forEach((entityField, fieldIndex) =>
    entityField.Records.forEach((record, recordIndex) => {
      const headers = detailedInfo.TableHeaders
      const dataWarehouseName = headers[recordIndex].DataWarehouseName
      data[fieldIndex][dataWarehouseName] = record.Value
      entityData.push({
        FieldName: entityField.Label,
        IsEdited: false,
        SystemOfRecord: dataWarehouseName,
        PreviousValue: record.Value,
        NewValue: "",
        SourceSystem: "",
      })
    })
  )
  
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
    return row.FieldName
  }

  // editEntityData is modified data needed to send to next component/pipeline
  // const [editEntityData, setEditEntityData] = useState(entityData)
  const [editEntityData, setEditEntityData] = useState(entityData2)

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

  if (data2.length !== 0) {
    data2.TableHeaders.forEach((header) => columns2.push(header))
    data2.TableData.forEach((entityField) => {
      const rowObject = {}
      entityField.values.forEach((value, valueIndex) => {
        const accessor = columns2[valueIndex]["Accessor"]
        rowObject[[accessor]] = value
        if (valueIndex) {
        entityData2.push({
            FieldName: entityField.key_config["display"],
            IsEdited: false,
            SystemOfRecord: accessor,
            PreviousValue: value,
            NewValue: "",
            SourceSystem: "",
          })
        }
      })
      rows2.push(rowObject)
    })
  }

  /**
   * Renders only when it is mounted at first
   * It will fetch aggregated source system of the entity whenever EditEntity loads
   */
  useEffect(() => {

    const fetchAggregatedSourceSystemsData = async () => {
      const response = await entities.get("/entities/d765dd56-203a-4206-98c7-ab2d374e842c/aggregated")
      setData2(response.data)
    }

    fetchAggregatedSourceSystemsData()
  }, [columns2])

  console.log(entityData2)
  /**
   * @param {int} rowIndex the rowIndex represents index of the row
   * @param {object} row the row is an object of data
   * @param {object} column the column is an object of the header with accessor and label props
   * @param {int} columnIndex the columnIndex represents index of the column
   */
  const customCellRender = (rowIndex, row, column, columnIndex) => {
    const columnAccessor = column.Accessor
    if (columnIndex === 0) {
      return <EntityTableCell key={`${rowIndex} ${columnAccessor}`} value={row[columnAccessor]} editable={false}/>
    }
    else {
      return (
        <EntityTableCell key={`${rowIndex} ${columnAccessor}`} value={row[columnAccessor]} columnAccessor={columnAccessor} columns={columns2} rowIndex={rowIndex} editData={editData} editable={true}/>
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
    <div className={`container ${editEntityClasses.medium}`}>
      <EntityCard
        RecordLabel={detailedInfo.RecordLabel}
        SystemOfRecord={detailedInfo.SystemOfRecord}
        ID={detailedInfo.HeaderInfo.ID}
        BorrowerName={detailedInfo.HeaderInfo.BorrowerName}
        RelationshipManager={detailedInfo.HeaderInfo.RelationshipManager}
      />
      <HelixTable 
      columns={columns2}
      rows={rows2}
      // columns={columns} 
      // rows={data} 
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
  )
}

EditEntity.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
}

export default withRouter(EditEntity)
