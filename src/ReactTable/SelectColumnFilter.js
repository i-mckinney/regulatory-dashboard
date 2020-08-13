import React from 'react';

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
    const options = new Set()
    preFilteredRows.forEach(row => {
      options.add(row.values[id])
    })
    return [...options.values()]
  }, [id, preFilteredRows])

  // Render a multi-select box
  return (
    <select
      value={filterValue}
      style={{ textAlignLast: "center" }}
      onChange={e => {
        setFilter(e.target.value || undefined)
      }}
    >
      <option
        value="">All</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  )
}

export default SelectColumnFilter
