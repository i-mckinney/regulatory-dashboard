import React from "react"
import { Button } from "reactstrap"
import EntityCard from "./EntityCard"
import { detailedInfo } from "../MockData/ReconcileDWMockData"
import EntityTable from "./EntityTable"

/** @return {JSX} EditEntity site
 * routed at /EditEntity
 */

const EditEntity = () => {
  /** TODO
   *
   * * */
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
