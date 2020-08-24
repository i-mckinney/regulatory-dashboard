import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt,
  faSquare,
  faCheckSquare,
} from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import { Button } from "reactstrap";
import { Styles } from "./ReactTable/AdminDashboardStyle";
import AdminConfirmTable from "./ReactTable/AdminConfirmTable";
import ConfirmationModal from "./Common/ConfirmationModal";

/** @return {JSX} Dashboard site
 * routed at /dashboard
 */

function Confirmation(props) {
  const [tableData, setInitialTableData] = useState([]);
  const [clickedTableRows, setClickedTableRows] = useState([]);

  const hanldeConfirmChange = (evt) => {
    let copyCurrentTableData = [...tableData]
    let index = evt.target.id
    let currentRow = copyCurrentTableData[index]
    
    //toggle false and true
    currentRow.selected = !currentRow.selected

    if(currentRow.selected){
      const selectedRow = currentRow
      setClickedTableRows([...clickedTableRows, selectedRow])
    } else {
      const filteredRows = clickedTableRows.filter((row) => row.rowIndex !== currentRow.rowIndex)      
      setClickedTableRows(filteredRows)
    }
    setInitialTableData(copyCurrentTableData);
  };

  console.log(clickedTableRows)

  const handleDeleteChange = (evt) => {
    let copyCurrentTableData = [...tableData]
    let index = evt.target.id
    let currentRow = copyCurrentTableData[index]

    const filteredRows = copyCurrentTableData.filter((row) => row.rowIndex !== currentRow.rowIndex)      
    console.log("filtered", filteredRows)
    setInitialTableData(filteredRows)
  };

  useEffect(() => {
    if (props.history.location.state.editEntityData) {
      let tableData = [...props.history.location.state.editEntityData];

      const markedtableData = tableData.map((data,index) => {
        return {
          ...data,
          selected:false,
          rowIndex: index
        };
      });

      setInitialTableData(markedtableData);
    }
  }, []);

  /** setting custom cells for each specific columns while creating rows for the dashboard */
  const customRow = (cell, index) => {
    if (cell.column.Header === "Confirm Change") {
      return (
        <td {...cell.getCellProps()} key={cell.column.Header + `${index}`}>
          {cell.value ? (
            <Button
              color="success ml-2 mr-2"
              id={cell.row.id}
              onClick={hanldeConfirmChange}
            >
              {" "}
              Selected{" "}
            </Button>
          ) : (
            <Button
              outline
              color="primary ml-2 mr-2"
              id={cell.row.id}
              onClick={hanldeConfirmChange}
            >
              &nbsp;&nbsp;Select&nbsp;&nbsp;
            </Button>
          )}
          <Button
            outline
            color="danger mr-2"
            id={cell.row.id}
            onClick={handleDeleteChange}
          >
            {" "}
            Delete{" "}
          </Button>
        </td>
      );
    }
    return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
  };

  /** useMemo is a React hook that memorizes the output of a function.
   * It's important that we're using React.useMemo here to ensure that our data isn't recreated on every render.
   * If we didn't use React.useMemo, the table would think it was receiving new data on every render
   * and attempt to recalulate a lot of logic every single time. Only when the memoized value actually changes, it re renders
   * Header -> Represents what is shown in the table
   * Accessor -> represents key that you look for in a given data
   * Filter -> choosing which filter to use.
   * filter -> includes (tells react table to show values that matches the value in the select field)
   * Filter not given -> will use global filter
   * */
  const columns = React.useMemo(() => [
    {
      Header: "FieldName",
      accessor: "FieldName",
    },
    {
      Header: "System of Record",
      accessor: "SystemOfRecord",
    },
    {
      Header: "Previous Value",
      accessor: "PreviousValue",
    },
    {
      Header: "New Value",
      accessor: "NewValue",
    },
    {
      Header: "Source System",
      accessor: "SourceSystem",
    },
    {
      Header: "Confirm Change",
      accessor: "selected",
    },
  ]);

  /** Boolean state for showing modal when delte report template button is clicked.
   * once button is clicked, it is setting Modal to true by toggle
   * inside the modal, if cancel button is clicked, toggle is dispatched once more, setting modal to false.
   */
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const handleAcceptChange = (evt) => {
    console.log(evt.target.id);
  };

  const handleConfirmationModal = () => {};
  return (
    <div>
      <Styles>
        <AdminConfirmTable
          columns={columns}
          data={tableData}
          customRowRender={customRow}
          destinationString="reports"
        />
      </Styles>
      <div style={{ textAlign: "center" }}>
        <Button
          style={{ paddingLeft: "20px", paddingRight: "20px" }}
          color="primary"
          onClick={toggle}
        >
          Save Changes
        </Button>
        <ConfirmationModal
          toggle={toggle}
          isOpen={modal}
          clickedTableRows={clickedTableRows}
          deleteString="Client"
        />
      </div>
    </div>
  );
}

// Confirmation.propTypes = {
//   changedData: PropTypes.instanceOf(Array).isRequired,
// }

export default withRouter(Confirmation);
