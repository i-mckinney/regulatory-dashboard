import React, { useState } from "react"
import { withRouter } from "react-router-dom"
import { makeStyles, TableCell } from '@material-ui/core'
import PropTypes from "prop-types"
import EntityCard from "./EntityCard"
import { detailedInfo } from "../MockData/ReconcileDWMockData"
import EntityTableCell from "./EntityTableCell"
import EntityTable from "./EntityTable"
import { HelixButton } from 'helixmonorepo-lib'
import HelixTable from './HelixTable'

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
  }
  
}))

/**
 * @param {Object} props Using the history property to route back Entity site
 * @return {JSX} EditEntity site
 * routed at /EditEntity
 */
const EditEntity = (props) => {
  // Creates an object for styling. Any className that matches key in the editEntityClasses object will have a corresponding styling
  const editEntityClasses = editEntityStyles();

  const columns = React.useMemo(() => [
    {
      Header: "Field Name",
      Accessor: "FieldName",
    },
  ])

  detailedInfo.TableHeaders.forEach((header) => {
    columns.push({
      Header: header.DataWarehouseName,
      Accessor: header.DataWarehouseName,
      // Cell: EntityTableCell,
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

  detailedInfo.Fields.forEach((entityField, fieldIndex) =>
    entityField.Records.forEach((record, recordIndex) => {
      const headers = detailedInfo.TableHeaders
      const dataWarehouseName = headers[recordIndex].DataWarehouseName
      data[fieldIndex][dataWarehouseName] = record.Value
      console.log(entityField, record, data)
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
  // console.log(columns)
  // console.log(data)

const customHeadColumnKeyProp = (column) => {
  return column.Accessor
}

const customBodyRowKeyProp = (row) => {
  return row.FieldName
  }

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
  
  const customCellRender = (rowIndex, row, column, columnIndex) => {
    const columnAccessor = column.Accessor
    if (columnIndex === 0) {
      return <TableCell key={`${rowIndex} ${columnAccessor}`}>{row[columnAccessor]}</TableCell>
    }
    else {
      return (
        <EntityTableCell key={`${rowIndex} ${columnAccessor}`} columnAccessor={columnAccessor} value={row[columnAccessor]} allColumns={columns} rowIndex={rowIndex} editData={editData} />
      )
    }
  }

  return (
    <div className={`container ${editEntityClasses.medium}`}>
      {/* <EntityCard
        RecordLabel={detailedInfo.RecordLabel}
        SystemOfRecord={detailedInfo.SystemOfRecord}
        ID={detailedInfo.HeaderInfo.ID}
        BorrowerName={detailedInfo.HeaderInfo.BorrowerName}
        RelationshipManager={detailedInfo.HeaderInfo.RelationshipManager}
      /> */}
      <HelixTable columns={columns} rows={data} customCellRender={customCellRender} customBodyRowKeyProp={customBodyRowKeyProp} customHeadColumnKeyProp={customHeadColumnKeyProp} />
      {/* <EntityTable
        columns={columns}
        data={data}
        editData={editData}
      /> */}
      <div className="page-progression">
        <HelixButton
          className="back-button"
          onClick={() => {
            props.history.push("/entity")
          }}
          text="Back"
        />
        <HelixButton className="confirm-button" disabled text="Confirm" />
      </div>
    </div>
  )
}

EditEntity.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
}

export default withRouter(EditEntity)
