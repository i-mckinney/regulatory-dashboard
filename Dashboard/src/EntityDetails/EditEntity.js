import React, { useState } from "react"
import { withRouter } from "react-router-dom"
import { makeStyles } from '@material-ui/core'
import PropTypes from "prop-types"
import EntityCard from "./EntityCard"
import { detailedInfo } from "../MockData/ReconcileDWMockData"
import EntityTableCell from "./EntityTableCell"
import EntityTable from "./EntityTable"

// Styling used for MaterialUI
const editEntityStyles = makeStyles(() => ({
  medium: {
    padding: '2rem',
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
      accessor: "fieldname",
    },
  ])

  detailedInfo.TableHeaders.forEach((header) => {
    columns.push({
      Header: header.DataWarehouseName,
      accessor: header.DataWarehouseName,
      Cell: EntityTableCell,
    })
  })

  // data[row][column] = data[FieldNames][DataWareHouse]
  const data = detailedInfo.Fields.map((entityField) => {
    return { fieldname: entityField.Label }
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

  return (
    <div className={`container ${editEntityClasses.medium}`}>
      <EntityCard
        RecordLabel={detailedInfo.RecordLabel}
        SystemOfRecord={detailedInfo.SystemOfRecord}
        ID={detailedInfo.HeaderInfo.ID}
        BorrowerName={detailedInfo.HeaderInfo.BorrowerName}
        RelationshipManager={detailedInfo.HeaderInfo.RelationshipManager}
      />
      <EntityTable
        columns={columns}
        data={data}
        editData={editData}
      />
      <div className="page-progression">
        <button
          type="button"
          className="back-button"
          onClick={() => {
            props.history.push("/entity")
          }}
        >
          Back
        </button>
        <button type="button" className="confirm-button" disabled>
          Confirm
        </button>
      </div>
    </div>
  )
}

EditEntity.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
}

export default withRouter(EditEntity)
