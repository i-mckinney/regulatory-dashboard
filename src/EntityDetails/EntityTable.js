import React from "react"
import { useTable } from "react-table"
import PropTypes from "prop-types"

const EntityTable = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    visibleColumns,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  })
  // console.log(columns)
  // console.log(data)
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}></th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
  // return (
  //   <div>
  //     <table {...getTableProps()}>
  //       <thead>
  //         {/* <tr>
  //           <th colSpan={visibleColumns.length} style={{ textAlign: "left" }} />
  //         </tr> */}
  //         {headerGroups.map((headerGroup) => (
  //           <tr {...headerGroup.getHeaderGroupProps()}>
  //             {headerGroup.headers.map((column) => (
  //               <th {...column.getHeaderProps()}>{column.render("Header")}</th>
  //             ))}
  //           </tr>
  //         ))}
  //       </thead>
  //       <tbody {...getTableBodyProps()}>
  //         {rows.map((row) => {
  //           prepareRow(row)
  //           return (
  //             <tr {...row.getRowProps()}>
  //               {row.cells.map((cell) => {
  //                 return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
  //               })}
  //             </tr>
  //           )
  //         })}
  //       </tbody>
  //     </table>
  //   </div>
  // )
}

EntityTable.propTypes = {
  // fields: PropTypes.instanceOf(Array).isRequired,
  data: PropTypes.instanceOf(Array).isRequired,
  columns: PropTypes.instanceOf(Array).isRequired,
}

export default EntityTable
