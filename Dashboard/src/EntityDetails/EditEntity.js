import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import { withRouter } from "react-router-dom"
import PropTypes from "prop-types"
import EntityCard from "./EntityCard"
import { detailedInfo } from "../MockData/ReconcileDWMockData"
import { Styles } from "./EditEntityStyle"
import EntityTableCell from "./EntityTableCell"
import EntityTable from "./EntityTable"

// Styling used for MaterialUi
const useStyles = makeStyles(() => ({
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
    marginBottom: "30px",
  },
}))

/**
 * @param {Object} props Using the history property to route back Entity site
 * @return {JSX} EditEntity site
 * routed at /EditEntity
 */
const EditEntity = (props) => {
  // Creates an object for styling. Any className that matches key in the useStyles object will have a corresponding styling
  const classes = useStyles()

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
    const copyEditEntityData = [...editEntityData]
    const modifiedData = { ...copyEditEntityData[index] }
    modifiedData["IsEdited"] = isEdited
    modifiedData["NewValue"] = editedValue

    // Removes 1 object at index and adds 1 object at index
    copyEditEntityData.splice(index, 1, modifiedData)
    setEditEntityData([...copyEditEntityData])
  }

  // Passes editEntityData to the confirmation route
  const handleSubmitFinalChanges = () => {
    props.history.push({
      pathname: "/confirmation",
      state: { editEntityData },
    })
  }

  return (
    <div className="container">
      <Styles>
        <EntityCard
          RecordLabel={detailedInfo.RecordLabel}
          SystemOfRecord={detailedInfo.SystemOfRecord}
          ID={detailedInfo.HeaderInfo.ID}
          BorrowerName={detailedInfo.HeaderInfo.BorrowerName}
          RelationshipManager={detailedInfo.HeaderInfo.RelationshipManager}
        />
        <EntityTable columns={columns} data={data} editData={editData} />
      </Styles>
      <div className={classes.pageProgression}>
        <Button
          className={classes.cancelButton}
          variant="contained"
          onClick={() => {
            props.history.push("/entity")
          }}
        >
          Back
        </Button>
        <Button
          className={classes.confirmButton}
          variant="contained"
          onClick={handleSubmitFinalChanges}
        >
          Confirm
        </Button>
      </div>
    </div>
  )
}

EditEntity.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
}

export default withRouter(EditEntity)
