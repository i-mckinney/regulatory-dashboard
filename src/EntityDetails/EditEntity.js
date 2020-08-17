import React from "react"
import { withRouter } from "react-router-dom"
import PropTypes from "prop-types"
import EntityCard from "./EntityCard"
import { detailedInfo } from "../MockData/ReconcileDWMockData"
import { Styles } from "./EditEntityStyle"
import EntityTableCell from "./EntityTableCell"
import EntityTable from "./EntityTable"

/** @return {JSX} EditEntity site
 * routed at /EditEntity
 */

const EditEntity = (props) => {
  /** TODO
   *
   * * */
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

  const data = detailedInfo.Fields.map((entityField) => {
    return { fieldname: entityField.Label }
  })

  detailedInfo.Fields.forEach((entityField, entityIndex) =>
    entityField.Records.forEach(
      (record, recordIndex) =>
        (data[entityIndex][detailedInfo.TableHeaders[recordIndex].DataWarehouseName] =
          record.Value)
    )
  )
  return (
    <div>
      <Styles>
        <EntityCard
          RecordLabel={detailedInfo.RecordLabel}
          SystemOfRecord={detailedInfo.SystemOfRecord}
          ID={detailedInfo.HeaderInfo.ID}
          BorrowerName={detailedInfo.HeaderInfo.BorrowerName}
          RelationshipManager={detailedInfo.HeaderInfo.RelationshipManager}
        />
        <EntityTable columns={columns} data={data} />
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
