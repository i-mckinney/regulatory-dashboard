import React from "react"
import { useTable } from "react-table"
import { makeStyles } from "@material-ui/core"
import PropTypes from "prop-types"
import EntityTableHead from "./EntityTableHead"
import EntityTableBody from "./EntityTableBody"

// Styling used for MaterialUI
const entityTableStyles = makeStyles(() => ({
  table: {
    width: '100%',
    display: 'table',
    borderTopRightRadius: '4px',
    borderTopLeftRadius: '4px',
    borderCollapse: 'separate',
    boxSizing: 'border-box',
    borderSpacing: '2px',
    borderColor: 'grey',
    '& tr': {
      border: 'none',
      backgroundColor: 'white',
      '&:nth-child(even)': {
        backgroundColor: '#f2f2f2',
      },
      '&:hover': {
        backgroundColor: '#add8e6',
      },
      '&:last-child': {
        borderBottomRightRadius: '4px',
        borderBottomLeftRadius: '4px',
      }
    },
    '& th': {
      backgroundColor: '#2e353d',
      color: 'white',
      margin: '0',
      borderBottom: 'solid 1px #e0e4e8',
      padding: '8px',
    },
    '& td': {
      margin: '0',
      borderBottom: 'solid 1px #e0e4e8',
      padding: '8px',
    },
    '&:last-children': {
      borderBottom: 'none',
    },
  },
}))

/**
 * @param {array} columns Array of object where each object contains which filter to use, header label and accessor for getting specific key from data object
 * @param {array} data API result from getting a list of items such as report templates, clients and etc.(depending on where it is used)
 * @param {func} editData func pass down to child component, and sends it back to the parent component to edit the data
 * @returns {JSX} renders a custom edit entity dashboard
 */
const EntityTable = ({ columns, data, editData }) => {
  /**
   * 1) getTableProps: Function(?props) Required This function is used to resolve any props needed for your table wrapper.
   * 2) getTableBodyProps: Function(?props) Required This function is used to resolve any props needed for your table wrapper.
   * 3) headerGroups: Array<HeaderGroup> An array of normalized header groups, each containing a flattened array of final column objects for that row.
   * 4) rows: Array<Rows> A object contains array of row, determined by the column header)
   * 5) prepareRow: Required This function is responsible for lazily preparing a row for rendering.
   * Any row that you intend to render in your table needs to be passed to this function before every render.
   */
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
    editData,
  })

  // Creates an object for styling. Any className that matches key in the entityTableClasses object will have a corresponding styling
  const entityTableClasses = entityTableStyles();

  return (
    <div>
      <table className={entityTableClasses.table} {...getTableProps()}>
        <EntityTableHead headerGroups={headerGroups} />
        <EntityTableBody
          getTableBodyProps={getTableBodyProps}
          rows={rows}
          prepareRow={prepareRow}
        />
      </table>
    </div>
  )
}

EntityTable.propTypes = {
  data: PropTypes.instanceOf(Array).isRequired,
  columns: PropTypes.instanceOf(Array).isRequired,
  editData: PropTypes.func.isRequired,
}

export default EntityTable
