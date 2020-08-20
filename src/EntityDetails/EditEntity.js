import React, { useState } from "react"
import { withRouter } from "react-router-dom"
import PropTypes from "prop-types"
import EntityCard from "./EntityCard"
import { detailedInfo } from "../MockData/ReconcileDWMockData"
import { Styles } from "./EditEntityStyle"
import EntityTableCell from "./EntityTableCell"
import EntityTable from "./EntityTable"

/**
 * @param {Object} props Using the history property to route back Entity site
 * @return {JSX} EditEntity site
 * routed at /EditEntity
 */
const EditEntity = (props) => {
  /**
   * 1) indexesOfSavedData keep records of table data cell indexes
   * 2) savedData is modified data needed to send to next component/pipeline
   * */
  const [indexesOfEditEntityData, setIndexesOfEditEntityData] = useState([])
  const [editEntityData, setEditEntityData] = useState([])

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

  detailedInfo.Fields.forEach((entityField, fieldIndex) =>
    entityField.Records.forEach((record, recordIndex) => {
      const headers = detailedInfo.TableHeaders
      const dataWarehouseName = headers[recordIndex].DataWarehouseName
      data[fieldIndex][dataWarehouseName] = record.Value
    })
  )

  // Saved the modified data to an savedData and keep record of the indexes of table data cell
  const saveData = (index, newData, action) => {
    if (action === "SAVE") {
      const copyEditEntityData = [...editEntityData]
      const copyIndexesOfSavedData = [...indexesOfEditEntityData]
      setIndexesOfEditEntityData([...copyIndexesOfSavedData, index])
      setEditEntityData([...copyEditEntityData, newData])
    }
  }

  // Remove the modified data from savedData by using the records of indexes of table data cell
  const removeData = (index, action) => {
    if (action === "RESET") {
      const removedIndex = indexesOfEditEntityData.indexOf(index)
      const indexesLength = indexesOfEditEntityData.length
      const dataLength = editEntityData.length

      const firstHalfIndexesArray = [
        ...indexesOfEditEntityData.slice(0, removedIndex),
      ]
      const remaningHalfIndexesArray = [
        ...indexesOfEditEntityData.slice(removedIndex + 1, indexesLength),
      ]
      setIndexesOfEditEntityData([
        ...firstHalfIndexesArray,
        ...remaningHalfIndexesArray,
      ])

      const firstHalfDataArray = [...editEntityData.slice(0, removedIndex)]
      const remaningHalfDataArray = [
        ...editEntityData.slice(removedIndex + 1, dataLength),
      ]
      setEditEntityData([...firstHalfDataArray, ...remaningHalfDataArray])
    }
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
        <EntityTable
          columns={columns}
          data={data}
          saveData={saveData}
          removeData={removeData}
          SystemOfRecord={detailedInfo.SystemOfRecord}
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
      </Styles>
    </div>
  )
}

EditEntity.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
}

export default withRouter(EditEntity)
