import React, { useState } from "react";
import HelixSelectTable from "./HelixSelectTable";
import { TableCell } from "@material-ui/core";
import { mockData } from "./HelixSelectTableMockData";

function HelixSelectTableSetUp() {

  //columnHeaders determine header of each columns in the Helix select table.
  const columnHeaders = [
    { id: "ExternalSource", disablePadding: true, label: "External Source" },
    { id: "fieldName", disablePadding: false, label: "Field Name" },
    { id: "ExternalValue", disablePadding: false, label: "External Value" },
    { id: "CurrentValue", disablePadding: false, label: "Proposed Value" },
    { id: "SourceOfTruth", disablePadding: false, label: "Source Of Truth" },
  ];

  //specifies which row has been selected in Helix select table
  const [selected, setSelected] = useState([]);


  // Data for rendering rows in Helix select table
  const rows = mockData;

  // Helix select table name or a header for the table itself
  const selectTableHeaderName = "Test Table Name";

  //function to render rows in Helix select table
  const customRow = (row, labelId) => {
    return (
      <>
        <TableCell component="th" id={labelId} scope="row" padding="none">
          {row.ExternalSource}
        </TableCell>
        <TableCell align="left">{row.fieldName}</TableCell>
        <TableCell align="left">{row.ExternalValue}</TableCell>
        <TableCell align="left">{row.CurrentValue}</TableCell>
        <TableCell
          align="left"
          style={
            row.SourceOfTruth ? { color: "#2776D2" } : { color: "#F50057" }
          }
        >
          <b>{`${row.SourceOfTruth}`}</b>
        </TableCell>
      </>
    );
  };

  return (
    <>
      <HelixSelectTable
        columnHeaders= {columnHeaders}
        setSelected={setSelected}
        selected={selected}
        customRow={customRow}
        rows={rows}
        singleSelection={false}
        selectTableHeaderName={selectTableHeaderName}
      />
    </>
  );
}

export default HelixSelectTableSetUp;
