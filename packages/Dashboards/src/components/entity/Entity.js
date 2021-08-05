import React, { useState, useEffect, useMemo } from "react";
import { withRouter } from "react-router-dom";
import {
  StylesProvider,
  createGenerateClassName,
  makeStyles,
  Typography,
} from "@material-ui/core";
import AddBoxIcon from "@material-ui/icons/AddBox";
import SettingsIcon from "@material-ui/icons/Settings";
import IconButton from "@material-ui/core/IconButton";
import AssessmentIcon from "@material-ui/icons/Assessment";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import ContactMail from "@material-ui/icons/ContactMail";
import { HelixTable, HelixTableCell } from "helixmonorepo-lib";
import entities from "../apis/entities";
import { sortableExcludes, columnExcludes, columnLabels } from "./config";
import EntityVisualizations from "./EntityVisualizations";
import { useQuery } from "@apollo/client";
import { GET_ENTITIES } from "./graphql";

const generateClassName = createGenerateClassName({
  productionPrefix: "entity-",
});

// Styling used for MaterialUI
const entityStyles = makeStyles(() => ({
  mediumContainer: {
    width: "80%",
    margin: "auto",
    marginTop: "3rem",
    paddingBottom: "3rem",
  },
  createIconStyle: {
    float: "right",
    cursor: "pointer",
    marginLeft: "auto",
  },
  header: {
    paddingBottom: "2rem",
  },
  actionsIconStyle: {
    "& button": {
      marginRight: "1rem",
      cursor: "pointer",
    },
  },
  discrepancyButton: {
    color: "green",
  },
}));

/** @return {JSX} Entity site
 * routed at /Entity
 */

function Entity(props) {
  // Creates an object for styling. Any className that matches key in the entityStyles object will have a corresponding styling
  const entityClasses = entityStyles();

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
  // rows will stores entities from GET Method fetchEntities via Rest API
  const [rows, setRows] = useState([]);

  // columns will store column header that we want to show in the front end
  const columns = useMemo(() => [], []);

  if (rows.length !== 0) {
    const headerColumns = Object.keys(rows[0]);
    headerColumns.forEach((key, index) => {
      if (!columnExcludes.includes(key)) {
        columns.push({
          Label: columnLabels[index],
          Accessor: key,
          Sortable: sortableExcludes.includes(key) ? false : true,
        });
      }
    });
  }

  /**
   * @param {object} entity represent object of entity with particular props
   * @param {string} accessor represents the accessor which entity with acessor can access the property value
   */
  const isoToDate = (entity, accessor) => {
    const strDate = entity[accessor];
    entity[accessor] = strDate.substring(0, 10);
  };

  /**
   * queries AppSync GraphQL API to receive an array of all entities associated with a company
   */
  const getGraphqlEntityData = async () => {
    const { loading, error, data } = useQuery(GET_ENTITIES);
    if (loading) return "Loading...";
    if (error) return `Error! ${error.message}`;
    const tableData = await data.listEntities;
    setRows(tableData);
  };

  getGraphqlEntityData();

  /**
   * @param {object} row the row is an object of data
   * @param {object} column the column is an object of the header with accessor and label props
   * @param {int} rowIndex the rowIndex represents index of the row
   * @param {int} columnIndex the columnIndex represents index of the column
   * @return {JSX} HelixTableCell of object properties in that Table row
   */
  const customCellRender = (row, column, rowIndex, columnIndex) => {
    const columnAccessor = column.Accessor;
    const displayActions = () => (
      <span className={entityClasses.actionsIconStyle}>
        <IconButton
          className={entityClasses.discrepancyButton}
          aria-label="discrepancy"
          size="small"
          edge="start"
          onClick={() =>
            props.history.push({
              pathname: `/entity/${row._id}/discrepancy-report`,
              state: row,
            })
          }
        >
          <AssessmentIcon />
        </IconButton>
        <IconButton
          aria-label="edit"
          size="small"
          edge="start"
          onClick={() =>
            props.history.push({
              pathname: `/entity/edit/${row._id}`,
              state: row,
            })
          }
          color="default"
        >
          <EditIcon />
        </IconButton>
        <IconButton
          aria-label="delete"
          size="small"
          edge="start"
          onClick={() =>
            props.history.push({
              pathname: `/entity/delete/${row._id}`,
              state: row,
            })
          }
          color="secondary"
        >
          <DeleteIcon />
        </IconButton>
        <IconButton
          aria-label="edit"
          size="small"
          edge="start"
          onClick={() =>
            props.history.push({
              pathname: `/entity/${row._id}/discrepancy-report/summary`,
              state: row,
            })
          }
          color="default"
        >
          <ContactMail />
        </IconButton>
      </span>
    );

    if (columnAccessor === "Actions") {
      return (
        <HelixTableCell
          key={`Row-${rowIndex} ${columnAccessor}-${columnIndex}`}
          containActions={true}
          displayActions={displayActions}
        />
      );
    } else {
      return (
        <HelixTableCell
          key={`Row-${rowIndex} ${columnAccessor}-${columnIndex}`}
          value={row[columnAccessor]}
        />
      );
    }
  };

  /**
   * @param {object} column represent object data regarding the api result
   * @return {string} provide table row with unique key props (required)
   */
  const customHeadColumnKeyProp = (column) => {
    return column.Accessor;
  };

  /**
   * @param {object} row represent object data regarding the api result
   * @return {string} provide table row with unique key props (required)
   */
  const customBodyRowKeyProp = (row) => {
    return row._id;
  };

  // Initially, we can start the table to order by Relationship Name or Borrower Name or etc in ascending order
  const initialOrderBy = "RelationshipName";

  /**
   * @return jsx object of create icon in child component's toolbar
   */
  const displayCreateEntityIcon = () => {
    return (
      <span className={entityClasses.createIconStyle}>
        <IconButton
          color="primary"
          onClick={() => props.history.push("/entity/new")}
        >
          <AddBoxIcon fontSize="large" />
        </IconButton>
        <IconButton onClick={() => props.history.push("/entity/configuration")}>
          <SettingsIcon fontSize="large" />
        </IconButton>
      </span>
    );
  };

  return (
    <StylesProvider generateClassName={generateClassName}>
      <div className={entityClasses.mediumContainer}>
        <div className={entityClasses.header}>
          <Typography variant="h5">Entity</Typography>
        </div>
        <EntityVisualizations />
        <HelixTable
          toggleSearch={true}
          displayCreateIcon={displayCreateEntityIcon}
          initialOrderBy={initialOrderBy}
          columns={columns.slice(1)}
          rows={rows}
          customCellRender={customCellRender}
          customHeadColumnKeyProp={customHeadColumnKeyProp}
          customBodyRowKeyProp={customBodyRowKeyProp}
        />
      </div>
    </StylesProvider>
  );
}

export default withRouter(Entity);
