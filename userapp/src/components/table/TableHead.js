import React from "react"
import PropTypes from "prop-types"

/**
 * @param {array}  headerGroups Function(?props) Required This function is used to resolve any props needed for your table wrapper.
 * @returns {JSX} renders a custom table head for table
 */
const TableHead = ({ headerGroups }) => {
  return (
    <thead>
      {headerGroups.map((headerGroup) => (
        <tr {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map((column) => (
            <th {...column.getHeaderProps()}>{column.render("Header")}</th>
          ))}
        </tr>
      ))}
    </thead>
  )
}

TableHead.propTypes = {
  headerGroups: PropTypes.instanceOf(Array).isRequired,
}

export default TableHead
