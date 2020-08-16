import React from "react"
import { withRouter } from "react-router-dom"
import EntityCard from "./EntityCard"
import { detailedInfo } from "../MockData/ReconcileDWMockData"
import { Styles } from "./EditEntityStyle"
import EntityTable from "./EntityTable"

const renderTableData = (entity) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th />
            {entity.TableHeaders.map((header) => (
              <th key={header.DataWarehouseName} />
            ))}
          </tr>
        </thead>
        <tbody>
          {entity.Fields.map((entityField) => (
            <tr key={entityField.FieldName}>
              <td key={entityField.FieldName}>{entityField.Label}</td>
              {entityField.Records.map((record) => (
                <td key={record.Soid}>{record.Value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/** @return {JSX} EditEntity site
 * routed at /EditEntity
 */

const EditEntity = (props) => {
  /** TODO
   *
   * * */
  // const columns = React.useMemo(() => [
  //   {
  //     Header: "Name",
  //     columns: [
  //       {
  //         Header: "First Name",
  //         accessor: "firstName",
  //       },
  //       {
  //         Header: "Last Name",
  //         accessor: "lastName",
  //       },
  //     ],
  //   },
  //   {
  //     Header: "Other Info",
  //     columns: [
  //       {
  //         Header: "Age",
  //         accessor: "age",
  //       },
  //     ],
  //   },
  // ])

  // detailedInfo.TableHeaders.forEach((header) => {
  //   columns.push({
  //     Header: header.DataWarehouseName,
  //     columns: [],
  //   })
  // })
  // console.log(columns.length)
  // columns.map((column) =>
  //   detailedInfo.Fields.map((entityField) =>
  //     column.columns.push({
  //       Header: entityField.Label,
  //       accessor: entityField.FieldName,
  //     })
  //   )
  // )

  // const mockData = [
  //   {
  //     RelationshipName: "Loan",
  //     BorrowerName: "Eric Jho",
  //     BorrowerID: "3243262354",
  //     TIN: "L2343243",
  //     AccountNumber: "3234-1235125325-324",
  //     RelationshipManager: "David Geisinger",
  //   },
  // ]
  // const mockData = [
  //   { firstName: "jane", lastName: "doe", age: 20 },
  //   { firstName: "john", lastName: "smith", age: 21 },
  // ]

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
        {renderTableData(detailedInfo)}
        {/* <EntityTable columns={columns} data={mockData} /> */}
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

export default withRouter(EditEntity)
