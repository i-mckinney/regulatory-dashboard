import React from "react"
import PropTypes from "prop-types"

/** @param {obj} filterValue: The current filter value for this column, resolved from the table state's filters
 * @param {func} setFilter: function used to update the filter value for a specific column.
 * @param {string} Header: label of the current column
 * @return {jsx} default column filter for admin management dashboard
 */
function DefaultColumnFilter({ column: { filterValue, setFilter, Header } }) {
  return (
    <input
      value={filterValue || ""}
      style={{ width: "70%" }}
      onChange={(e) => {
        setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${Header}`}
    />
  )
}

DefaultColumnFilter.propTypes = {
  column: PropTypes.instanceOf(Object).isRequired,
}
export default DefaultColumnFilter
