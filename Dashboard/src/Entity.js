import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button, Alert } from "reactstrap";
import { Styles } from "./ReactTable/AdminDashboardStyle";
import AdminDashboard from "./ReactTable/AdminDashboard";

/** @return {JSX} Entity site
 * routed at /Entity
 */

function Entity() {
  const history = useHistory();
  const [successMessage, setSucessMessage ] = useState(null)

  useEffect(() => {
    if (history.location.state){
      setSucessMessage(history.location.state)
    } else {
      setSucessMessage(null)
    }
  }, []);
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
      Header: "Relationship Name",
      accessor: "RelationshipName",
    },
    {
      Header: "Borrower Name",
      accessor: "BorrowerName",
    },
    {
      Header: "Borrower ID",
      accessor: "BorrowerID",
    },
    {
      Header: "TIN",
      accessor: "TIN",
    },
    {
      Header: "Account #",
      accessor: "AccountNumber",
    },
    {
      Header: "Relationship Manager",
      accessor: "RelationshipManager",
    },
    {
      Header: "Edit Entity",
    },
  ]);
  const mockData = [
    {
      RelationshipName: "Granderson Properties, LLC",
      BorrowerName: "Eric Jho",
      BorrowerID: "3243262354",
      TIN: "L2343243",
      AccountNumber: "3234-1235125325-324",
      RelationshipManager: "David Geisinger",
    },
  ];

  /** setting custom cells for each specific columns while creating rows for the dashboard */
  const customRow = (cell) => {
    if (cell.column.Header === "Edit Entity") {
      return (
        <td {...cell.getCellProps()}>
          <Button color="primary">
            <Link to="/editentity" style={{ color: "white" }}>
              Edit
            </Link>
          </Button>
        </td>
      );
    } else {
      return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
    }
  };

  return (
    <div>
      {successMessage?<Alert color="success" className="ml-3" style={{width:"97%"}}>{successMessage}</Alert>:null}
      <h4 className="mt-1 ml-4">Entity</h4>
      <Styles>
        <AdminDashboard
          columns={columns}
          data={mockData}
          customRowRender={customRow}
          destinationString="reports"
        />
      </Styles>
    </div>
  );
}

export default Entity;
