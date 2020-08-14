import React from "react"
// import { Card } from "reactstrap"
// import { useTable } from "react-table"
import EntityCard from "./EntityCard"
import { detailedInfo } from "../MockData/ReconcileDWMockData"
// import EntityTable from "./EntityTable"

const renderTableData = (fields) => {
  return fields.map((entityField) => {
    <tr key={entityField.FieldName}>
      <td key={entityField.FieldName}>{entityField.Label}</td>
    </tr>
  });
}

const EditEntity = () => {
  console.log(detailedInfo.Fields)

  //   const {
  //     getTableProps,
  //     getTableBodyProps,
  //     headerGroups,
  //     rows,
  //     prepareRow,
  //   } = useTable({
  //     columns,
  //     data,
  //   })

  return (
    <div>
      <EntityCard
        RecordLabel={detailedInfo.RecordLabel}
        SystemOfRecord={detailedInfo.SystemOfRecord}
        ID={detailedInfo.HeaderInfo.ID}
        BorrowerName={detailedInfo.HeaderInfo.BorrowerName}
        RelationshipManager={detailedInfo.HeaderInfo.RelationshipManager}
      />
      <table>
        {/* <thead></thead> */}

        {/* {detailedInfo.Fields.map((entityField) => {
        <tr key={entityField.FieldName}>
          <th>{entityField.Label}</th>
          {entityField.Records.map((record) => {
            <th key={record.Soid}>record.Value</th>
          })}
        </tr>
      })} */}

        {renderTableData(detailedInfo.Fields)}
      </table>
    </div>
  )
}

export default EditEntity
