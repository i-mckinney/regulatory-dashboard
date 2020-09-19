import React from "react"
import PropTypes from "prop-types"

/**
 * @param {array} globalFilter Must be memoized An array of objects containing columnId's and their corresponding filter values.
 * This information is stored in state since the table is allowed to manipulate the filter through user interaction.
 * @param {func} setGlobalFilter function used to update the global filter value.
 * @param {array} preGlobalFilteredRows The array of rows used right before filtering.
 * @returns {JSX} global filter used for filtering rows in admin dashboard
 */

function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = React.useMemo(() => {
    const optionsSet = new Set()
    preFilteredRows.forEach((row) => {
      optionsSet.add(row.values[id])
    })
    return [...options.values()]
  }, [id, preFilteredRows])

  // Render a multi-select box
  return (
    <select
      value={filterValue}
      style={{ textAlignLast: "center" }}
      onBlur={(e) => {
        setFilter(e.target.value || undefined)
      }}
    >
      <option value=""> All </option>
      {options.map((option) => (
        <option key="option" value={option}>
          {option}
        </option>
      ))}
    </select>
  )
}

SelectColumnFilter.propTypes = {
  column: PropTypes.instanceOf(Object).isRequired,
}
export default SelectColumnFilter
