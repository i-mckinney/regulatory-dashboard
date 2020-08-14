import React from 'react';
import { useAsyncDebounce, } from 'react-table'

/**
 * @param {array} globalFilter Must be memoized An array of objects containing columnId's and their corresponding filter values. 
 * This information is stored in state since the table is allowed to manipulate the filter through user interaction.
 * @param {func} setGlobalFilter function used to update the global filter value.
 * @param {array} preGlobalFilteredRows The array of rows used right before filtering.
 * @param {string} destinationString represent where filter is being used in
 * @returns {JSX} global filter used for filtering rows in admin dashboard
 */

function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
  destinationString,
}) {
  const count = preGlobalFilteredRows.length
  const [value, setValue] = React.useState(globalFilter)
  const onChange = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined)
  }, 200)

  return (
    <span>
      Search:{' '}
      <input
        value={value || ""}
        onChange={e => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} ${destinationString}...`}
        style={{
          paddingLeft: "10px",
          paddingTop: "2px",
          fontSize: '12px',
          border: '0',
          borderRaidus: "4px",
          width: "70%",
          marginLeft: "2px"
        }}
      />
    </span>
  )
}

export default GlobalFilter