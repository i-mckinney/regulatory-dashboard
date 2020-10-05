import React from "react"
import { withRouter } from 'react-router-dom'
import { StylesProvider, TableCell } from '@material-ui/core'
import AddBoxIcon from '@material-ui/icons/AddBox'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import { HelixTable } from 'helixmonorepo-lib'
// import HelixTable from  './table/HelixTable'

/** @return {JSX} Entity site
 * routed at /Entity
 */

function Entity(props) {
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
      Label: "Relationship Name",
      Accessor: "RelationshipName",
      Sortable: true,
    },
    {
      Label: "Borrower Name",
      Accessor: "BorrowerName",
      Sortable: true,
    },
    {
      Label: "Borrower ID",
      Accessor: "BorrowerID",
      Sortable: true,
    },
    {
      Label: "TIN",
      Accessor: "TIN",
      Sortable: true,
    },
    {
      Label: "Account #",
      Accessor: "AccountNumber",
      Sortable: true,
    },
    {
      Label: "Relationship Manager",
      Accessor: "RelationshipManager",
      Sortable: true,
    },
    {
      Label: "Actions",
      Accessor: "Actions",
      Sortable: false,
    },
  ], [])

  const rows = [
    {
      RelationshipName: "Eric Jho",
      BorrowerName: "Eric Jho",
      BorrowerID: "3243262354",
      TIN: "L2343243",
      AccountNumber: "3234-1235125325-324",
      RelationshipManager: "David Geisinger",
    },
    {
      RelationshipName: "John Jill",
      BorrowerName: "John Jill",
      BorrowerID: "9873262354",
      TIN: "L2143253",
      AccountNumber: "1234-1235125325-321",
      RelationshipManager: "Michael Mike",
    },
  ]

    /**
     * @param {int} rowIndex represents row index
     * @param {object} row represent object data from the api result
     * @param {object} column represent object data (have a header object which has an accessor needed it for key props) from the api result
     * @return {JSX} Table cell of object properties in that Table row
     */
    const customCellRender = (rowIndex, row, column) => {
        const columnAccessor = column.Accessor
        if (columnAccessor === "Actions") {
            return (
                <TableCell key={`${rowIndex} ${columnAccessor}`}>
                    <IconButton aria-label="edit" size="small" edge="start" onClick={() => (props.history.push({ pathname: `/entity/edit/`, state: row }))} color="default">
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete" size="small" edge="start" onClick={() => (props.history.push({ pathname: `/entity/delete/`, state: row }))} color="secondary">
                        <DeleteIcon />
                    </IconButton>
                </TableCell>
            )
        }
        else {
            return (
                <TableCell key={`${rowIndex} ${columnAccessor}`}>
                    {row[columnAccessor]}
                </TableCell>
            )
        }
    }

    /**
     * @param {object} column represent object data regarding the api result  
     * @return {string} provide table row with unique key props (required)
     */
    const customHeadColumnKeyProp = (column) => {
        return column.Accessor
    }

    /**
     * @param {object} row represent object data regarding the api result 
     * @return {string} provide table row with unique key props (required)
     */
    const customBodyRowKeyProp = (row) => {
        return row.RelationshipName
    }

    // Initially, we can start the table to order by Username or First Name or etc in ascending order
    const initialOrderBy = "RelationshipName"

    /**
     * @return jsx object of create icon in child component's toolbar
     */
    const displayCreateUserIcon = () => {
        return (
            <IconButton
            color="primary"
            onClick={() => (props.history.push("/entity/new"))}>
                <AddBoxIcon fontSize="large" />
            </IconButton>
        )
    }

    return (
        <StylesProvider injectFirst>
          <h4 className="mt-1 ml-4">Entity</h4>
          <HelixTable displayCreateIcon={displayCreateUserIcon} initialOrderBy={initialOrderBy} columns={columns} rows={rows} customCellRender={customCellRender} customHeadColumnKeyProp={customHeadColumnKeyProp} customBodyRowKeyProp={customBodyRowKeyProp} />
        </StylesProvider>
    )
}

export default withRouter(Entity)
