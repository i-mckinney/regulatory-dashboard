import React from "react"
import { Button } from "reactstrap"
import EntityCard from "./EntityCard"
import { detailedInfo } from "../MockData/ReconcileDWMockData"
import EntityTable from "./EntityTable"

const EditEntity = () => {
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
      <EntityTable fields={detailedInfo.Fields} />
      <Button color="secondary">Back</Button>
      <Button color="success" disabled>
        Confirm
      </Button>
    </div>
  )
}

export default EditEntity
