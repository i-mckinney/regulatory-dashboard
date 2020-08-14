import React from "react"
import PropTypes from "prop-types"

/**
 * @param {array} fields An array of objects containing (FieldName, Label, Records).
 * */
const EntityTable = ({ fields }) => {
  const renderTableData = (entityFields) => {
    return (
      <div>
        {entityFields.map((entityField) => (
          <tr key={entityField.FieldName}>
            <td key={entityField.FieldName}>{entityField.Label}</td>
            {entityField.Records.map((record) => (
              <td key={record.Soid}>{record.Value}</td>
            ))}
          </tr>
        ))}
      </div>
    )
  }

  return (
    <div>
      <table className="table">{renderTableData(fields)}</table>
    </div>
  )
}

EntityTable.propTypes = {
  fields: PropTypes.instanceOf(Array).isRequired,
}

export default EntityTable
